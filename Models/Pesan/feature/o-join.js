
export const handle = async (m, { q, conn }) => {
	let [ url, hari ] = m.query.split(' ');
	if (!url) return conn.sendteks(m.chat, q.aslink, m);
	if (!q.url(url)) return conn.sendteks(m.chat, q.flink, m);
	let code = url.split('whatsapp.com/')[1];
	let inv = await conn.groupGetInviteInfo(code);
	let db = db.data.chat[inv.id];
	if (m.isOwn) {
		await conn.groupAcceptInvite(code)
		.then(v =>conn.sendteks(m.chat, q.sukses, m)).catch(e=>conn.sendteks(m.chat, q.gagal, m));
	} else {
		await conn.groupAcceptInvite(code)
		.then(v =>conn.sendteks(m.chat, q.sukses, m)).catch(e=>conn.sendteks(m.chat, q.gagal, m));
	}
}