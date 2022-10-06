export const handle = async (m, q, conn, isAdmin, isBotAdmin, members) => {
	if (!m.isGc) return conn.sendTag(m.chat, q.forgc, '');
	if (!isAdmin) return conn.sendTag(m.chat, q.admin, m.sender);
	if (!isBotAdmin) return conn.sendTag(m.chat, q.botadmin, m.sender);
	
	return conn.sendMessage(m.chat, {text: m.query ? m.query : '', mentions: members.map(v => conn.createJid(v.id))})
}