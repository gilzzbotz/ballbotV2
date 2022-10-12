export const handle = async (m, q, conn) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	let use = m.mentionedJid ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.query ? m.query.replace(/[^0-9]/g, '') : conn.sendteks(m.chat, 'Tag/Reply/Tulis setelah command Nomor yg mau diban', m)
	let bot = await conn.createJid(conn.user.id)
	if (!conn.db.data.user[use].ban) {
		conn.db.data.user[use].ban = true
		conn.sendteks(m.chat, `@${use.split('@')[0]} Sekarang Telah di ban [ Dia tidak bisa chat bot lagi ] `, m, {mentions: use})
	} else if (conn.db.data.user[use].ban) {
		conn.db.data.user[use].ban = false
		conn.sendteks(m.chat, `@${use.split('@')[0]} Sekarang Telah di ubban [ Dia bisa chat bot lagi ] `, m, {mentions: use})
	}
}