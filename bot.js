const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers  // Wichtig für Member-Events!
    ] 
});

client.once('ready', () => {
    console.log(`✅ ${client.user.tag} ist online und begrüßt neue Mitglieder!`);
    console.log(`🔧 Bot ist auf ${client.guilds.cache.size} Servern`);
});

// 👋 Wenn jemand beitritt
client.on('guildMemberAdd', async (member) => {
    try {
        // Sucht nach Willkommens-Kanälen
        const channelNames = ['willkommen', 'ankünfte', 'allgemein', 'welcome', 'ankunft'];
        
        let channel = null;
        for (const name of channelNames) {
            channel = member.guild.channels.cache.find(c => 
                c.name.toLowerCase().includes(name) && c.type === 0
            );
            if (channel) break;
        }
        
        // Falls kein passender Kanal, nimm den ersten Textkanal
        if (!channel) {
            channel = member.guild.channels.cache.find(c => c.type === 0);
        }
        
        if (channel) {
            // Verschiedene Begrüßungen (Zufall)
            const greetings = [
                `👋 Hallo ${member}! Willkommen auf **${member.guild.name}**!`,
                `🎉 ${member} ist dem Server beigetreten! Herzlich willkommen!`,
                `🌟 Ein neuer User: ${member}! Schön dass du da bist!`,
                `🤝 Willkommen ${member}! Viel Spaß hier!`,
                `👋 Hey ${member}, willkommen im Club!`
            ];
            
            const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
            await channel.send(randomGreeting);
            console.log(`✅ Begrüßung gesendet an ${member.user.tag}`);
        }
    } catch (error) {
        console.error('❌ Fehler bei Begrüßung:', error.message);
    }
});

// 👋 Wenn jemand geht (optional)
client.on('guildMemberRemove', async (member) => {
    try {
        const channel = member.guild.channels.cache.find(c => 
            c.name.toLowerCase().includes('allgemein') || 
            c.name.toLowerCase().includes('chat')
        );
        
        if (channel) {
            const goodbyes = [
                `👋 ${member.user.tag} hat den Server verlassen. Tschüss!`,
                `😢 ${member.user.tag} ist gegangen...`,
                `👋 Bis bald ${member.user.tag}!`
            ];
            
            const randomGoodbye = goodbyes[Math.floor(Math.random() * goodbyes.length)];
            await channel.send(randomGoodbye);
        }
    } catch (error) {
        console.error('❌ Fehler bei Verabschiedung:', error.message);
    }
});

// Einfacher Test-Befehl
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    if (message.content === '!test') {
        await message.reply('✅ Bot funktioniert!');
    }
    
    if (message.content === '!hilfe') {
        await message.reply(`
📋 **Willkommens-Bot Befehle:**
!test - Testet ob Bot läuft
!hilfe - Zeigt diese Hilfe
!status - Zeigt Bot-Status
        `);
    }
    
    if (message.content === '!status') {
        await message.reply(`✅ Bot ist online auf **${message.guild?.name || 'DM'}**`);
    }
});

// Token aus .env
client.login(process.env.DISCORD_TOKEN);
