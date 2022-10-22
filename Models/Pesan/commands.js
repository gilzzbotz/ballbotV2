import simi from 'similarity'; //Matikan jika kamu gk perlu kemiripan commands
import { format } from 'util';
import q from '../../Setting/settings.js';
import d from '../Fake/function.js';
const z = q.sensitive
const bb = (teks) => '```'+teks+'```'

const findAdmin = (arr) => {
	let admins = []
	for (let i of arr) i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
	return admins || []
}
export const commands = async (up, conn, m) => {
	const cmd = (teks) => simi(teks, m.command) > z
	const sendE = async(err) => { for (let u of q.developer) { await q.delay(4000); conn.sendteks(u+q.idwa, `Command : /${m.command}\nOleh : ${m.sender}\n\n${bb(format(err))}`, d.f1)}}
	try {
		let grup = {}
		grup.bot = await conn.createJid(conn.user.id)
		grup.meta = (m.isGc ? await conn.groupMetadata(m.chat).catch(e => null) : {}) || {}
		grup.members = (m.isGc ? await grup.meta.participants : []) || []
		grup.admins = (m.isGc ? await findAdmin(grup.members): {}) || {}
		grup.isAdmin = m.isGc ? grup.admins.includes(m.sender) : false
		grup.isBotAdmin = m.isGc ? grup.admins.includes(grup.bot) : false
			/* Aku dapet dari : https://stackoverflow.com/questions/36367532/how-can-i-conditionally-import-an-es6-module */

		//Bot
		if (m.fromMe) return
		import('./feature/__handle-all.js').then(x=> x.all(m, up, q, d, conn, grup)).catch(e=> sendE(e))
		if (cmd('menu') || cmd('help')) import('./feature/b-menu.js').then(v => v.handle(m, conn, q, d)).catch(e=>sendE(e));
		if (cmd('owner') || cmd('creator')) import('./feature/b-creator.js').then(v => v.handle(m, q, conn)).catch(e=>sendE(e));
		if (cmd('groupbot') || cmd('grupbot')) import('./feature/b-gcbot.js').then(v => v.handle(m, q, conn)).catch(e=>sendE(e));
		if (cmd('script') || cmd('sc')) import('./feature/b-script.js').then(v => v.handle(m, q, conn, bb)).catch(e=>sendE(e));
		if (cmd('listblock')) import('./feature/b-listblock.js').then(v => v.handle(m, q, conn)).catch(e=>sendE(e));
		if (cmd('delete') || cmd('del')) import('./feature/b-delete.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		//Group
		if (cmd('hidetag') || cmd('ht')) import('./feature/g-hidetag.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (cmd('info') || cmd('grup')) import('./feature/g-info.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (cmd('kick')) import('./feature/g-kick.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (cmd('add')) import('./feature/g-add.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (cmd('promote')) import('./feature/g-pm.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (cmd('demote')) import('./feature/g-dm.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (cmd('tagall')) import('./feature/g-tagall.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (cmd('setname')) import('./feature/g-setname.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (cmd('setdesc')) import('./feature/g-setdesc.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (cmd('setppgc') || cmd('setppgrup')) import('./feature/g-setppgc.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		//Owner
		if (cmd('setppbot')) import('./feature/o-ppbot.js').then(v => v.handle(m, q, conn)).catch(e=>sendE(e));
		if (cmd('setnamebot')) import('./feature/o-setnbot.js').then(v => v.handle(m, q, conn)).catch(e=>sendE(e));
		if (cmd('setstatus')) import('./feature/o-setstatus.js').then(v => v.handle(m, q, conn)).catch(e=>sendE(e));
		if (cmd('block')) import('./feature/o-block.js').then(v => v.handle(m, q, conn)).catch(e=>sendE(e));
		if (cmd('modes')) import('./feature/o-modes.js').then(v => v.handle(m, q, conn)).catch(e=>sendE(e));
		if (cmd('join')) import('./feature/o-join.js').then(v => v.handle(m, q, conn)).catch(e=>sendE(e));
		if (cmd('listgc') || cmd('listgrup')) import('./feature/o-listgc.js').then(v => v.handle(m, q, conn, findAdmin)).catch(e=>sendE(e));
		if (cmd('bcgc')) import('./feature/o-bcgc.js').then(v => v.handle(m, q, d, conn)).catch(e=>sendE(e));
		// Evaling owner
		if (m.text.startsWith('%')) import('./feature/o-exec.js').then(v => v.handle(m, conn)).catch(e=>sendE(e));
		if (m.text.startsWith('~>')) import('./feature/o-eval_.js').then(v => v.handle(m, conn, q, d, grup, findAdmin, bb)).catch(e=>sendE(e));
		if (m.text.startsWith('>>')) import('./feature/o-eval.js').then(v => v.handle(m, conn, q, d, grup, findAdmin, bb)).catch(e=>sendE(e));
		// COMMAND REACTION MESSAGE
		
		if (m.rtext == '😌') import('./feature/b-delete.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (m.rtext == '😡') import('./feature/g-kick.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (m.rtext == '🤪') import('./feature/g-add.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (m.rtext == '😎') import('./feature/g-pm.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
		if (m.rtext == '😒') import('./feature/g-dm.js').then(v => v.handle(m, q, conn, grup)).catch(e=>sendE(e));
	} catch (e) {
		console.log(e);
	}
}