export const handle = async (m, q, conn, grup) => {
	let { isAdmin, isBotAdmin, members } = grup
	if (!m.isGc) return conn.sendTag(m.chat, q.forgc, '');
	if (!isAdmin) return conn.sendTag(m.chat, q.admin, m.sender);
	if (!isBotAdmin) return conn.sendTag(m.chat, q.botadmin, m.sender);
	if (!m.query) return conn.sendTag(m.chat, q.notext, m.sender);
	if (m.query.length >= 25) return conn.sendTag(m.chat, 'Teks ngga boleh lebih dari 25 karakter', m.sender)
	conn.groupUpdateSubject(m.chat, m.query)
	.then(v => conn.sendTag(m.chat, q.sukses, m.sender))
	.catch(v => conn.sendTag(m.chat, q.gagal, m.sender))
}