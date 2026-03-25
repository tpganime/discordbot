import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, AudioPlayerStatus } from '@discordjs/voice';

export default async function handleCommands(ctx: any, command: string, args: string[], helpers: any) {
    const { readDB, writeDB, dbFiles, serverQueues, discordClient, searchYouTube, playDiscordSong, GLOBAL_BOT_NOTE, shuffleArray } = helpers;

    if (command === 'ping') return ctx.reply(`🏓 Pong! Bot latency is **${discordClient.ws.ping}ms**.`);
    
    // 🔥 UTILITY COMMANDS
    if (command === 'webpanel') {
        return ctx.reply({ content: `🌐 **FUSION BOT DASHBOARD**\nManage your Server Settings (Welcome Channels & Ban Words) here:\n\n👉 **https://bot.fusionhub.in**`, ephemeral: true });
    }

    // --- MODERATION ---
    if (command === 'ban') { 
        if (!ctx.member.permissions.has('BanMembers')) return ctx.reply("❌ No perms."); 
        const user = ctx.mentions.members.first(); 
        if (user) { await user.ban(); ctx.reply(`🔨 Banned ${user.user.tag}`); } 
        return true; 
    }
    if (command === 'kick') { 
        if (!ctx.member.permissions.has('KickMembers')) return ctx.reply("❌ No perms."); 
        const user = ctx.mentions.members.first(); 
        if (user) { await user.kick(); ctx.reply(`👢 Kicked ${user.user.tag}`); } 
        return true; 
    }
    if (command === 'timeout') { 
        if (!ctx.member.permissions.has('ModerateMembers')) return ctx.reply("❌ No perms."); 
        const user = ctx.mentions.users.first(); 
        const member = ctx.guild.members.cache.get(user?.id) || ctx.mentions.members.first(); 
        const mins = parseInt(args[1]) || 10; 
        if (member) { await member.timeout(mins * 60 * 1000).catch(()=>{}); ctx.reply(`🤐 Timed out ${user.tag || member.user.tag} for ${mins} mins.`); } 
        else { ctx.reply("User not found."); } 
        return true;
    }
    
    // 🔥 ROLE COMMANDS
    if (command === 'rolecreate') {
        if (!ctx.member.permissions.has('ManageRoles')) return ctx.reply("❌ No perms.");
        const name = args[0]; 
        const color: any = args[1] || '#ffffff';
        if(!name) return ctx.reply("❌ Usage: `rolecreate <name> [hexcolor]`");
        try { await ctx.guild.roles.create({ name, color, reason: `Requested by ${ctx.author.tag}` }); ctx.reply(`✅ Role **${name}** created!`); } catch(e: any) { ctx.reply(`❌ Error: ${e.message}`); } return true;
    }
    if (command === 'rolegive') {
        if (!ctx.member.permissions.has('ManageRoles')) return ctx.reply("❌ No perms.");
        const target = ctx.mentions.members.first(); 
        const roleMention = ctx.mentions.roles.first() || ctx.guild.roles.cache.get(args[1]);
        if (!target || !roleMention) return ctx.reply("❌ Usage: `rolegive @user @role`");
        try { await target.roles.add(roleMention); ctx.reply(`✅ Gave **${roleMention.name}** to **${target.user.tag}**!`); } catch(e: any) { ctx.reply(`❌ Error: ${e.message}`); } return true;
    }

    // 🔥 GIVEAWAY COMMANDS
    if (command === 'giveaway') {
        if (!ctx.member.permissions.has('ManageMessages')) return ctx.reply({content: "❌ No perms.", ephemeral: true});
        if (!ctx.isSlash) return ctx.reply("❌ Please use the **slash command** `/giveaway` so the menu form pops up!");
        const modal = new ModalBuilder().setCustomId('modal_gcreate').setTitle('Host a Giveaway');
        modal.addComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId('prize').setLabel('Prize').setStyle(TextInputStyle.Short).setRequired(true)),
            new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId('desc').setLabel('Description').setStyle(TextInputStyle.Paragraph).setRequired(false)),
            new ActionRowBuilder<TextInputBuilder>().addComponents(new TextInputBuilder().setCustomId('time').setLabel('Duration (e.g. 10m, 1h, 1d)').setStyle(TextInputStyle.Short).setRequired(true))
        );
        return ctx.rawInteraction.showModal(modal);
    }
    if (command === 'gmanage') {
        if (!ctx.member.permissions.has('ManageMessages')) return ctx.reply({content: "❌ No perms.", ephemeral: true});
        if (!ctx.isSlash) return ctx.reply("❌ Please use the **slash command** `/gmanage`!");
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setCustomId('gbtn_edit').setLabel('✏️ Edit').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('gbtn_end').setLabel('🛑 End').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId('gbtn_reroll').setLabel('🎲 Reroll Winner').setStyle(ButtonStyle.Success)
        );
        return ctx.reply({ content: "**⚙️ Giveaway Manager**\nSelect an action below to modify your server's giveaways:", components: [row], ephemeral: true });
    }

    // 🔥 MUSIC COMMANDS
    if (['play', 'p'].includes(command)) {
        const voiceChannel = ctx.member?.voice?.channel; 
        if (!voiceChannel) return ctx.reply('❌ Join a voice channel first!');
        try { 
            const perms = voiceChannel.permissionsFor(discordClient.user); 
            if (!perms.has('Connect') || !perms.has('Speak')) return ctx.reply('❌ I need **Connect** and **Speak** permissions!'); 
        } catch(e) {}
        const query = args.join(' '); 
        if (!query) return ctx.reply('❌ What should I play?');
        let searchMsg = await ctx.reply(`🔍 Searching for **${query}**...`);
        const results = await searchYouTube(query, 1);
        if (!results || !results.length) return searchMsg.edit ? searchMsg.edit('❌ No results found.') : ctx.reply('❌ No results found.');
        const song = results[0]; 
        let queue = serverQueues.get(ctx.guild.id);
        if (!queue) {
            queue = { textChannel: ctx.channel, voiceChannel, connection: null, player: createAudioPlayer(), songs: [], history: [], skippingToPrev: false, loop: 0, playing: true, volume: 1.0 };
            serverQueues.set(ctx.guild.id, queue); 
            queue.songs.push(song);
            try {
                const conn = joinVoiceChannel({ channelId: voiceChannel.id, guildId: ctx.guild.id, adapterCreator: ctx.guild.voiceAdapterCreator });
                conn.on('error', err => console.error("VC Error:", err)); 
                queue.connection = conn; 
                conn.subscribe(queue.player);
                queue.player.on(AudioPlayerStatus.Idle, () => { 
                    const q = serverQueues.get(ctx.guild.id); 
                    if(!q) return;
                    if (q.skippingToPrev) { q.skippingToPrev = false; } else {
                        const lastSong = q.songs.shift();
                        if (q.loop === 2) { q.songs.unshift(lastSong); } 
                        else if (q.loop === 1) { if (lastSong) { q.history.push(lastSong); q.songs.push(lastSong); } } 
                        else { if (lastSong) q.history.push(lastSong); }
                    } 
                    playDiscordSong(ctx.guild.id, q.songs[0]); 
                });
                queue.player.on('error', (err: any) => { 
                    const q = serverQueues.get(ctx.guild.id); 
                    if(q) { q.songs.shift(); playDiscordSong(ctx.guild.id, q.songs[0]); } 
                });
                if(searchMsg.edit) searchMsg.edit(`✅ Found **${song.title}**! Starting playback...`); 
                else if(searchMsg.editReply) searchMsg.editReply(`✅ Found **${song.title}**! Starting playback...`);
                playDiscordSong(ctx.guild.id, queue.songs[0]);
            } catch (e: any) { 
                serverQueues.delete(ctx.guild.id); 
                return ctx.channelSend(`❌ **Voice Join Error:** ${e.message}`); 
            }
        } else { 
            queue.songs.push(song); 
            if(searchMsg.edit) return searchMsg.edit(`✅ Added **${song.title}** to queue.`); 
            else if(searchMsg.editReply) return searchMsg.editReply(`✅ Added **${song.title}** to queue.`); 
            else return ctx.channelSend(`✅ Added **${song.title}** to queue.`); 
        }
        return true;
    }
    if (['skip', 'next', 's'].includes(command)) { 
        const queue = serverQueues.get(ctx.guild.id); 
        if (!queue) return ctx.reply('❌ Nothing is playing!'); 
        queue.player.stop(); 
        ctx.reply('⏭️ Skipped!'); 
        return true; 
    }
    if (['pause'].includes(command)) { 
        const queue = serverQueues.get(ctx.guild.id); 
        if (!queue || !queue.playing) return ctx.reply('❌ Nothing is playing!'); 
        queue.player.pause(); 
        queue.playing = false; 
        ctx.reply('⏸️ Paused!'); 
        return true; 
    }
    if (['resume'].includes(command)) { 
        const queue = serverQueues.get(ctx.guild.id); 
        if (!queue || queue.playing) return ctx.reply('❌ Music is already playing!'); 
        queue.player.unpause(); 
        queue.playing = true; 
        ctx.reply('▶️ Resumed!'); 
        return true; 
    }
    if (['stop', 'leave', 'disconnect'].includes(command)) { 
        const queue = serverQueues.get(ctx.guild.id); 
        if (!queue) return ctx.reply('❌ Nothing is playing!'); 
        queue.songs = []; 
        queue.history = []; 
        queue.player.stop(); 
        if (queue.connection) queue.connection.destroy(); 
        serverQueues.delete(ctx.guild.id); 
        ctx.reply('⏹️ Stopped the music and left the channel.'); 
        return true; 
    }
    if (['loop', 'l'].includes(command)) { 
        const queue = serverQueues.get(ctx.guild.id); 
        if (!queue) return ctx.reply('❌ Nothing is playing!'); 
        queue.loop = (queue.loop + 1) % 3; 
        const modes = ['Off', 'Queue', 'Track']; 
        ctx.reply(`🔁 Loop mode set to: **${modes[queue.loop]}**`); 
        return true; 
    }
    if (command === 'shuffle') { 
        const queue = serverQueues.get(ctx.guild.id); 
        if (!queue || queue.songs.length < 3) return ctx.reply('❌ Not enough songs to shuffle.'); 
        const first = queue.songs.shift(); 
        queue.songs = shuffleArray(queue.songs); 
        queue.songs.unshift(first); 
        ctx.reply('🔀 Queue shuffled!'); 
        return true; 
    }
    if (command === 'clear') { 
        const queue = serverQueues.get(ctx.guild.id); 
        if (!queue) return ctx.reply('❌ Nothing is playing!'); 
        if (queue.songs.length > 1) queue.songs = [queue.songs[0]]; 
        ctx.reply('🗑️ Queue cleared.'); 
        return true; 
    }
    if (['np', 'nowplaying'].includes(command)) { 
        const queue = serverQueues.get(ctx.guild.id); 
        if (!queue || !queue.songs[0]) return ctx.reply('❌ Nothing is playing!'); 
        const song = queue.songs[0]; 
        ctx.reply({ embeds: [new EmbedBuilder().setColor('#fc3c44').setAuthor({ name: 'Now Playing', iconURL: 'https://cdn-icons-png.flaticon.com/512/461/461163.png' }).setDescription(`**${song.title}**\n*by ${song.artist}*`).setThumbnail(song.thumbnail)] }); 
        return true; 
    }
    if (['queue', 'playlist', 'q'].includes(command)) { 
        const queue = serverQueues.get(ctx.guild.id); 
        if (!queue || queue.songs.length === 0) return ctx.reply('❌ The queue is empty.'); 
        let qStr = queue.songs.map((s: any, i: number) => `${i === 0 ? '**[Playing]**' : `**${i}.**`} ${s.title} - ${s.artist}`).slice(0, 10).join('\n'); 
        if (queue.songs.length > 10) qStr += `\n*...and ${queue.songs.length - 10} more*`; 
        ctx.reply({ embeds: [new EmbedBuilder().setColor('#fc3c44').setTitle('🎶 Current Playlist').setDescription(qStr)] }); 
        return true; 
    }
    
    // 🟢 HELP COMMAND
    if (['help', 'h'].includes(command)) {
        const embed = new EmbedBuilder()
            .setColor('#fc3c44')
            .setAuthor({ name: 'FUSION BOT COMMANDS', iconURL: 'https://cdn-icons-png.flaticon.com/512/10424/10424136.png' })
            .setDescription(`Prefixes: \`/\`, \`!\`, \`tpg\`, \`@FUSION BOT\`\n\n${GLOBAL_BOT_NOTE}`)
            .addFields([
                { name: 'Economy & Games', value: '`/lb`, `daily`, `pray`, `profile`, `cash`, `cf`, `slots`, `hunt`, `give`, `ttt`' },
                { name: 'Music', value: '`play`, `skip`, `pause`, `stop`, `leave`, `queue`, `loop`, `shuffle`, `clear`, `np`' },
                { name: 'Moderation & Roles', value: '`ban`, `kick`, `timeout`, `rolecreate`, `rolegive`' },
                { name: 'Server Config', value: '`/webpanel`, `/giveaway` (Host), `/gmanage` (Edit/End/Reroll)' }
            ])
            .setThumbnail('https://cdn-icons-png.flaticon.com/512/10424/10424136.png');
        return ctx.reply({ embeds: [embed] });
    }

    return false; 
}
