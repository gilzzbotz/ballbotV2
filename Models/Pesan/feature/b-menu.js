export const handle = (m, conn) => {
	let menu = [
			'menu', 
			'owner',
			'groupbot',
			'script',
			'hidetag',
			'tagall',
		]
	let teks = `[				Menu				]\n\n`
	for (let i of menu.sort()) teks += `*${m.preff + i}*\n`
	conn.sendMessage(m.chat, {text: teks, mentions: [m.sender]})
}