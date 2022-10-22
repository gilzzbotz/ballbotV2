export const handle = async (m, q, conn) => {
	if (!m.isOwn) return conn.sendteks(m.chat, q.owner, m)
	let bot = await conn.createJid(conn.user.id);
	if (conn.db.data.set[bot].public) {
		conn.db.data.set[bot].public = false
		conn.sendteks(m.chat, 'Sukses mengganti public ke self!!!');
	} else if (!conn.db.data.set[bot].public) {
		conn.db.data.set[bot].public = true
		conn.sendteks(m.chat, 'Sukses mengganti self ke Public!!!');
	}
}