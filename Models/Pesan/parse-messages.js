const { proto, downloadContentFromMessage, getContentType } = (await import('@adiwajshing/baileys')).default;
import q from '../../Setting/settings.js';

const dlMessage = async (message) => {
	try {
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, ''): mime.split('/')[0]
		const stream = await downloadContentFromMessage(message, messageType)
		let buffer = Buffer.from([])
		for await(const chunk of stream) buffer = Buffer.concat([buffer, chunk])
		return buffer
	} catch (e) {
		console.error(e);
	}
}
// jangan di utek utek coii, biarin aja ini
export const parser = (serve, m) => {
	try {
		if (!m) return m
		if (m.key) {
			m.id = m.key.id
			m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
			m.chat = m.key.remoteJid
			m.bot = serve.createJid(serve.user.id)
			m.fromMe = m.key.fromMe
			m.isGc = m.chat.endsWith(q.idgc)
			m.sender = serve.createJid(m.fromMe && serve.user.id || m.participant || m.key.participant || m.chat || '')
			m.isOwn = m.fromMe || q.developer.map(v=> v + q.idwa).includes(m.sender)
			m.isMod = q.moderator.map(v=> v + q.idwa).includes(m.sender)
			if (m.isGc) m.participant = serve.createJid(m.key.participant) || ''
		}
		if (m.message) { 
			m.mtype = getContentType(m.message) /*Dapatkan dan meng Inisialisasi content ambil dari baileys*/
			m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
			m.dl = () => dlMessage(m.msg)
			let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
			m.tagJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
			if (m.quoted) {
				let type = Object.keys(m.quoted)[0]
				m.quoted = m.quoted[type]
				if (['productMessage'].includes(type)) { type = Object.keys(m.quoted)[0], m.quoted = m.quoted[type] }
				if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
				m.quoted.mtype = type
				m.quoted.id = m.msg.contextInfo.stanzaId
				m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
				m.quoted.isBot = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
				m.quoted.sender = serve.createJid(m.msg.contextInfo.participant)
				m.quoted.fromMe = m.quoted.sender === (serve.user && serve.user.id)
				m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
				m.quoted.tagJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
				m.quoted.dl = () => dlMessage(m.quoted)
			}
			m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
	   	let cmdd = (m.mtype === 'conversation') ? m.message.conversation: (m.mtype == 'imageMessage') ? m.message.imageMessage.caption: (m.mtype == 'videoMessage') ? m.message.videoMessage.caption: (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
			m.preff = /^[/\.!#]/.test(cmdd) ? cmdd.match(/^[/\.!#]/) : '/'
			m.cmd = (m.mtype === 'conversation' && m.message.conversation.startsWith(m.preff)) ? m.message.conversation : (m.mtype == 'imageMessage' && m.message.imageMessage.caption.startsWith(m.preff)) ? m.message.imageMessage.caption : (m.mtype == 'videoMessage' && m.message.videoMessage.caption.startsWith(m.preff)) ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage' && m.message.extendedTextMessage.text.startsWith(m.preff)) ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId: (m.mtype == 'templateButtonReplyMessage' && m.message.templateButtonReplyMessage.selectedId) ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text): ''
			m.args = m.cmd.trim().split(/ +/).slice(1)
			m.query = m.args.join(" ")
			m.command = m.cmd.slice(1).trim().split(/ +/).shift().toLowerCase()
		}
	   return m;
	} catch (e) {
		console.log(e);
	}
}