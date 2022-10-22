
export const handle = async (m, q, conn) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	let quoted = m.quoted ? m.quoted : m
	let mime = (quoted.msg || quoted).mimetype || quoted.mediaType || ''
	if (/image/.test(mime)) {
		let qunt = m.quoted ? m.quoted : m
		let pp = await qunt.download()
		let bot = await conn.createJid(conn.user.id);
		await conn.createprofile(bot, pp)
		.then(i=>conn.sendteks(m.chat, q.sukses, m))
		.catch(e=> conn.sendMessage(m.chat, q.gagal, m))
	} else conn.sendteks(m.chat, q.forimg, m);
}