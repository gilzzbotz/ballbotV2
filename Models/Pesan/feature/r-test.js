export const handle = (m, q, conn) => {
	let buttons = [
		['Oke min', 'hehe']
		]
	conn.butteks(m.chat, 'Ini adalah command hasil reaction emote ❤️', q.name, buttons)
}