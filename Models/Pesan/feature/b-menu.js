export const handle = (m, conn, q, d) => {
	let bot = [
			['menu', ''],
			['owner', ''],
			['groupbot', ''],
			['script', ''],
			['delete', ''],
			['listblock', ''],
		]
	let grup = [
			['info', ''],
			['grup', ''],
			['hidetag', ''],
			['tagall', ''],
			['setname', ''],
			['setdesc', ''],
			['setppgc', ''],
			['kick', ''],
			['add', ''],
			['demote', ''],
			['promote', ''],
		]
	let owner = [
			['setppbot', ''],
			['setnamebot', ''],
			['setstatus', ''],
			['listgc', ''],
			['block', ''],
			['modes', ''],
			['join', ''],
		]
	let react = [
			['😡', '=> .kick'],
			['🤪', '=> .add'],
			['😎', '=> .promote'],
			['😒', '=> .demote'],
			['😌', '=> .delete'],
		]
	let teks = `[				Menu				]\n`
		teks += '\n*-- BOT --*\n'
		for (let u of bot) teks += `*${m.preff + u[0]}* ${u[1]}\n`
		teks += '\n*-- GROUP --*\n'
		for (let o of grup) teks += `*${m.preff + o[0]}* ${o[1]}\n`
		teks += '\n*-- OWNER --*\n'
		for (let p of owner) teks += `*${m.preff + p[0]}* ${p[1]}\n`
		teks += '*%*\n*~>*\n*>>*\n'
		teks += '\n*-- COMMAND REACTION --*\n'
		for (let b of react) teks += `${b[0]} *${b[1]}*\n`
	conn.sendteks(m.chat, teks, d.f1('Simple Menu ballbot v2', ''), d.f2('Github:me', q.thumb2, q.home))
}