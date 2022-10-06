export const detectGroup = async (p, q, m) => {
	try {
		let from = p.key.remoteJid
		let bot = await q.createJid(q.user.id)
		let parti = p.key.participant
		let stype = p.messageStubType
		let mstub = stype ? p.messageStubParameters.join() : ''
		if (q.db.data.chat[m.chat]) {
			let greeting = (stype == 21) ? q.sendFvid(from, `@${parti.split('@')[0]} Telah mengubah Judul group menjadi *${mstub}*`)
			: (stype == 27) ? q.sendFvid(from, `Hai @${mstub.split('@')[0]} Kamu telah bergabung dengan Group ini melalui tautan group ini\nJangan Lupa untuk intro yah`)
			: (stype == 32) ? q.sendFvid(from, `@${mstub.split("@")[0]} Telah keluar dari group :(`)
			: (stype == 71) ? q.sendFvid(from, `@${mstub.split("@")[0]} Telah bergabung ke grup Dengan Undangan bot`)
			: (stype == 28 && !mstub.includes(bot)) ? q.sendFvid(from, `@${parti.split('@')[0]} Telah mengeluarkan @${mstub.split('@')[0]} dari group ini`)
			: (stype == 29 && !mstub.includes(bot)) ? q.sendFvid(from, `@${parti.split('@')[0]} Telah mempromosikan @${mstub.split('@')[0]} sebagai admin`)
			: (stype == 30 && !mstub.includes(bot)) ? q.sendFvid(from, `@${parti.split('@')[0]} Telah menurunkan @${mstub.split('@')[0]} Jabatannya sebagai admin`)
			: (stype == 29 && mstub.includes(bot)) ? q.sendFvid(from, `@${parti.split('@')[0]} Telah mempromosikan bot sebagai admin`)
			: (stype == 30 && mstub.includes(bot)) ? q.sendFvid(from, `@${parti.split('@')[0]} Telah menurunkan Jabatan bot sebagai admin`)
			: '';
			return greeting
		}
	} catch (e) {
		console.error(e)
	}
}