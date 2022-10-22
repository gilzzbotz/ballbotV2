import { format } from 'util';

export const handle = async(m, conn, q, d, grup, findAdmin, bb) => {
	let { meta, members, admins, isAdmin, isBotAdmin, bot } = grup
	let db = conn.db
	if (!m.isOwn) return
	try {
		let evaling = await eval(`(async () => { return ${m.text.length <= 3 ? Amjing : m.text.slice(3)} })()`)
		conn.sendteks(m.chat, format(evaling), m)
	} catch(e) {
		conn.sendteks(m.chat, await format(e) + '\n\n*Anda Sepertinya Harus banyak belajar bangg*\n*Jangan Asal tempel code*', d.f1(e, ''))
	}
}