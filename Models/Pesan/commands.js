import simi from 'similarity'; //Matikan jika kamu gk perlu kemiripan commands
import fs from 'fs';
const jsoncmd = JSON.parse(fs.readFileSync('./Models/Pesan/commands.json'));

export default async (m, extra) => {
	let { q, bot, conn, isblock, sendE, up } = extra
	/* Aku dapet dari : https://stackoverflow.com/questions/36367532/how-can-i-conditionally-import-an-es6-module */
	const path = './feature/'
	const call = (PATH) => import(path+PATH).then(v=>v.handle(m, extra)).catch(e=>sendE(e))
	const cmr = (emot, PATH) => {if((m.rtext == emot) && !isblock) import(path+PATH).then(__cmd=>__cmd.handle(m, extra)).catch(__err=> sendE(__err))}
	const cmd = (command, PATH) => {if((simi(command,m.command)>q.sensitive)&&!isblock)import(path+PATH).then(__all=>__all.handle(m, extra)).catch(__err=> sendE(__err))}
		// COMMAND
		if (up.key.fromMe) return
		if (!m.isOwn && !conn.db.data.set[bot].public) return
		if (m.message) call('__handle-all.js');
		for (var i of jsoncmd[0]) cmd(i[0], i[1]+'.js');
		// COMMAND REACT
		for (var u of jsoncmd[1]) cmr(u[0], u[1]+'.js');
};