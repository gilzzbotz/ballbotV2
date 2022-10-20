export const handle = (m, conn) => {
	let bot = [
			['menu', ''],
			['owner', ''],
			['groupbot', ''],
			['script/sc', ''],
			['delete/del', ''],
		]
	let grup = [
			['info', ''],
			['hidetag/ht', ''],
			['tagall/tgl', ''],
			['setname', ''],
			['setdesc', ''],
			['kick/kik', ''],
			['add', ''],
			['demote/dm', ''],
			['promote/pm', ''],
		]
	let owner = [
			['ban', ''],
			['listgc/listgrup', ''],
			['block', ''],
			['unblock', ''],
			['join', ''],
		]
	let react = [
			['😡', '=> .kick'],
			['🤪', '=> .add'],
			['😎', '=> .promote'],
			['😒', '=> .demote'],
			['🙃', '=> .tagall'],
			['🤣', '=> .hidetag'],
			['😌', '=> .delete'],
		]
	let teks = `[				Menu				]\n`
		teks += '\n*-- BOT --*\n'
		for (let u of bot) teks += `*${m.preff + u[0]}* ${u[1]}\n`
		teks += '\n*-- GROUP --*\n'
		for (let o of grup) teks += `*${m.preff + o[0]}* ${o[1]}\n`
		teks += '\n*-- OWNER --*\n'
		for (let p of owner) teks += `*${m.preff + p[0]}* ${p[1]}\n`
		teks += '*=*\n*//*\n*--*\n'
		teks += '\n*-- COMMAND REACTION --*\n'
		for (let b of react) teks += `${b[0]} *${b[1]}*\n`
	conn.sendteks(m.chat, teks, m)
}