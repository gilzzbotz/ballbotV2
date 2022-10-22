export const handle = async (m, q, conn, grup) => {
	let { isAdmin, isBotAdmin, members } = grup
	if (!m.isGc) return conn.sendteks(m.chat, q.forgc, m);
	if (!isAdmin) return conn.sendteks(m.chat, q.admin, m);
	if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m);
	if (!(m.quoted? m.quoted.text : m)) return conn.sendteks(m.chat, q.notext, m);
	if ((m.quoted? m.quoted.text : m.query).length >= 25) return conn.sendteks(m.chat, 'Teks ngga boleh lebih dari 25 karakter', m)
	conn.groupUpdateSubject(m.chat, m.quoted? m.quoted.text : m.query)
	.then(v => conn.sendteks(m.chat, q.sukses, m))
	.catch(v => conn.sendteks(m.chat, q.gagal, m))
}