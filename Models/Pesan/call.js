export const call = async (conn, q, up) => {
	let bot = await conn.createJid(conn.user.id)
	let stub = up.messageStubType
	let cht = up.key.remoteJid
	let dd;
	if (stub == 40) {
		if (conn.db.data.set[bot].call) return
			console.log('Ditelfonnn');
			conn.sendteks(cht, '[  ANTI TELEPON  ]\nJangan Telepon bot!!!\nSilahkan anda minta Owner untuk unblock')
			let kontak = [
				[q.name, q.developer[0], 'Para Persetanan bot' ],
				['Bot', q.developer[1], 'Yo haloo gw orang biasa' ],
			];
			await conn.sendkon(cht, 'hehe', kontak)
			dd = setTimeout(async() => {
				await conn.updateBlockStatus(cht, 'block')
			}, 4000);
	}
	return dd;
}