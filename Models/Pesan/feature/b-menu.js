export const handle = (m, conn) => {
	let bot = [
			['menu', ''],
			['owner', ''],
			['groupbot', ''],
			['script', ''],
		]
	let grup = [
			['hidetag', 'query/null'],
			['tagall', 'query/null'],
			['setname', 'query/reply'],
			['setdesc', 'query/reply'],
		]
	let owner = [
			['ban', 'numb/tag/reply'],
			['block', 'numb/tag/reply'],
			['unblock', 'numb/tag/reply'],
		]
	let all = [
			bot,
			grup, 
			owner
		]
	let teks = `[				Menu				]\n`
		teks += '\n*-- BOT --*\n'
		for (let u of bot) teks += `*${m.preff + u[0]}* ${u[1]}\n`
		teks += '\n*-- GROUP --*\n'
		for (let o of grup) teks += `*${m.preff + o[0]}* ${o[1]}\n`
		teks += '\n*-- OWNER --*\n'
		for (let p of owner) teks += `*${m.preff + p[0]}* ${p[1]}\n`
	conn.sendteks(m.chat, teks, m)
}