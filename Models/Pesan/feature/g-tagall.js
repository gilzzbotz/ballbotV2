export const handle = async (m, q, conn, isAdmin, isBotAdmin, members) => {
	if (!m.isGc) return conn.sendTag(m.chat, q.forgc, '');
	if (!isAdmin) return conn.sendTag(m.chat, q.admin, m.sender);
	if (!isBotAdmin) return conn.sendTag(m.chat, q.botadmin, m.sender);
	let uvuv = members.map(v => conn.createJid(v.id))
	let pesan = `Pesan: ${m.query ? m.query : 'Tidak ada'}\n`
		 uvuv.map(v=> pesan += `@${v.split('@')[0]}\n`)
	return conn.sendMessage(m.chat, {text: pesan, mentions: uvuv })
}