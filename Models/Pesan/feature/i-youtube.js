import { youtubeSearch } from '@bochilteam/scraper';

export const handle = async (m, { q, d, conn }) => {
	try {
		if (!m.query) throw q.query
		await conn.sendteks(m.chat, q.wait, m)
		let res = await youtubeSearch(m.query)
		let teks = 'YOUTUBE SEARCH...\n\n'
		for (let u of res.video) {
		teks	+=`*JUDUL:* ${!u.title ? 'Tidak terdeteksi' : u.title}\n`
		teks	+=`*DESCRIPTION:* ${!u.description ? 'Tidak terdeteksi' :u.description}\n`
		teks	+=`*VIEWERS:* ${!u.viewH ? 'Tidak terdeteksi': u.viewH}\n`
		teks	+=`*DURASI:* ${!u.durationH ? 'Tidak terdeteksi' :u.durationH}\n`
		teks	+=`*PUBLISH:* ${!u.publishedTime ? 'Tidak terdeteksi': u.publishedTime}\n`
		teks	+=`*CHANNEL:* ${!u.authorName ? 'Tidak terdeteksi': u.authorName}\n`
		teks	+=`*LINK:* ${!u.url ? 'Tidak terdeteksi': u.url}\n\n`
		}
		conn.sendteks(m.chat, teks, m, d.f2('Youtube Search', res.video[0].thumbnail, res.video[0].url))
	} catch (e) { conn.sendteks(m.chat, e, m) }
}