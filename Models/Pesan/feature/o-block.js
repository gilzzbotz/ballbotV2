export const handle = async (m, q, conn) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	let list = await conn.fetchBlocklist()
	let use = m.mentionedJid [0] ? m.mentionedJid[0] : m.quoted.sender ? m.quoted.sender: m.query.replace(/[^0-9]/g, '')
	if (!list.includes(use)) {
		conn.sendteks(use, "Anda Telah di block oleh owner", m)
		setTimeout(async function() {
			await conn.updateBlockStatus(use, 'block')
			.then(v=> conn.sendteks(m.chat, 'Sukses Block user tersebut!!!, Silahkan Lihat di .listblock', m))
			.catch(e=> conn.sendteks(m.chat, q.gagal, m))
		}, 3000);
	}
	else if (list.includes(use)) {
		conn.updateBlockStatus(use, 'unblock')
			.then(v=> conn.sendteks(m.chat, 'Sukses UnBlock user tersebut!!!, Silahkan Lihat di .listblock', m))
			.catch(e=> conn.sendteks(m.chat, q.gagal, m))
		setTimeout(async function() {
			await conn.sendteks(use, "Anda Telah di unblock oleh owner", m)
		}, 3000);
	}
}