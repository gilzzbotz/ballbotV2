export const handle = async (m, q, conn) => {
	let list = await conn.fetchBlocklist()
	let teks = '====[  LIST BLOCKED  ]====\n\n'
		 teks += `Total: ${list.length}\n`
	for (let u of list) teks += `@${u.split('@')[0]}\n`
	let but = [
			['Minta unblock', '.owner'],
		]
	conn.sendbut(m.chat, teks, q.name, but, m)
}