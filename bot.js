// ============================================
// WILLKOMMENS-BOT - NEUE VERSION
// ============================================

const { Client, GatewayIntentBits } = require('discord.js');

// ===== DEINE DATEN (NACH RESET!) =====
// ⚠️ Achtung: Token musst du im Developer Portal neu holen!
const TOKEN = 'MTQ3NDM0ODM1MzkxNDY2NzEzMg.GSan6W.IWKd3-vukrEKCMFmdIWePZi29DbGnbptB8X59Y';
const CLIENT_ID = '1474348353914667132';

// Bot erstellen
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// Bot ist bereit
client.once('ready', () => {
    console.log('══════════════════════════════');
    console.log(`✅ ${client.user.tag} ist online!`);
    console.log(`🆔 Client ID: ${CLIENT_ID}`);
    console.log(`📊 Server: ${client.guilds.cache.size}`);
    console.log('══════════════════════════════');
    
    client.user.setActivity('!hilfe', { type: 'PLAYING' });
});

// ===== WILLKOMMENS-NACHRICHT =====
client.on('guildMemberAdd', async (member) => {
    try {
        // Sucht nach Willkommens-Kanälen
        const channel = member.guild.channels.cache.find(c => 
            c.name === 'allgemein' || 
            c.name === 'willkommen' || 
            c.name === 'chat'
        );
        
        if (channel) {
            await channel.send(`👋 Hallo ${member}! Willkommen auf **${member.guild.name}**!`);
            console.log(`✅ Willkommen gesendet an ${member.user.tag}`);
        }
    } catch (error) {
        console.error('❌ Fehler bei Willkommen:', error.message);
    }
});

// ===== BEFEHLE =====
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    // !test
    if (message.content === '!test') {
        await message.reply('✅ Bot funktioniert!');
        console.log(`📝 !test von ${message.author.tag}`);
    }
    
    // !hilfe
    if (message.content === '!hilfe') {
        await message.reply(`
📋 **BEFEHLE:**
!test     - Testet ob Bot läuft
!hilfe    - Zeigt diese Hilfe
!info     - Zeigt Bot-Info
!ping     - Pong!
        `);
    }
    
    // !info
    if (message.content === '!info') {
        await message.reply(`
🤖 **BOT INFO**
Name: ${client.user.tag}
Client ID: ${CLIENT_ID}
Server: ${message.guild?.name || 'DM'}
Mitglieder: ${message.guild?.memberCount || 1}
        `);
    }
    
    // !ping
    if (message.content === '!ping') {
        await message.reply('Pong! 🏓');
    }
});

// Bot starten
client.login(TOKEN);
