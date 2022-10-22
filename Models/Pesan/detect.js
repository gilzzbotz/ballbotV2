import b from '../Fake/function.js';

export const detectGroup = async (p, q, m) => {
	try {
		let from = p.key.remoteJid
		let bot = await q.createJid(q.user.id)
		let parti = p.key.participant
		let stype = p.messageStubType
		let mstub = stype ? p.messageStubParameters.join() : ''
		if (!m.chat.endsWith('@g.us')) return
		if (q.db.data.chat[m.chat].detect) {
			let greeting = (stype == 21) ? q.sendteks(from, `@${parti.split('@')[0]} Telah mengubah Judul group menjadi *${mstub}*`, b.f1('Notifikasi Update Participants', ''), {mentions: [parti]})
			: (stype == 32) ? q.sendteks(from, `@${mstub.split("@")[0]} Telah keluar dari group :(`, b.f1('Notifikasi Update Participants', ''), {mentions: [mstub]})
			: (stype == 71) ? q.sendteks(from, `@${mstub.split("@")[0]} Telah bergabung ke grup Dengan undangan bot`, b.f1('Notifikasi Update Participants', ''), {mentions: [mstub]})
			: (stype == 27) ? q.sendteks(from, parti === undefined ? ` @${mstub.split('@')[0]} Telah bergabung menggunakan tautan group ini` : `Admin @${parti.split('@')[0]} telah menambahkan @${mstub.split('@')[0]} Kegroup ini`, b.f1('Notifikasi Update Participants', ''), {mentions: [mstub, parti]})
			: (stype == 28 && !mstub.includes(bot)) ? q.sendteks(from, `@${parti.split('@')[0]} Telah mengeluarkan @${mstub.split('@')[0]} dari group ini`, b.f1('Notifikasi Update Participants', ''), {mentions: [mstub, parti]})
			: (stype == 29 && !mstub.includes(bot)) ? q.sendteks(from, `@${parti.split('@')[0]} Telah mempromosikan @${mstub.split('@')[0]} sebagai admin`, b.f1('Notifikasi Update Participants', ''), {mentions: [mstub, parti]})
			: (stype == 30 && !mstub.includes(bot)) ? q.sendteks(from, `@${parti.split('@')[0]} Telah menurunkan @${mstub.split('@')[0]} Jabatannya sebagai admin`, b.f1('Notifikasi Update Participants', ''), {mentions: [mstub, parti]})
			: (stype == 29 && mstub.includes(bot)) ? q.sendteks(from, `@${parti.split('@')[0]} Telah mempromosikan bot sebagai admin`, b.f1('Notifikasi Update Participants', ''), {mentions: [parti]})
			: (stype == 30 && mstub.includes(bot)) ? q.sendteks(from, `@${parti.split('@')[0]} Telah menurunkan Jabatan bot sebagai admin`, b.f1('Notifikasi Update Participants', ''), {mentions: [parti]})
			: '';
			return greeting
		}
	} catch (e) {
		console.log(e)
	}
}