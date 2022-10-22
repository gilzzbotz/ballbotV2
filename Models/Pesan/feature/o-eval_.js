import { format, inspect } from 'util';

export const handle = async(m, conn, q, d, grup, findAdmin, bb) => {
	let { meta, members, admins, isAdmin, isBotAdmin, bot } = grup
	let db = conn.db
	if (!m.isOwn) return
	try {
		let evaling = await eval(m.text.length <= 2 ? Innalillahi_wainna_lillahi_rojiun:m.text.slice(2))
		conn.sendteks(m.chat, typeof evaling != 'string' ? inspect(evaling) : format(evaling), m)
	} catch(e) {
		conn.sendteks(m.chat, await format(e) + '\n\n*Anda Sepertinya Harus banyak belajar bangg*\n*Jangan Asal tempel code*', d.f1(e, ''))
	}
}