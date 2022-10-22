export const handle = async (m, q, conn, grup) => {
	let { isAdmin, isBotAdmin, members } = grup
	if (!m.isGc) return conn.sendteks(m.chat, q.forgc, m);
	if (!isAdmin) return conn.sendteks(m.chat, q.admin, m);
	if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m);
	if (!(m.quoted ? m.quoted : m)) return conn.sendteks(m.chat, q.forteks, m)
	if ((m.quoted? m.quoted.text: m.query).length >= 514) return conn.sendteks(m.chat, 'teks ngga boleh lebih dari 514 karakter', m)
	conn.groupUpdateDescription(m.chat, m.quoted ? m.quoted.text : m.query)
	.then(v => conn.sendteks(m.chat, q.sukses, m))
	.catch(v => conn.sendteks(m.chat, q.gagal, m))
}