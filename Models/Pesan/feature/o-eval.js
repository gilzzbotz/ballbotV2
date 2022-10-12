import { inspect, format } from 'util';
export const handle = async(m, conn) => {
	if (!m.isOwn) return
	//if (!m.query) return
	conn.sendteks(m.chat, 'Executing...', m)
	if (m.text.startsWith('>>')) {
		const Return = (res) => {
			let bot = JSON.stringify(res, null, 2)
			let result = format(bot)
			if (bot == undefined) result = format(res)
			return conn.sendteks(m.chat, result, m)
		}
		try {
			conn.sendteks(m.chat, format(eval(`(async () => { return ${m.text.slice(3)} })()`)), m)
		} catch (e) {
			conn.sendteks(m.chat, String(e), m)
		}
	} else if (m.text.startsWith('>')) {
		try {
			let evaling = await eval(m.text.slice(2))
			if (typeof evaling !== 'string') evaling = inspect(evaling)
			await conn.sendteks(m.chat, evaling, m)
		} catch (err) {
			await conn.sendteks(m.chat, String(err), m)
		}
	}
}