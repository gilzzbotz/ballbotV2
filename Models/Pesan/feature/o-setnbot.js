export const handle = async (m, q, conn) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m);
	if (!(m.quoted ? m.quoted.text : m.query)) return conn.sendteks(m.chat, q.teks, m);
	if ((m.quoted ? m.quoted.text : m.query).length >= 75) return conn.sendteks(m.chat, 'Nama tidak boleh lebih dari 75 karakter', m);
	await conn.updateProfileName(m.query)
	.then(_=>conn.sendteks(m.chat, q.sukses, m))
	.catch(_=> conn.sendteks(m.chat, q.gagal, m))
}