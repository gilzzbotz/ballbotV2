const d = (hari) => hari*24*60*60*1000;

export const handle = async (m, q, conn) => {
	let [ url, hari ] = m.query.split(' ');
	if (!url) return conn.sendteks(m.chat, q.aslink, m);
	let code = url.split('whatsapp.com/')[1];
	let inv = await conn.groupGetInviteInfo(code);
	let db = conn.db.data.chat[inv.id];
	if (m.isOwn) {
		await conn.groupAcceptInvite(code)
		.then(v => {
			db = {};
			db.join = new Date()*1;
			db.add = hari ? d(hari) : d(3737);
			db.detect = true;
			db.link = false;
			db.ban = false;
			db.antidel = false;
			db.antilink = false;
			db.antivn = false;
			db.antistik = false;
			// Add Other
			conn.sendteks(m.chat, q.sukses, m);
		}).catch(e=>conn.sendteks(m.chat, q.gagal, m));
	} else {
		await conn.groupAcceptInvite(code)
		.then(v => {
			db = {};
			db.join = new Date()*1;
			db.add = d(q.freeadd);
			db.detect = true;
			db.link = false;
			db.ban = false;
			db.antidel = false;
			db.antilink = false;
			db.antivn = false;
			db.antistik = false;
			// Add Other
			conn.sendteks(m.chat, q.sukses, m);
		}).catch(e=>conn.sendteks(m.chat, q.gagal, m));
	}
};