export const handle = async (m, q, conn, grup) => {
	let { isAdmin, isBotAdmin, members } = grup
	if (!m.isGc) return conn.sendTag(m.chat, q.forgc, '');
	if (!isAdmin) return conn.sendTag(m.chat, q.admin, m.sender);
	let uvuv = members.map(v => conn.createJid(v.id))
	let pesan = `Pesan: ${m.query ? m.query : 'Tidak ada'}\n`
		 uvuv.map(v=> pesan += `@${v.split('@')[0]}\n`)
	conn.sendTag(m.chat, pesan, uvuv)
}