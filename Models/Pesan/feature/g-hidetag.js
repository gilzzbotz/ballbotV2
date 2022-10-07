export const handle = async (m, q, conn, grup) => {
	let { isAdmin, isBotAdmin, members } = grup
	if (!m.isGc) return conn.sendTag(m.chat, q.forgc, '');
	if (!isAdmin) return conn.sendTag(m.chat, q.admin, m.sender);
	conn.sendMessage(m.chat, {text: m.query ? m.query : '', mentions: members.map(v => conn.createJid(v.id)) }, {quoted: m})
}