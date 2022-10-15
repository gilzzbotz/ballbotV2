export const handle = async (m, q, conn, grup) => {
	let { isBotAdmin, isAdmin } = grup
	if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
	if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
	let user = m.mentionedJid[0] ? m.mentionedJid[0]: m.quoted ? m.quoted.sender: m.query.replace(/[^0-9]/g, '')+'@s.whatsapp.net' ? m.query.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : conn.sendteks(m.chat, q.forteks, m)
	conn.groupParticipantsUpdate(m.chat, [user], 'demote')
		.then(v=> conn.sendteks(m.chat, q.sukses, m))
		.catch(v=> conn.sendteks(m.chat, q.gagal, m))
}