import q from '../../Setting/settings.js';
import b from '../Fake/function.js';

export const Leave = async(conn, m, interval) => {
	let gc = Object.keys(conn.db.data.chat);
	let bot = await conn.createJid(conn.user.id);
	for (let o of gc) {
		if (new Date() *1 - conn.db.data.chat[o].join >= conn.db.data.chat[o].add) {
			clearInterval(interval);
			conn.sendteks(o, q.gcouttime, b.f1);
			setTimeout(async () => {
				await conn.groupLeave(o);
				delete conn.db.data.chat[o];
				conn.db.data.set[bot].blgc.push(o);
			}, 2000);
		}
	}
};