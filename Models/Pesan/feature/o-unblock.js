export const handle = async (m, q, conn) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	let use = m.mentionedJid [0] ? m.mentionedJid[0] : m.quoted.sender ? m.quoted.sender: m.query.replace(/[^0-9]/g, '')
	await conn.updateBlockStatus(use, 'unblock')
	.then(v=> conn.sendteks(m.chat, q.sukses, m))
	.catch(e=> conn.sendteks(m.chat, q.gagal, m))
}