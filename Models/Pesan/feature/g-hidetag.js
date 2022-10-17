export const handle = async (m, q, conn, grup) => {
	let { isAdmin, isBotAdmin, members } = grup
	if (!m.isGc) return conn.sendteks(m.chat, q.forgc, m);
	if (!isAdmin) return conn.sendteks(m.chat, q.admin, m);
	conn.sendteks(m.chat, m.query ? m.query : '', m, { mentions: members.map(v => conn.createJid(v.id)) })
}