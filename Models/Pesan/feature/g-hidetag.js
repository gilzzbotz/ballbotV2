export const handle = async (m, q, conn, grup) => {
	let { isAdmin, isBotAdmin, members } = grup
	if (!m.isGc) return conn.sendteks(m.chat, q.forgc, m);
	if (!isAdmin) return conn.sendteks(m.chat, q.admin, m);
	if (!(m.quoted ? m.quoted : m)) return conn.sendteks(m.chat, q.forteks, m)
	conn.sendteks(m.chat, m.quoted ? m.quoted.text : m.query, m, { mentions: members.map(v => conn.createJid(v.id)) })
}