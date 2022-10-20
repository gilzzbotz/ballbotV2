const isNum = x => typeof x == 'number' && isNaN(x);

export const db = async (q, serve, smsg) => {
	try {
// Untuk User nya [ otomatis add pas gk ada ]
		let user = serve.db.data.user[smsg.sender]
		if (typeof user !== 'object') serve.db.data.user[smsg.sender] = {}
		if (user) {
		if (!isNum(user.lastused)) serve.db.data.user[smsg.sender].lastused = new Date*1
		if (!'ban' in user) serve.db.data.user[smsg.sender].ban = false
		} else serve.db.data.user[smsg.sender] = {
			lastused: new Date*1,
			ban: false
		}
	// Group kalo belom ada ini buat bukti
		if (smsg.chat.endsWith(q.idgc)) {
			let cht = serve.db.data.chat[smsg.chat]
			if (typeof cht !== 'object') serve.db.data.chat[smsg.chat] = {}
			if (cht) {
				if (!isNum(cht.join)) serve.db.data.chat[smsg.chat].join = new Date()*1
				if (!isNum(cht.add)) serve.db.data.chat[smsg.chat].add = 1324
				if (!isNum(cht.cht)) serve.db.data.chat[smsg.chat].cht = 0
				if (!'ban' in cht) serve.db.data.chat[smsg.chat].ban = false
				if (!'detect' in cht) serve.db.data.chat[smsg.chat].detect = true
				if (!'link' in cht) serve.db.data.chat[smsg.chat].link = false
				if (!'antidel' in cht) serve.db.data.chat[smsg.chat].antidel = false
				if (!'antilink' in cht) serve.db.data.chat[smsg.chat].antilink = false
				if (!'antivn' in cht) serve.db.data.chat[smsg.chat].antivn = false
				if (!'antistik' in cht) serve.db.data.chat[smsg.chat].antistik = false
				if (!'antibot' in cht) serve.db.data.chat[smsg.chat].antibot = false
			} else serve.db.data.chat[smsg.chat] = {
				join: new Date()*1,
				add: 1324,
				cht: 0,
				ban: false,
				detect: true,
				link: false, 
				antidel: false,
				antilink: false,
				antivn: false,
				antistik: false,
				antibot: false,
			}
		}
// Bot nya dah auto insert
		let bb = await serve.createJid(serve.user.id);
		let bot = serve.db.data.set[bb]
		if (typeof bot !== 'object') serve.db.data.set[bb] = {}
		if (bot) {
			if (!('update') in bot) serve.db.data.set[bb].update = []
			if (!('blgc') in bot) serve.db.data.set[bb].blgc = []
			if (!('public') in bot) serve.db.data.set[bb].public = true
		} else serve.db.data.set[bb] = {
			update: [],
			blgc: [],
			public: true
		}
	} catch (e) {
		console.log(e)
	}
}