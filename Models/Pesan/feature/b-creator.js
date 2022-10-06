export const handle = async (m, q, conn) => {
	let kontak = [
		[q.name, q.developer[0], 'Para Persetanan bot' ],
		['Bot', q.developer[1], 'Ini Bot WA ballbot Versi 1' ],
		];
	await conn.sendkon(m.chat, q.name, kontak, {mentions: [m.isGc ? m.sender : '']})
	.catch(v => conn.sendTag(m.chat, q.gagal, m.sender));
}