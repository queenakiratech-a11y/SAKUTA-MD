const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const fs = require('fs-extra');

require('events').EventEmitter.defaultMaxListeners = 500;

const PORT = process.env.PORT || 8000;
const BOT_NAME = process.env.BOT_NAME || '𝐒𝐀𝐊𝐔𝐓𝐀 𝐌𝐃';
const NEWSLETTER_JID = process.env.NEWSLETTER_JID || '120363422843574549@newsletter';
const OWNER_NUMBER = process.env.OWNER_NUMBER || '50943046399';

__path = process.cwd();
let code = require('./pair');

// Express Routes
app.use('/code', code);
app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/pair.html');
});
app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/main.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`
╔═════════════════════════════════════════╗
║     🤖 ${BOT_NAME} 🤖              ║
║     🚀 Server running on port ${PORT}     ║
║     📱 Pairing endpoint: /code          ║
║     🔗 Web: http://localhost:${PORT}     ║
╚═════════════════════════════════════════╝
    `);
});

module.exports = app;
