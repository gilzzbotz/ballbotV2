import { format } from 'util'
import y, { join } from 'path'
import { fileURLToPath } from 'url'
import d from '../Fake/function.js';
import q from '../../Setting/settings.js';
import { unwatchFile, watchFile } from 'fs';
import { parser } from './parse-messages.js';

export const msgUp = async (iqbal, serve, s) => {
	try {
		let up = iqbal.messages[0]
		console.log(up);
		if (!up) return 
		if (up.key.remoteJid === q.idst) return
		await serve.readMessages([up.key])
		if (up.key.id.endsWith('BOLA') && up.key.id.length === 32) return
		if (up.key.id.startsWith('3EB0') && up.key.id.length === 12) return
		if (up.key.id.startsWith('BAE5') && up.key.id.length === 16) return
		let m = parser(serve, up, s)
		import('../DB/schema.js').then(x=> x.db(q, serve, m)).catch(e=> console.log(e));
		let setInt = setInterval(() => {
			import('../Function/auto-leave.js').then(x=> x.Leave(serve, m, setInt)).catch(e=> console.log(e))
		}, 1000);
		import('./detect.js').then(x=> x.detectGroup(up, serve, m)).catch(e=> console.log(e));
		import('./commands.js').then(x=> x.commands(serve, m)).catch(e=> console.log(e));
     	} catch (e) {
		console.error(e);
	}
}