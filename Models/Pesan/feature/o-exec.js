import { exec } from 'child_process';
export const handle = async (m, conn) => {
	if (!m.isOwn) return
	if (!m.text.slice(2).length > 0) return conn.sendteks(m.chat, 'Masukan Query nya', m)
	conn.sendteks(m.chat, 'Executing...', m)
	try {
		exec(m.text.slice(2), (e, stdout) => {
			if (e) return conn.sendteks(m.chat, e, m)
			if (stdout) return conn.sendteks(m.chat, stdout, m)
		})
	} catch (e) {
		conn.sendteks(m.chat, e, m)
	}
}