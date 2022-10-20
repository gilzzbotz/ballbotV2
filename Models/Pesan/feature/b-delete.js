export const handle = async (m, q, conn, grup) => {
	let { isBotAdmin } = grup
	if (m.fromMe) {
		conn.sendMessage(m.chat, {delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
	} else {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		conn.sendMessage(m.chat, {delete: { remoteJid: m.chat, fromMe: false, id: m.quoted ? m.quoted.id : m.id, participant: m.quoted ? m.quoted.sender : m.sender } })
	}
}