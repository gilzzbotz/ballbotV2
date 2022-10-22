import { format } from 'util'
import y, { join } from 'path'
import { fileURLToPath } from 'url'
import d from '../Fake/function.js';
import q from '../../Setting/settings.js';
import { unwatchFile, watchFile } from 'fs';
import { parser } from './parse-messages.js';
import { db } from '../DB/schema.js';

export const msgUp = async (iqbal, serve, s) => {
	try {
		let up = iqbal.messages[0]
		let bot = await serve.createJid(serve.user.id)
		console.log(up);
		if (!up) return 
		if (up.key.remoteJid === q.idst) return
		await serve.readMessages([up.key])
		if (up.key.id.endsWith('BOLA') && up.key.id.length === 32) return
		if (up.key.id.startsWith('3EB0') && up.key.id.length === 12) return
		let m = parser(serve, up, s)
		if (!m.isOwn && !serve.db.data.set[bot].public) return
		import('./detect.js').then(x=> x.detectGroup(up, serve, m)).catch(e=> console.log(e));
		// import('./call.js').then(x=> x.call(serve, q, up)).catch(e=> console.log(e));
		import('./commands.js').then(x=> x.commands(up, serve, m)).catch(e=> console.log(e));
		db(q, serve, m)
     	} catch (e) {
		console.error(e);
	}
}