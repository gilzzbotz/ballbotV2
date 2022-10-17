const isNum = x => typeof x == 'number' && isNaN(x);

export const db = async (q, serve, smsg) => {
	try {
// Untuk User nya [ otomatis add pas gk ada ]
		let user = serve.db.data.user[smsg.sender]
		if (typeof user !== 'object') user = {}
		if (user) {
		if (!isNum(user.lastused)) user.lastused = new Date*1
		if (!'ban' in user) user.ban = false
		} else user = {
			lastused: new Date*1,
			ban: false
		}
	// Group kalo belom ada ini buat bukti
		if (smsg.chat.endsWith(q.idgc)) {
			let cht = serve.db.data.chat[smsg.chat]
			if (typeof cht !== 'object') cht = {}
			if (cht) {
				if (!isNum(cht.join)) cht.join = new Date()*1
				if (!isNum(cht.add)) cht.add = 1324
				if (!'detect' in cht) cht.detect = true
				if (!'link' in cht) cht.link = false
				if (!'antidel' in cht) cht.antidel = false
				if (!'antilink' in cht) cht.antilink = false
				if (!'antivn' in cht) cht.antivn = false
				if (!'antistik' in cht) cht.antistik = false
				if (!'antibot' in cht) cht.antibot = false
			} else cht = {
				join: new Date()*1,
				add: 1324,
				detect: true,
				link: false, 
				antidel: false,
				antilink: false,
				antivn: false,
				antistik: false,
			}
		}
// Bot nya dah auto insert
		let bb = await serve.createJid(serve.user.id);
		let bot = serve.db.data.set[bb]
		if (typeof bot !== 'object') bot = {}
		if (bot) {
			if (!('update') in bot) bot.update = []
			if (!('blgc') in bot) bot.blgc = []
			if (!('public') in bot) bot.public = true
		} else bot = {
			update: [],
			blgc: [],
			public: true
		}
	} catch (e) {
		console.log(e)
	}
}