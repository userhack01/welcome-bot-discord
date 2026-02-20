const { Client, GatewayIntentBits } = require('discord.js');

// ===== DEINE DATEN =====
const TOKEN = 'MTQ3NDM0ODM1MzkxNDY2NzEzMg.GMELph.cQPszjy9fxqm0p01-tXgVmDLRCGYVfCqVYaG3o';     // ← Hier NEUEN Token einfügen!
const CLIENT_ID = '1474348353914667132';          // ← Deine Client ID

// ===== BOT SETUP =====
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,           // Für Member-Events
        GatewayIntentBits.GuildMessages,           // Für Nachrichten
        GatewayIntentBits.MessageContent           // Für !-Befehle
    ] 
});

// ===== BOT IST ONLINE =====
client.once('ready', () => {
    console.log('══════════════════════════════');
    console.log(`✅ Bot ist online!`);
    console.log(`📛 Name: ${client.user.tag}`);
    console.log(`🆔 Client ID: ${CLIENT_ID}`);
    console.log(`📊 Server: ${client.guilds.cache.size}`);
    console.log('══════════════════════════════');
    
    // Status setzen
    client.user.setActivity('!hilfe', { type: 'PLAYING' });
});

// ===== WILLKOMMENS-NACHRICHT =====
client.on('guildMemberAdd', async (member) => {
    try {
        // Suche einen passenden Kanal
        const channelNames = ['willkommen', 'allgemein', 'chat', 'welcome'];
        let channel = null;
        
        for (const name of channelNames) {
            channel = member.guild.channels.cache.find(c => 
                c.name.toLowerCase().includes(name) && c.type === 0
            );
            if (channel) break;
        }
        
        // Wenn kein Kanal gefunden, nimm den ersten Textkanal
        if (!channel) {
            channel = member.guild.channels.cache.find(c => c.type === 0);
        }
        
        if (channel) {
            const welcomeMsg = `👋 Hallo ${member}! Willkommen auf **${member.guild.name}**!`;
            await channel.send(welcomeMsg);
            console.log(`✅ Willkommen gesendet an ${member.user.tag}`);
        }
    } catch (error) {
        console.error('❌ Fehler bei Willkommen:', error.message);
    }
});

// ===== NACHRICHTEN-BEFEHLE =====
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    // !test - Bot-Test
    if (message.content === '!test') {
        await message.reply('✅ Bot funktioniert!');
        console.log(`📝 !test von ${message.author.tag}`);
    }
    
    // !hilfe - Hilfe anzeigen
    if (message.content === '!hilfe') {
        const helpText = `
📋 **BEFEHLE:**
!test     - Testet ob Bot läuft
!hilfe    - Zeigt diese Hilfe
!info     - Zeigt Bot-Info
!ping     - Pong!
        `;
        await message.reply(helpText);
    }
    
    // !info - Bot-Info anzeigen
    if (message.content === '!info') {
        await message.reply(`
🤖 **BOT INFO**
Name: ${client.user.tag}
Client ID: ${CLIENT_ID}
Server: ${message.guild?.name || 'DM'}
Mitglieder: ${message.guild?.memberCount || 1}
        `);
    }
    
    // !ping - Ping-Test
    if (message.content === '!ping') {
        await message.reply('Pong! 🏓');
    }
});

// ===== BOT STARTEN =====
client.login(TOKEN);
