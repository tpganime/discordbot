import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default async function handleGames(ctx: any, command: string, args: string[], helpers: any) {
    const { readDB, writeDB, dbFiles, tttGames } = helpers;

    function getUser(id: string) {
        const db = readDB(dbFiles.economy);
        if (!db[id] || typeof db[id] === 'number') { 
            db[id] = { bal: db[id] || 0, luck: 0, prayTime: 0, xp: 0, level: 1, lastMsg: 0, hunts: 0 }; 
            writeDB(dbFiles.economy, db); 
        }
        if (db[id].xp === undefined) db[id].xp = 0; 
        if (db[id].level === undefined) db[id].level = 1; 
        if (db[id].luck === undefined) db[id].luck = 0; 
        if (db[id].hunts === undefined) db[id].hunts = 0;
        return db[id];
    }

    function saveUser(id: string, data: any) { 
        const db = readDB(dbFiles.economy); 
        db[id] = data; 
        writeDB(dbFiles.economy, db); 
    }

    function getBal(id: string) { return getUser(id).bal; }

    function addBal(id: string, amt: number) { 
        let u = getUser(id); 
        u.bal += amt; 
        saveUser(id, u); 
    }

    function addXp(id: string, amount: number) {
        let u = getUser(id); 
        u.xp += amount; 
        const reqXp = u.level * u.level * 150; 
        if (u.xp >= reqXp) {
            u.level++; 
            const reward = u.level * 1000; 
            u.bal += reward;
            const lvlEmbed = new EmbedBuilder()
                .setColor('#fc3c44')
                .setAuthor({ name: 'FUSION BOT LEVEL UP', iconURL: 'https://cdn-icons-png.flaticon.com/512/4113/4113009.png' })
                .setTitle(`🎊 Congratulations <@${id}>! 🎊`)
                .setDescription(`You just reached **Level ${u.level}**!\n\n🎁 **Gift:** \`$${reward}\` Coins!`)
                .setThumbnail('https://cdn-icons-png.flaticon.com/512/4113/4113009.png');
            ctx.channelSend({ content: `<@${id}>`, embeds: [lvlEmbed] });
        } 
        saveUser(id, u);
    }

    function createTTTBoard(board: string[]) {
        const rows = [];
        for (let i = 0; i < 3; i++) {
            const row = new ActionRowBuilder<ButtonBuilder>();
            for (let j = 0; j < 3; j++) {
                const index = i * 3 + j; 
                const mark = board[index]; 
                let style = ButtonStyle.Secondary;
                if (mark === '❌') style = ButtonStyle.Danger; 
                else if (mark === '⭕') style = ButtonStyle.Primary;
                row.addComponents(new ButtonBuilder().setCustomId(`ttt_${index}`).setLabel(mark).setStyle(style).setDisabled(mark !== '⬜'));
            } 
            rows.push(row);
        } 
        return rows;
    }

    if (['lb', 'leaderboard'].includes(command)) {
        const sorted = Object.entries(readDB(dbFiles.economy)).map(([id, data]: [string, any]) => ({ id, ...data })).sort((a, b) => b.bal - a.bal).slice(0, 10);
        let lbText = sorted.map((user, i) => `**${i+1}.** <@${user.id}> - 💰 **$${user.bal}** | ⭐ Lvl **${user.level}** | 🍀 Luck **${user.luck}** | 🏹 Hunts **${user.hunts || 0}**`).join('\n\n');
        return ctx.reply({ embeds: [new EmbedBuilder().setColor('#fc3c44').setAuthor({ name: '🏆 FUSION BOT LEADERBOARD' }).setDescription(lbText || "No players yet!")] });
    }

    if (command === 'pray') {
        let u = getUser(ctx.author.id); 
        const now = Date.now();
        if (now - u.prayTime < 600000) return ctx.reply(`🙏 The gods are resting. Pray again in **${Math.ceil((600000 - (now - u.prayTime))/60000)} minutes**.`);
        u.prayTime = now; 
        u.luck = Math.min(1000, u.luck + 1); 
        saveUser(ctx.author.id, u); 
        addXp(ctx.author.id, 5);
        return ctx.reply(`🙏 | <@${ctx.author.id}> prays... Luck is on your side!\n**| You have ${u.luck} luck point(s)!**`);
    }

    if (['level', 'lvl', 'profile'].includes(command)) {
        let u = getUser(ctx.author.id); 
        const reqXp = u.level * u.level * 150;
        const rank = Object.entries(readDB(dbFiles.economy)).map(([id, data]: [string, any]) => ({ id, ...data })).sort((a, b) => b.xp - a.xp).findIndex(user => user.id === ctx.author.id) + 1;
        const filled = Math.floor(Math.min(1, u.xp / reqXp) * 15);
        const avatarURL = ctx.author.displayAvatarURL() || 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png';
        return ctx.reply({ embeds: [new EmbedBuilder().setColor('#2b2d31').setAuthor({ name: ctx.author.username, iconURL: avatarURL }).setDescription(`**FUSION BOT PROFILE**\n\n**LVL ${u.level}**\n**Rank:** #${rank} | **XP:** ${u.xp}/${reqXp}\n\`[${'█'.repeat(filled)}${' '.repeat(15 - filled)}]\``).setThumbnail(avatarURL)] });
    }

    if (command === 'daily') {
        const dailyDb = readDB(dbFiles.daily); 
        const last = dailyDb[ctx.author.id] || 0; 
        const now = Date.now();
        if (now - last < 86400000) return ctx.reply(`⏰ Come back in **${Math.floor((86400000 - (now - last))/3600000)} hours** for your reward!`);
        const reward = 250 + Math.floor(Math.random() * 550); 
        addBal(ctx.author.id, reward); 
        dailyDb[ctx.author.id] = now; 
        writeDB(dbFiles.daily, dailyDb);
        return ctx.reply(`🎁 **Daily Reward!** You received **$${reward}** FUSION coins!`);
    }

    if (['bal', 'balance', 'cash'].includes(command)) return ctx.reply(`💰 **${ctx.author.username}'s Wallet:** \`$${getBal(ctx.author.id)}\``);

    if (['cf', 'coinflip'].includes(command)) {
        let betStr, choice; 
        if (args.length > 0 && ['h', 't', 'heads', 'tails'].includes(args[0].toLowerCase())) { 
            choice = args[0].toLowerCase()[0]; 
            betStr = args[1]; 
        } else { 
            betStr = args[0]; 
            choice = (args[1] ? args[1].toLowerCase()[0] : 'h'); 
            if (!['h', 't'].includes(choice)) choice = 'h'; 
        }
        if (!betStr) return ctx.reply('❌ Usage: `cf <all/amount> [h/t]`');
        let u = getUser(ctx.author.id); 
        let bet = betStr.toLowerCase() === 'all' ? Math.min(u.bal, 250000) : parseInt(betStr);
        if (isNaN(bet) || bet <= 0) return ctx.reply('❌ Invalid amount!'); 
        if (u.bal < bet) return ctx.reply('❌ Not enough money!');
        let winChance = 0.50 + ((u.luck / (u.luck + 100)) * 0.40); 
        const win = Math.random() < winChance; 
        const result = win ? choice : (choice === 'h' ? 't' : 'h');
        addXp(ctx.author.id, Math.floor(Math.random() * 15) + 10); 
        let msg = await ctx.reply({ embeds: [new EmbedBuilder().setColor('#fc3c44').setImage('https://media.tenor.com/2Xy-_1E3u5gAAAAi/coin-flip-flip.gif').setDescription(`**Flipping a coin for $${bet}...**`)] });
        setTimeout(() => {
            const resEmbed = new EmbedBuilder().setColor(win ? '#00ff00' : '#fc3c44').setThumbnail('https://cdn-icons-png.flaticon.com/512/888/888941.png').setDescription(`🪙 It landed on **${result === 'h' ? 'Heads' : 'Tails'}**!\n\n${win ? `🎉 You won **$${bet}**!` : `💀 You lost **$${bet}**.`}`);
            if (win) addBal(ctx.author.id, bet); else addBal(ctx.author.id, -bet);
            if(msg.edit) msg.edit({ embeds: [resEmbed] }); else if(msg.editReply) msg.editReply({ embeds: [resEmbed] }); else ctx.reply({ embeds: [resEmbed] });
        }, 1600); 
    }

    if (['slots', 's'].includes(command)) {
        let betStr = args[0]; 
        if (!betStr) return ctx.reply('❌ Usage: `slots <all/amount>`');
        let u = getUser(ctx.author.id); 
        let bet = betStr.toLowerCase() === 'all' ? Math.min(u.bal, 250000) : parseInt(betStr);
        if (isNaN(bet) || bet <= 0) return ctx.reply('❌ Invalid amount!'); 
        if (u.bal < bet) return ctx.reply('❌ Not enough money!');
        addXp(ctx.author.id, Math.floor(Math.random() * 15) + 10);
        let msg = await ctx.reply({ embeds: [new EmbedBuilder().setColor('#fc3c44').setImage('https://media.tenor.com/uG_jFz5OomkAAAAi/slot-machine-casino.gif').setDescription(`**Spinning the slots for $${bet}...**`)] });
        setTimeout(() => {
            const items = ['💎', '💰', '👑', '🔥', '🌟']; 
            let a = items[Math.floor(Math.random() * items.length)]; 
            let b = items[Math.floor(Math.random() * items.length)]; 
            let c = items[Math.floor(Math.random() * items.length)];
            if (Math.random() < 0.15 || Math.random() < (0.20 * (u.luck / (u.luck + 100)))) { b = a; c = a; } 
            let resText = ""; 
            let color: any = "#fc3c44";
            if (a === b && b === c) { addBal(ctx.author.id, bet * 10); color = '#00ff00'; resText = `🎰 **JACKPOT!** Won **$${bet * 10}**!`; } 
            else { addBal(ctx.author.id, -bet); color = '#fc3c44'; resText = `💀 **Lose!** Lost **$${bet}**.`; }
            const resEmbed = new EmbedBuilder().setColor(color).setDescription(`**[ ${a} | ${b} | ${c} ]**\n\n${resText}`);
            if(msg.edit) msg.edit({ embeds: [resEmbed] }); else if(msg.editReply) msg.editReply({ embeds: [resEmbed] }); else ctx.reply({ embeds: [resEmbed] });
        }, 2500); 
    }

    if (['hunt', 'h'].includes(command)) {
        let u = getUser(ctx.author.id); 
        if (u.bal < 100) return ctx.reply('❌ You need **$100** to buy hunting gear!'); 
        u.bal -= 100; 
        addXp(ctx.author.id, 10);
        let msg = await ctx.reply(`🌲 🏹 Searching the forest...`);
        setTimeout(() => {
            const animals = ['🦌', '🐗', '🐍', '🐘', '🐅', '🦆', '🐁']; 
            const caught = animals[Math.floor(Math.random() * animals.length)];
            let min = 20, max = 150; 
            if (Math.random() < (u.luck / (u.luck + 100))) { min = 100; max = 350; } 
            const val = min + Math.floor(Math.random() * (max - min)); 
            u.bal += val; 
            u.hunts = (u.hunts || 0) + 1; 
            saveUser(ctx.author.id, u);
            const res = `🏹 Caught a **${caught}**! Sold for **$${val}**! (Profit: $${val - 100})`;
            if(msg.edit) msg.edit(res); else if(msg.editReply) msg.editReply(res); else ctx.reply(res);
        }, 1000); 
    }

    if (['give', 'transfer'].includes(command)) {
        const target = ctx.mentions.users.first() || (ctx.guild ? ctx.guild.members.cache.get(args[0])?.user : null); 
        const amtStr = args[args.length - 1];
        if (!target || !amtStr) return ctx.reply('❌ Usage: `give @user <all/amount>`');
        let u = getUser(ctx.author.id); 
        let amt = amtStr.toLowerCase() === 'all' ? u.bal : parseInt(amtStr);
        if (isNaN(amt) || amt <= 0 || u.bal < amt) return ctx.reply('❌ Invalid amount or insufficient funds.');
        addBal(ctx.author.id, -amt); 
        addBal(target.id, amt); 
        return ctx.reply(`💸 Sent **$${amt}** to ${target.username}!`);
    }

    if (command === 'ttt') {
        const opponent = ctx.mentions.users.first() || (ctx.guild ? ctx.guild.members.cache.get(args[0])?.user : null); 
        const betStr = args[1];
        if (!opponent || opponent.bot || opponent.id === ctx.author.id) return ctx.reply('❌ Mention a valid opponent.');
        let u = getUser(ctx.author.id); 
        let bet = betStr?.toLowerCase() === 'all' ? Math.min(u.bal, 250000) : (parseInt(betStr) || 0);
        if (u.bal < bet || getBal(opponent.id) < bet) return ctx.reply('❌ One of you is too poor for this bet!');
        const board = ['⬜','⬜','⬜','⬜','⬜','⬜','⬜','⬜','⬜'];
        tttGames.set(ctx.channel.id, { p1: ctx.author.id, p2: opponent.id, bet, board, turn: ctx.author.id });
        return ctx.reply({ content: `🎮 **Tic-Tac-Toe**\n<@${ctx.author.id}> vs <@${opponent.id}>\nBet: **$${bet}**\n\n<@${ctx.author.id}>, your move!`, components: createTTTBoard(board) });
    }
    
    return false; 
}
