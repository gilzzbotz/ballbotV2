const isNum = x => typeof x == 'number' && isNaN(x);

export const db = async (serve, smsg) => {
	if (serve.db.data == null) await serve.loadDB();
	try {
		if (smsg.sender) {
			let user = serve.db.data.user[smsg.sender]
			if (typeof user !== 'object') serve.db.data.user[smsg.sender] = {}
			if (user) {
			if (!isNum(user.lastused)) user.lastused = new Date*1
			} else serve.db.data.user[smsg.sender] = {
			lastused: new Date*1
			}
		}
		if (smsg.isGc) {
			let chat = serve.db.data.chat[smsg.chat]
			if (typeof chat !== 'object') serve.db.data.chat[smsg.chat] = {}
			if (chat) {
				if (!('detect') in chat) chat.detect = true
			} else serve.db.data.chat[smsg.chat] = {
				detect: true
			}
		}
		let bot = serve.db.data.set[smsg.bot]
		if (typeof bot !== 'object') serve.db.data.set[smsg.bot] = {}
		if (bot) {
			if (!('update') in bot) bot.update = []
			if (!('public') in bot) bot.public = true
		} else serve.db.data.set[smsg.bot] = {
			update: [],
			public: true
		}
	} catch (e) {
		console.error(e)
	}
}