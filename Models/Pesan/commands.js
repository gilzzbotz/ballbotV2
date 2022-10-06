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
export const commands = async (conn, m) => {
	try {
		const sendErr = (err) => conn.sendMessage(q.developer[0]+q.idwa, {text: `Command : ${m.preff+m.command}\nOleh : ${m.sender}\n\n${bb(format(err))}` })
		let meta = (m.isGc ? await conn.groupMetadata(m.chat).catch(e => null) : {}) || {}
		let members = (m.isGc ? await meta.participants : []) || []
		let admins = (m.isGc ? await findAdmin(members): {}) || {}
		let isAdmin = m.isGc ? admins.includes(m.sender) : false
		let isBotAdmin = m.isGc ? admins.includes(m.bot) : false
	
			/* Aku dapet dari : https://stackoverflow.com/questions/36367532/how-can-i-conditionally-import-an-es6-module */
		if (/(menu|help)$/i.test(m.command)) import('./feature/b-menu.js').then(v => v.handle(m, conn)).catch(e=>sendErr(e));
		if (/(creator|owner|developer)$/i.test(m.command)) import('./feature/b-creator.js').then(v => v.handle(m, q, conn)).catch(e=>sendErr(e));
		if (/(group|link|groupbot)$/i.test(m.command)) import('./feature/b-gcbot.js').then(v => v.handle(m, q, conn)).catch(e=>sendErr(e));
		if (/(script|sc)$/i.test(m.command)) import('./feature/b-script.js').then(v => v.handle(m, q, conn, bb)).catch(e=>sendErr(e));
		if (/(hidetag|ht)$/i.test(m.command)) import('./feature/g-hidetag.js').then(v => v.handle(m, q, conn, isAdmin, isBotAdmin, members)).catch(e=>sendErr(e));
		if (/(tagall|tgl)$/i.test(m.command)) import('./feature/g-tagall.js').then(v => v.handle(m, q, conn, isAdmin, isBotAdmin, members)).catch(e=>sendErr(e));
	} catch (e) {
		sendErr(e)
	}
}