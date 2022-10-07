import { format } from 'util'
import y, { join } from 'path'
import { fileURLToPath } from 'url'
import d from '../Fake/function.js';
import q from '../../Setting/settings.js';
import { unwatchFile, watchFile } from 'fs'
import { parser } from './parse-messages.js';
import { detectGroup } from './detect.js';
import { commands } from './commands.js';
import { db } from '../DB/schema.js';

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
		detectGroup(up, serve, m)
		db(serve, m)
      commands(serve, m)
     	} catch (e) {
		console.error(e);
	}
}