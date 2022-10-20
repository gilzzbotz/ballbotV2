import fs from 'fs';
import module from 'module';

const config = {
	name: 'bolaxd',
	developer: ['6285728625940', '13068016884'],
	moderator: [],
	browser: ['bolaxd', 'safari', '1.0.0'],
	autoload: 20000,
	sensitive: 0.7, // Kesensitivitas command
	namedb: 'database',
	mingc: 20, // Minimal Bot Join group 
	freeadd: 7, // Selain Owner yang joinin bot ke group [ free add ]
	gcbot: ['120363041493745571@g.us'], /* Only ID group */
	// males ngetik @s.wangsaf atau @g.us
	idwa: '@s.whatsapp.net',
	idgc: '@g.us',
	idst: 'status@broadcast',
	api: 'https://malesin.xyz/',
	home: 'https://github.com/bolaxd/ballbot-v2#readme',
	bug: 'https://github.com/bolaxd/ballbot-v2/issues',
	video: 'https://github.com/bolaxd/store-All/blob/main/hehe.mp4',
	// FAIL MESSAGES
	connect: 'Bot telah tersambung ke Konneksi server Whatsapp web',
	sukses: 'Berhasil :)',
	gagal: 'Kegagalan :(, mohon ulangi command anda\nJika ini salah Mohon report ke owner',
	owner: 'Khususon Owner',
	forgc: 'Untuk di group :]',
	leave: 'Hai kak, Saya diperintahkan Owner untuk keluar dari group ini :)\nMohon maaf ya kak jika bot punya banyak kesalahan :)\nGood bye kak',
	forimg: 'Kirim image lalu dengan caption command / atau kirim image dulu lalu di reply text command',
	forteks: 'Reply atau tag member atau tulis nomor member setelah command',
	admin: 'Kamu bukan orang dalam-_\nKhusus admin',
	botadmin: 'bot bukan orang dalem-_\nAdminin dong',
	active: 'Sebelom nya sudah aktif :v',
	unactive: 'Sebelom nya sudah tidak aktif :v',
	aslink: 'Pasanglah Link setelah command',
	gcouttime: 'Hai Kak, Bot ini masa aktifnya telah habis, Bot akan keluar otomatis',
	linkadm: 'Admin Group tidak mengijinkan link group untuk di share :)',
	notext: 'Teks nya mana?',
	wait: 'Sek Loading...',
	ok: 'Oke Min',
}

export default config;