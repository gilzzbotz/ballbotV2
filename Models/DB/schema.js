const isNum = x => typeof x == 'number' && isNaN(x);

export const db = async (q, serve, smsg) => {
	try {
// Untuk User nya [ otomatis add pas gk ada ]
		let user = serve.db.data.user[smsg.sender]
		if (typeof user !== 'object') serve.db.data.user[smsg.sender] = {}
		if (user) {
		if (!isNum(user.lastused)) serve.db.data.user[smsg.sender].lastused = new Date*1
		if (!('ban') in user) serve.db.data.user[smsg.sender].ban = false
		} else serve.db.data.user[smsg.sender] = {
			lastused: new Date*1,
			ban: false
		}
	// Group kalo belom ada ini buat bukti
		if (smsg.chat.endsWith(q.idgc)) {
			let cht = serve.db.data.chat[smsg.chat]
			if (typeof cht !== 'object') serve.db.data.user[smsg.sender] = {}
			if (cht) {
				if (!isNum(user.join)) serve.db.data.user[smsg.sender].join = new Date()*1
				if (!isNum(user.add)) serve.db.data.user[smsg.sender].add = 1324
				if (!('detect') in user) serve.db.data.user[smsg.sender].detect = true
				if (!('link') in user) serve.db.data.user[smsg.sender].link = false
				if (!('antidel') in user) serve.db.data.user[smsg.sender].antidel = false
				if (!('antilink') in user) serve.db.data.user[smsg.sender].antilink = false
				if (!('antivn') in user) serve.db.data.user[smsg.sender].antivn = false
				if (!('antistik') in user) serve.db.data.user[smsg.sender].antistik = false
			} else serve.db.data.user[smsg.sender] = {
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