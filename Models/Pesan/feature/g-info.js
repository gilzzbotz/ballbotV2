export const handle = async (m, q, conn, grup) => {
	if (!m.isGc) return conn.sendteks(m.chat, q.forgc, m)
	let { meta, isBotAdmin, isAdmin } = grup
	if (m.query == 'link') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
			if (isAdmin) {
				conn.groupInviteCode(m.chat)
					.then(v => conn.sendteks(m.chat, `Link Group\n\nhttps://chat.whatsapp.com/${v}`, m))
					.catch(e => conn.sendteks(m.chat, q.gagal, m))
			} else if (!isAdmin) {
				if (!conn.db.data.chat[m.chat].link) return conn.sendteks(m.chat, q.linkadm, m)
				conn.groupInviteCode(m.chat)
					.then(v => conn.sendteks(m.chat, `Link Group\n\nhttps://chat.whatsapp.com/${v}`, m))
					.catch(e => conn.sendteks(m.chat, q.gagal, m))
			}
	} else if (m.query == 'gcbuka') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		conn.groupSettingUpdate(m.chat, 'announcement')
			.then(v => conn.sendteks(m.chat, q.sukses, m))
			.catch(v => conn.sendteks(m.chat, q.gagal, m))
	} else if (m.query == 'gctutup') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		conn.groupSettingUpdate(m.chat, 'not_announcement')
			.then(v => conn.sendteks(m.chat, q.sukses, m))
			.catch(v => conn.sendteks(m.chat, q.gagal, m))
	} else if (m.query == 'infobuka') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		conn.groupSettingUpdate(m.chat, 'unlocked')
			.then(v => conn.sendteks(m.chat, q.sukses, m))
			.catch(v => conn.sendteks(m.chat, q.gagal, m))
	} else if (m.query == 'infotutup') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		conn.groupSettingUpdate(m.chat, 'locked')
			.then(v => conn.sendteks(m.chat, q.sukses, m))
			.catch(v => conn.sendteks(m.chat, q.gagal, m))
	} else if (m.query == 'detekbuka') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].detect) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].detect = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'detektutup') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].detect) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].detect = false
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'linkbuka') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (conn.db.data.chat[m.chat].link) return conn.sendteks(m.chat, q.active, m)
		conn.db.data.chat[m.chat].link = true
		conn.sendteks(m.chat, q.sukses, m)
	} else if (m.query == 'linktutup') {
		if (!isBotAdmin) return conn.sendteks(m.chat, q.botadmin, m)
		if (!isAdmin) return conn.sendteks(m.chat, q.admin, m)
		if (!conn.db.data.chat[m.chat].link) return conn.sendteks(m.chat, q.unactive, m)
		conn.db.data.chat[m.chat].link = false
		conn.sendteks(m.chat, q.sukses, m)
	} else {
		let list = []
		let teks = `INFO GROUP \n\n`
			 teks += `Nama Group: *${meta.subject}*\n`
			 teks += `Members: *${meta.size}*\n`
			 teks += `Pembuat Group: *${meta.owner == undefined ? 'Kosong' : meta.owner.split('@')[0]}*\n`
			 teks += `Edit info: *${meta.restrict ? 'Hanya admin' : 'Semua member'}*\n`
			 teks += `Kirim pesan: ${meta.announce ? 'Hanya admin' : 'Semua member'}\n`
			 teks += `Detect Group: *${conn.db.data.chat[m.chat].detect ? 'Online' : 'Offline'}*\n`
			 teks += `Bagikan link Group: *${conn.db.data.chat[m.chat].link ? 'Boleh' : 'Jangan'}*\n`
		list.push(['Link Group ini', '.info link', 'Link group whatsapp ini'])
		if (isAdmin) {
			if (meta.restrict) list.push(['Buka Edit info', '.info infobuka', 'Beri akses member untuk mengedit info group'])
			else list.push(['Tutup Edit Info', '.info infotutup', 'Jangan beri akses member untuk mengedit info group'])
			if (meta.announce) list.push(['Buka Group', '.info gcbuka', 'Beri akses member untuk mengirim pesan ke group'])
			else list.push(['Tutup Group', '.info gctutup', 'Jangan beri akses member untuk mengirim pesan ke group'])
			if (conn.db.data.chat[m.chat].detect) list.push(['Matikan Detect group', '.info detektutup', 'Bot tidak akan memberikan deteksi perubahan group'])
			else list.push(['Hidupkan Detect group', '.info detekbuka', 'Bot akan mulai deteksi perubahan yang ada di group'])
			if (conn.db.data.chat[m.chat].link) list.push(['Jangan Bagi link ke member', '.info linktutup', 'Bot tidak akan memberikan link group kepada member'])
			else list.push(['Bagi link ke member', '.info linkbuka', 'Bot akan memberikan link ke member jika diminta'])
		}
		conn.sendlist(m.chat, teks, q.name, list, m)
	}
}