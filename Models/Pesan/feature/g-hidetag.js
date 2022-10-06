export const handle = async (m, q, conn, grup) => {
	let { isAdmin, isBotAdmin, members } = grup
	if (!m.isGc) return conn.sendTag(m.chat, q.forgc, '');
	if (!isAdmin) return conn.sendTag(m.chat, q.admin, m.sender);
	conn.sendteks(m.chat, m.query ? m.query : '', { mentions: members.map(v => conn.createJid(v.id)) })
}