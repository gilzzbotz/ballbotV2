
export const handle = async (m, q, conn, grup) => {
	let { isAdmin, isBotAdmin, members } = grup
	if (!m.isGc) return conn.sendteks(m.chat, q.forgc, m);
	if (!isAdmin) return conn.sendteks(m.chat, q.admin, m);
	let quoted = m.quoted ? m.quoted : m
	let mime = (quoted.msg || quoted).mimetype || quoted.mediaType || ''
	if (/image/.test(mime)) {
		let qunt = m.quoted ? m.quoted : m
		let pp = await qunt.download()
		await conn.createprofile(m.chat, pp)
		.then(i=>conn.sendteks(m.chat, q.sukses, m))
		.catch(e=> conn.sendMessage(m.chat, q.gagal, m))
	} else conn.sendteks(m.chat, q.forimg, m);
}