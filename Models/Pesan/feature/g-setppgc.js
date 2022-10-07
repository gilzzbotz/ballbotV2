import { webp2png } from '../../Function/file-tourl.js';

export const handle = async (m, q, conn, grup) => {
	let { isAdmin, isBotAdmin, members } = grup
	if (!m.isGc) return conn.sendTag(m.chat, q.forgc, '');
	if (!isAdmin) return conn.sendTag(m.chat, q.admin, m.sender);
	let url = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi
	let quoted = m.quoted ? m.quoted : m
	let mime = (quoted.msg || quoted).mimetype || quoted.mediaType || ''
	if (/image/.test(mime)) {
		let qunt = m.quoted ? m.quoted : m
		let pp = await qunt.download()
		console.log(pp)
		//await conn.updateProfilePicture(m.chat, pp)
		// .then(i=>conn.sendMessage(m.chat, {text: q.sukses }, {quoted: m}))
		// .catch(e=> {conn.sendMessage(m.chat, {text: q.gagal }, {quoted: m})
		// console.log(e);
		// })
	} else if (m.args[0] && m.args[0].match(url)) {
		await conn.updateProfilePicture(m.chat, { url: args[0] })
		.then(i=>conn.sendMessage(m.chat, {text: q.sukses }, {quoted: m}))
		.catch(e=> conn.sendMessage(m.chat, {text: q.gagal }, {quoted: m}))
	} else conn.sendTag(m.chat, q.forimg, m.sender);
}