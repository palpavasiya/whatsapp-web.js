const { Client, LocalAuth, MessageMedia } = require('../index');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async (message) => {
    if (message.body === '!image') {
        // Send a local image
        // Make sure you have an image file named 'image.png' in the same folder
        try {
            const media = MessageMedia.fromFilePath('./image.png');
            await client.sendMessage(message.from, media, {
                caption: 'Here is your local image!',
            });
        } catch (ignoredError) {
            await message.reply(
                'Could not find image.png. Please make sure it exists.',
            );
        }
    } else if (message.body === '!url') {
        // Send an image from a URL
        const media = await MessageMedia.fromUrl(
            'https://via.placeholder.com/350x150.png',
        );
        await client.sendMessage(message.from, media, {
            caption: 'Here is an image from a URL!',
        });
    }
});

client.initialize();
