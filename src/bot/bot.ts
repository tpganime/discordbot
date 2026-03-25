import { 
    Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, 
    EmbedBuilder, Partials, ModalBuilder, TextInputBuilder, TextInputStyle 
} from 'discord.js';
import { createAudioResource } from '@discordjs/voice';
import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handleGames from './games';
import handleCommands from './commands';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GLOBAL_BOT_NOTE = "WEBSITE: https://bot.fusionhub.in";

export async function startBot(helpers: any) {
    const { readDB, writeDB, dbFiles, YTDLP_PATH } = helpers;

    const discordClient = new Client({ 
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildVoiceStates, 
            GatewayIntentBits.GuildMessages, 
            GatewayIntentBits.MessageContent, 
            GatewayIntentBits.GuildMembers
        ], 
        partials: [Partials.Message, Partials.Channel] 
    });

    const serverQueues = new Map(); 
    const tttGames = new Map(); 

    function shuffleArray(array: any[]) { 
        let shuffled = array.slice(); 
        for (let i = shuffled.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; 
        } 
        return shuffled; 
    }

    async function searchYouTube(query: string, limit = 15): Promise<any[]> {
        return new Promise((resolve) => {
            const proc = spawn(YTDLP_PATH, ['--print', '%(id)s|||%(title)s|||%(uploader)s|||%(thumbnail)s|||%(duration)s', '--no-warnings', '--flat-playlist', `ytsearch${limit}:${query}`]);
            let out = ''; 
            proc.stdout.on('data', d => out += d);
            proc.on('close', () => {
                const results = out.trim().split('\n').filter(Boolean).map(line => {
                    let [id, title, artist, thumbnail] = line.split('|||');
                    if (thumbnail && thumbnail.includes('mqdefault.jpg')) thumbnail = thumbnail.replace('mqdefault.jpg', 'maxresdefault.jpg');
                    return { id, title: title || 'Unknown', artist: artist || 'Unknown', thumbnail: thumbnail || `https://i.ytimg.com/vi/${id}/mqdefault.jpg` };
                }).filter(s => s.id && s.id.length > 3);
                resolve(results);
            });
        });
    }

    async function playDiscordSong(guildId: string, song: any) {
        const queue = serverQueues.get(guildId); 
        if (!song) { 
            if(queue && queue.connection) queue.connection.destroy(); 
            serverQueues.delete(guildId); 
            return; 
        }
        try {
            const ytStream = spawn(YTDLP_PATH, ['-f', 'bestaudio', '-q', '-o', '-', '--no-warnings', `https://www.youtube.com/watch?v=${song.id}`]);
            const resource = createAudioResource(ytStream.stdout, { inlineVolume: true }); 
            resource.volume?.setVolume(queue.volume || 1.0); 
            queue.resource = resource; 
            queue.player.play(resource);
            
            const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
                buildBtn('btn_prev', 'prev'), 
                buildBtn('btn_pause', 'pause'), 
                buildBtn('btn_skip', 'skip'), 
                buildBtn('btn_stop', 'stop'), 
                buildBtn('btn_leave', 'leave')
            );
            const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
                buildBtn('btn_voldown', 'voldown'), 
                buildBtn('btn_volup', 'volup'), 
                buildBtn('btn_loop', 'loop'), 
                buildBtn('btn_shuffle', 'shuffle'), 
                buildBtn('btn_queue', 'queue')
            );
            queue.textChannel.send({ 
                embeds: [
                    new EmbedBuilder()
                        .setColor('#fc3c44')
                        .setAuthor({ name: 'Now Playing', iconURL: 'https://cdn-icons-png.flaticon.com/512/461/461163.png' })
                        .setDescription(`**${song.title}**\n*by ${song.artist}*`)
                        .setThumbnail(song.thumbnail)
                ], 
                components: [row1, row2] 
            });
        } catch (e) { 
            queue.songs.shift(); 
            playDiscordSong(guildId, queue.songs[0]); 
        }
    }

    function buildBtn(customId: string, iconKey: string) {
        const ICONS: any = { 
            prev: { fallback: '⏮️', label: 'Prev' }, 
            pause: { fallback: '⏯️', label: 'Pause' }, 
            skip: { fallback: '⏭️', label: 'Skip' }, 
            stop: { fallback: '⏹️', label: 'Stop' }, 
            leave: { fallback: '🚪', label: 'Leave' }, 
            voldown: { fallback: '🔉', label: 'Vol -' }, 
            volup: { fallback: '🔊', label: 'Vol +' }, 
            loop: { fallback: '🔁', label: 'Loop' }, 
            shuffle: { fallback: '🔀', label: 'Shuffle' }, 
            queue: { fallback: '📜', label: 'Queue' } 
        };
        return new ButtonBuilder()
            .setCustomId(customId)
            .setStyle(ButtonStyle.Secondary)
            .setLabel(ICONS[iconKey].label)
            .setEmoji(ICONS[iconKey].fallback);
    }

    const botHelpers = { 
        ...helpers, 
        serverQueues, 
        tttGames, 
        discordClient, 
        searchYouTube, 
        playDiscordSong, 
        GLOBAL_BOT_NOTE, 
        shuffleArray 
    };

    // 🔥 GIVEAWAY TIMER
    async function endGiveaway(client: Client, msgId: string) {
        const gws = readDB(dbFiles.giveaways); 
        const gw = gws[msgId]; 
        if (!gw || !gw.active) return;
        gw.active = false; 
        writeDB(dbFiles.giveaways, gws);
        try {
            const ch: any = await client.channels.fetch(gw.channelId).catch(()=>null); 
            if (!ch) return;
            const msg = await ch.messages.fetch(msgId).catch(()=>null); 
            if (!msg) return;
            const reaction = msg.reactions.cache.get('🎉'); 
            let winnerText = "Nobody participated.";
            if (reaction) { 
                const users = await reaction.users.fetch(); 
                const validUsers = users.filter((u: any) => !u.bot).map((u: any) => u.id); 
                if (validUsers.length > 0) winnerText = `<@${validUsers[Math.floor(Math.random() * validUsers.length)]}>`; 
            }
            const endedEmbed = EmbedBuilder.from(msg.embeds[0])
                .setTitle("🎊 GIVEAWAY ENDED 🎊")
                .setDescription(`**Prize:** ${gw.prize}\n${gw.desc ? `*${gw.desc}*\n\n` : ''}**Winner:** ${winnerText}`)
                .setColor('#36393f')
                .setFooter({ text: "Giveaway Ended" });
            await msg.edit({ embeds: [endedEmbed], components: [] });
            if (winnerText !== "Nobody participated.") await msg.reply(`🎉 Congratulations ${winnerText}! You won **${gw.prize}**!`); 
            else await msg.reply(`❌ Giveaway ended, but nobody won **${gw.prize}**.`);
        } catch(e) { }
    }

    setInterval(async () => {
        const giveaways = readDB(dbFiles.giveaways); 
        const now = Date.now();
        for (const [msgId, gw] of Object.entries(giveaways) as [string, any][]) {
            if (!gw.active) continue;
            if (now >= gw.endTime) { await endGiveaway(discordClient, msgId); } 
            else {
                try {
                    const ch: any = discordClient.channels.cache.get(gw.channelId);
                    if (ch) {
                        const msg = await ch.messages.fetch(msgId).catch(()=>null);
                        if (msg) { 
                            const reaction = msg.reactions.cache.get('🎉'); 
                            const count = reaction ? Math.max(0, reaction.count - 1) : 0; 
                            const embed = EmbedBuilder.from(msg.embeds[0]); 
                            embed.setFooter({ text: `${count} Participant(s) joined!` }); 
                            await msg.edit({ embeds: [embed] }).catch(()=>{}); 
                        }
                    }
                } catch(e) {}
            }
        }
    }, 15000);

    discordClient.on('ready', async () => { 
        console.log(`\n🤖 FUSION BOT ONLINE: ${discordClient.user?.tag}\n`); 
    });

    discordClient.on('guildMemberAdd', async member => { 
        const cfg = readDB(dbFiles.serverConfig)[member.guild.id]; 
        if (cfg && cfg.welcomeChannel) { 
            const ch: any = member.guild.channels.cache.get(cfg.welcomeChannel); 
            if (ch && 'send' in ch) ch.send(`👋 Welcome to the server, <@${member.id}>!`); 
        } 
    });

    discordClient.on('guildMemberRemove', async member => { 
        const cfg = readDB(dbFiles.serverConfig)[member.guild.id]; 
        if (cfg && cfg.byeChannel) { 
            const ch: any = member.guild.channels.cache.get(cfg.byeChannel); 
            if (ch && 'send' in ch) ch.send(`😢 **${member.user.tag}** has left the server. Goodbye!`); 
        } 
    });

    discordClient.on('interactionCreate', async interaction => {
        if (interaction.isModalSubmit() || interaction.isStringSelectMenu()) {
            const ctx = { 
                isSlash: true, 
                rawInteraction: interaction, 
                author: interaction.user, 
                member: interaction.member, 
                guild: interaction.guild, 
                channel: interaction.channel, 
                reply: async (c: any) => interaction.reply(c) 
            };
            await handleCommands(ctx, '', [], botHelpers); 
            return;
        }
        if (interaction.isChatInputCommand()) {
            try {
                const cmd = interaction.commandName; 
                let args: string[] = [];
                if (cmd === 'play') args.push(...(interaction.options.getString('song') || '').split(' '));
                if (cmd === 'cf') { 
                    args.push(interaction.options.getString('amount') || '0'); 
                    args.push(interaction.options.getString('side') || 'h'); 
                }
                if (cmd === 'slots') args.push(interaction.options.getString('amount') || '0');
                if (cmd === 'give') { 
                    args.push("dummy_user"); 
                    args.push(interaction.options.getString('amount') || '0'); 
                }
                if (cmd === 'ttt') { 
                    args.push("dummy_user"); 
                    const bet = interaction.options.getInteger('bet'); 
                    if (bet) args.push(bet.toString()); 
                }
                if (cmd === 'timeout') { 
                    args.push("dummy_user"); 
                    args.push(interaction.options.getString('minutes') || '10'); 
                }
                if (cmd === 'rolecreate') { 
                    args.push(interaction.options.getString('name') || 'new-role'); 
                    const color = interaction.options.getString('color');
                    if(color) args.push(color); 
                }
                if (cmd === 'rolegive') { 
                    args.push("dummy_user"); 
                    const role = interaction.options.getRole('role');
                    if(role) args.push(role.id); 
                }
                
                const ctx = { 
                    isSlash: true, 
                    rawInteraction: interaction, 
                    author: interaction.user, 
                    member: interaction.member, 
                    guild: interaction.guild, 
                    channel: interaction.channel, 
                    mentions: { 
                        users: { first: () => interaction.options.getUser('user') }, 
                        members: { first: () => interaction.options.getMember('user') }, 
                        roles: { first: () => interaction.options.getRole('role') } 
                    }, 
                    reply: async (c: any) => { 
                        if(interaction.deferred) return interaction.editReply(c); 
                        else return interaction.reply(c); 
                    }, 
                    channelSend: async (c: any) => {
                        const ch: any = interaction.channel;
                        if (ch && 'send' in ch) return ch.send(c);
                    }
                };
                
                if (cmd !== 'giveaway' && cmd !== 'gmanage') await interaction.deferReply();
                
                let handled = await handleGames(ctx, cmd, args, botHelpers);
                if (!handled) handled = await handleCommands(ctx, cmd, args, botHelpers);
            } catch (e) { console.log(e); }
        }
    });

    discordClient.on('messageCreate', async message => {
        if (message.author.bot) return;

        // AUTO-MOD
        if (message.guild) {
            const cfg = readDB(dbFiles.serverConfig)[message.guild.id] || {};
            if (cfg.banWords && cfg.banWords.length > 0) {
                const msgLower = message.content.toLowerCase(); 
                const hasBanWord = cfg.banWords.some((w: string) => msgLower.includes(w.toLowerCase()));
                if (hasBanWord) {
                    await message.delete().catch(()=>{}); 
                    message.channel.send(`⚠️ <@${message.author.id}>, your message was deleted for using a banned word.`).then(m => setTimeout(()=>m.delete().catch(()=>{}), 5000));
                    if (message.member && message.member.moderatable) { 
                        await message.member.timeout(5 * 60 * 1000, "Used a banned word").catch(()=>{}); 
                    } 
                    return;
                }
            }
        }

        let content = message.content.trim(); 
        let contentLower = content.toLowerCase();
        const mentionPrefix = `<@${discordClient.user?.id}>`; 
        const mentionPrefixNick = `<@!${discordClient.user?.id}>`;
        let isCmd = false; 
        let prefixLen = 0;
        
        // PREFIX LOGIC: Only /, !, Ping, and "tpg "
        if (contentLower.startsWith('/')) { isCmd = true; prefixLen = 1; } 
        else if (contentLower.startsWith('!')) { isCmd = true; prefixLen = 1; } 
        else if (contentLower.startsWith('tpg ')) { isCmd = true; prefixLen = 4; } 
        else if (content.startsWith(mentionPrefix)) { isCmd = true; prefixLen = mentionPrefix.length; } 
        else if (content.startsWith(mentionPrefixNick)) { isCmd = true; prefixLen = mentionPrefixNick.length; }
        
        // TTT Chat Input
        const game = tttGames.get(message.channel.id);
        if (game && message.author.id === game.turn && /^[1-9]$/.test(content)) {
            const move = parseInt(content) - 1;
            if (game.board[move] === '⬜') {
                game.board[move] = (message.author.id === game.p1) ? '❌' : '⭕';
                const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; 
                let won = wins.some(p => game.board[p[0]] !== '⬜' && game.board[p[0]] === game.board[p[1]] && game.board[p[1]] === game.board[p[2]]);
                const b = game.board; 
                const boardRender = `${b[0]}${b[1]}${b[2]}\n${b[3]}${b[4]}${b[5]}\n${b[6]}${b[7]}${b[8]}`;
                if (won) { 
                    handleGames({author:message.author, channelSend:()=>{} }, 'addbal', [game.bet], botHelpers); 
                    message.channel.send(`🏆 **${message.author.username} WON!**\n\n${boardRender}`); 
                    tttGames.delete(message.channel.id); 
                } 
                else if (!game.board.includes('⬜')) { 
                    message.channel.send(`🤝 **Draw!**\n\n${boardRender}`); 
                    tttGames.delete(message.channel.id); 
                } 
                else { 
                    game.turn = (game.turn === game.p1) ? game.p2 : game.p1; 
                    message.channel.send(`${boardRender}\n\n<@${game.turn}>, your move! (1-9)`); 
                }
                return;
            }
        }
        if (!isCmd) return;
        
        content = content.slice(prefixLen).trim();
        const args = content.split(/ +/); 
        const command = args.shift()?.toLowerCase();
        if (!command) return;

        const ctx = { 
            isSlash: false, 
            author: message.author, 
            member: message.member, 
            guild: message.guild, 
            channel: message.channel, 
            mentions: message.mentions, 
            reply: async (c: any) => message.reply(c), 
            channelSend: async (c: any) => message.channel.send(c) 
        };
        
        let handled = await handleGames(ctx, command, args, botHelpers);
        if (!handled) handled = await handleCommands(ctx, command, args, botHelpers);
    });

    const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
    if (!DISCORD_TOKEN) {
        console.error("❌ DISCORD_TOKEN is not set in environment variables.");
        return;
    }
    discordClient.login(DISCORD_TOKEN).catch(e => console.log("Discord Boot Error:", e.message));
}
