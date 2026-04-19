const { Client, LocalAuth } = require('../index');
const qrcode = require('qrcode-terminal');

// 1. Create a new client instance
const client = new Client({
    // Use LocalAuth to stay logged in after scanning the QR code once
    authStrategy: new LocalAuth(),
});

// 2. Display the QR code for login
client.on('qr', (qr) => {
    console.log('Scan this QR code with your phone:');
    qrcode.generate(qr, { small: true });
});

// 3. When the client is ready, log it to the terminal
client.on('ready', () => {
    console.log('Bot is ready and connected!');
});

// 4. Handle incoming messages
client.on('message', async (message) => {
    // If the message body is "!ping", reply with "pong"
    if (message.body === '!ping') {
        // Use message.reply to respond in the same chat and quote the original message
        await message.reply('pong');
    }
});

// 5. Start the client
client.initialize();
