const { jidDecode } = (await import('@adiwajshing/baileys')).default;
const { chain } = (await import('lodash')).default;
import { LowSync, JSONFileSync } from 'lowdb';
import q from '../../Setting/settings.js'

export const connect = async(serve) => {
	// Buat ephemeral biar ngga ada tanda serunya
	const ephe = { ephemeralExpiration: 8640000, forwardingScore: 99999, isForwarded: true }
	try {
		/* 
		* Create jid at id
		* @param id
		* @param serve
		* @returns jid
		* By Bolaxd
		*/
		serve.createJid = (chatId) => {
			if (!chatId) return chatId
			if (/:\d+@/gi.test(chatId)) {
				let decode = jidDecode(chatId) || {}
				return decode.user && decode.server && decode.user + '@' + decode.server || chatId
			} else return chatId
		}
		/* 
		* Send Kontak maybe
		* @param jid
		* @param serve
		* @returns [...['bolaxd', '62xxxx', 'descripsi']]
		* By Bolaxd
		*/
		serve.sendkon = async (jid, teks, arr = [...[name, jid, deskripsi]], quoted = '', opts = {}) => {
			var push = []
			for (let i of arr) push.push({displayName: '', vcard: 'BEGIN:VCARD\n'+'VERSION:3.0\n'+'FN:'+i[0]+'\n'+'ORG:'+i[2]+';\n'+'TEL;type=CELL;type=VOICE;waid='+i[1]+':'+i[1]+'\n'+'END:VCARD' })
			serve.sendMessage(jid, { contacts: { displayName: teks, contacts: push }, quoted, ...opts}, ephe)
		}
		/* 
		* Send Fake Video
		* @param jid
		* @param serve
		* @returns text fake
		* @media video
		* By Bolaxd
		*/
		serve.sendFvid = async (chatId, text, opts = {}) => serve.sendMessage(chatId, {video: { url: q.video }, fileLength: (await Math.floor(Math.random()*10360047029)), caption: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + q.idwa),...opts}, ephe)
		/* 
		* Send Button teks
		* @param jid
		* @param serve
		* @returns [...[ID,  DISPLAY]]
		* By Bolaxd
		*/
		serve.sendbut = async (chatId, text, footer, but = [...[dis, id]], men, opts = {}) => {
			let button = []
			for (let i of but) button.push({ buttonId: i[1], buttonText: { displayText: i[0] }, type: 1 })
			serve.sendMessage(chatId, {video: { url: q.video }, fileLength: (await Math.floor(Math.random()*10360047029)), caption: text, footer, buttons: button, mentions: [men], headerType: 2,...opts}, ephe)
		}
		// Text [ Fake ]
		serve.sendTag = async (chatId, text, men, opts = {}) => serve.sendMessage(chatId, {video: { url: q.video }, fileLength: (await Math.floor(Math.random()*10360047029)), caption: text, mentions: [men], ...opts}, ephe)
		// Fake Img
		serve.sendFImg = async (chatId, text, opts = {}) => serve.sendMessage(chatId, {document: { url: q.video }, fileLength:(await Math.floor(Math.random()*10360047029)), fileName: 'Ballbot-V2', mimetype: 'application/bin', pageCount: 37383838383838383, caption: text}, ephe)
		
		
		// DB
		serve.db = new LowSync(new JSONFileSync(q.namedb+'.json'));
		serve.loadDB = async function loadDB() {
			if (serve.db.READ) return new Promise((resolve) => setInterval(()=> (!serve.db.READ ? (clearInterval(this), resolve(serve.db.data == null ? serve.loadDB() : serve.db.data)) : null), 1000))
			if (serve.db.data !== null) return
			serve.db.READ = true;
			await serve.db.read();
			serve.db.READ = false;
			serve.db.data = {
				user: {},
				chat: {},
				set: {},
				/* Tambahkan kreasi kamu disini */
				...(serve.db.data || {})
			}
			serve.db.chain = chain(serve.db.data)
		}
		return serve
	} catch (e) {
		console.error(e);
	}
}
