import { exec } from 'child_process';
export const handle = async (m, { conn, d }) => {
	if (!m.isOwn) return
	if (!m.query) return
	await conn.sendteks(m.chat, 'Executing...', m)
	try {
		exec(m.query, (e, stdout) => {
			if (e) throw e;
			if (stdout) throw stdout
		}).catch(_=>_)
	} catch (e) {
		conn.sendteks(m.chat, e, d.f1(e, ''))
	}
}