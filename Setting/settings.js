
const config = {
	name: 'bolaxd', //nama sih
	developer: ['6285728625940', '13068016884'], //Nomor owner
	moderator: [], //Nomor mod [kalo ada]
	browser: ['bolaxd', 'safari', '1.0.0'],
	gcbot: ['120363041493745571@g.us'], /* Only ID group */
	thumb: 'https://telegra.ph/file/145c06fa8c8b4ee92b203.jpg',
	thumb2: 'https://telegra.ph/file/7eb1fc815b59e24c07ab0.jpg',
	autoload: 20000, // Load DB [ ini udah Fix coi ]
	sensitive: 0.7, // Kesensitivitas command
	longbc: 7000, // Long BC adalah Penjagaan Broadcast anti banned 
	mingc: 20, // Minimal Bot Join group 
	freeadd: 7, // Selain Owner yang joinin bot ke group [ free add ]
	namedb: 'database', // Nama Database 
	
	// males ngetik @s.wangsaf atau @g.us
	// Dibawah ini jangan di ubah bang
	idwa: '@s.whatsapp.net',
	idgc: '@g.us',
	idst: 'status@broadcast',
	api: 'https://malesin.xyz/',
	home: 'https://github.com/bolaxd/ballbot-v2#readme',
	bug: 'https://github.com/bolaxd/ballbot-v2/issues',
	video: 'https://github.com/bolaxd/store-All/blob/main/hehe.mp4',
	
	// Ini Function [ Jangan di ganti yaah :) ]
	delay: async(ms)=>{return new Promise(resolve=>setTimeout(resolve, ms))},
	rupe: (nominal)=>{var numb = nominal.toString();var sisa=numb.length % 3;var rupe=numb.substr(0, sisa);var ribu=numb.substr(sisa).match(/\d{3}/g);let heh;if(ribu)heh=sisa?',':'';rupe+=heh+ribu.join(',');return rupe},
	url: (url)=>{return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))},
	
	// FAIL MESSAGES
	 //INI UBAH SAJA SESUAI KEBUTUHAN [KALO BISA DITAMBAHIN]
	connect: 'Bot telah tersambung ke Konneksi server Whatsapp web',
	sukses: 'Berhasil :)',
	gagal: 'Kegagalan :(, mohon ulangi command anda\nJika ini salah Mohon report ke owner',
	owner: 'Khususon Owner',
	forgc: 'Untuk di group :]',
	leave: 'Hai kak, Saya diperintahkan Owner untuk keluar dari group ini :)\nMohon maaf ya kak jika bot punya banyak kesalahan :)\nGood bye kak',
	forimg: 'Kirim image lalu dengan caption command / atau kirim image dulu lalu di reply text command',
	forteks: 'Reply atau tag member atau tulis nomor member setelah command',
	teks: 'Reply teks / masukan karakter setelah command',
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