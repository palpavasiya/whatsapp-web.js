# Beginner Guide for whatsapp-web.js

Welcome to `whatsapp-web.js`! This guide is designed to help entry-level developers understand the core concepts and avoid common hurdles when building their first WhatsApp bot.

## 1. Understanding Chat IDs (JIDs)

WhatsApp uses a specific format for identifying users and groups, often called a JID (Jabber ID).

*   **Users (Contacts)**: Format is `[phone_number]@c.us`
    *   Example: `1234567890@c.us`
*   **Groups**: Format is `[group_id]@g.us`
    *   Example: `123456789012345678@g.us`
*   **Broadcast/Status**: `status@broadcast`

> **Tip**: You can find your own ID or a contact's ID by logging `message.from` or `message.to` in a simple bot script.

---

## 2. Keeping Your Session Alive (Authentication)

By default, the library uses `NoAuth`, which means you have to scan the QR code **every time** you restart your script. To avoid this, use `LocalAuth`.

### How to use LocalAuth:

```javascript
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.initialize();
```

When you use `LocalAuth`, the library creates a folder named `.wwebjs_auth` in your project directory. This folder stores your session data securely. **Never share or commit this folder to GitHub.**

---

## 3. Handling Media (Images, Videos, Documents)

Sending media requires the `MessageMedia` class. You can send media from a local file, a URL, or even a Base64 string.

```javascript
const { MessageMedia } = require('whatsapp-web.js');

// From a local file
const media = MessageMedia.fromFilePath('./image.jpg');
client.sendMessage(chatId, media, { caption: 'Check this out!' });

// From a URL
const mediaFromUrl = await MessageMedia.fromUrl('https://example.com/logo.png');
client.sendMessage(chatId, mediaFromUrl);
```

---

## 4. Common Pitfalls & Troubleshooting

### Missing Puppeteer Dependencies (Linux)
If you are running on Linux (like Ubuntu or Debian), Puppeteer might fail to start because of missing system libraries.
**Solution**: Install the required libraries:
```bash
sudo apt-get install -y libgbm-dev libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2
```

### QR Code not displaying
Ensure you have `qrcode-terminal` installed and your event listener is set up:
```javascript
client.on('qr', (qr) => {
    const qrcode = require('qrcode-terminal');
    qrcode.generate(qr, { small: true });
});
```

### Async/Await is Required
Most methods in this library are asynchronous (they return a Promise). Always use `await` inside an `async` function or use `.then()`.

---

## Next Steps
Check out the `examples/` directory in the repository for focused code snippets that you can copy and adapt!
