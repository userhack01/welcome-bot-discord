// install.js - Dieses Skript installiert discord.js automatisch
const { exec } = require('child_process');
const fs = require('fs');

console.log('🔧 Prüfe auf discord.js Installation...');

// Prüfen ob discord.js schon installiert ist
try {
    require.resolve('discord.js');
    console.log('✅ discord.js ist bereits installiert!');
    startBot();
} catch (e) {
    console.log('📦 discord.js wird installiert...');
    
    // discord.js installieren
    exec('npm install discord.js', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Installation fehlgeschlagen:', error);
            return;
        }
        console.log('✅ discord.js wurde installiert!');
        console.log(stdout);
        startBot();
    });
}

function startBot() {
    console.log('🚀 Starte Bot...');
    require('./bot.js');
}
