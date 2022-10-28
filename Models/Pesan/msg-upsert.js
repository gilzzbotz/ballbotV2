import { wallpaper, wallpaperv2, wallpaperv3 } from '@bochilteam/scraper';
import { format } from 'util'
import { db } from '../DB/schema.js';
import d from '../Fake/function.js';
import q from '../../Setting/settings.js';
import detect from './detect.js';
import cmds from './commands.js'
import parser from './parse-messages.js';
const bb = (teks) => '```'+teks+'```'
export const msgUp = async (iqbal, serve, s) => {
	try {
		let up = iqbal.messages[0]
		if (!up) return 
		if (up.key.remoteJid === q.idst) return
		await serve.readMessages([up.key])
		if (up.key.id.endsWith('BOLA') && up.key.id.length === 32) return
		if (up.key.id.startsWith('3EB0') && up.key.id.length === 12) return
		console.log(up);
		let m = parser(serve, up, s)
		let extra = {}
			 extra.up = up
			 extra.conn = serve
			 extra.bot = await serve.createJid(serve.user.id)
			 extra.findAdmin = (arr)=>{let admins = [];for (let i of arr) i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : '';return admins || []}
			 extra.meta = (m.isGc ? await serve.groupMetadata(m.chat).catch(e => null) : {}) || {}
			 extra.members = (m.isGc ? await extra.meta.participants : []) || []
			 extra.admins = (m.isGc ? await extra.findAdmin(extra.members): {}) || {}
			 extra.isAdmin = m.isGc ? extra.admins.includes(m.sender) : false
			 extra.isBotAdmin = m.isGc ? extra.admins.includes(extra.bot) : false
			 extra.isNum = x => typeof x == 'number' && isNaN(x);
			 extra.budy = typeof m.text == 'string' ? m.text : ''
			 extra.sendE = async (err) => serve.sendteks(q.developer[0]+q.idwa, `Command : /${m.command}\nOleh : ${m.sender}\n\n${bb(format(err))}`, d.f1(err, ''))
			 extra.getpp = async (sender) => {let pp;try {pp = await serve.profilePictureUrl(sender, 'image')} catch (e) {let res = await wallpaper('miku').catch(_=> wallpaperv2('spiderman')).catch(_=>wallpaperv3('anime')).catch(_=>q.thumb2);pp = q.rdm(res)}}
			 extra.quoted = m.quoted ? m.quoted : m
			 extra.quotry = m.quoted ? m.quoted.text : m.query
			 extra.mime = (extra.quoted.msg || extra.quoted).mimetype || extra.quoted.mediaType || ''
			 extra.lblock = await serve.fetchBlocklist().catch(_=>[])
			 extra.isblock = m.isGc ? extra.lblock.includes(m.sender) : false
			 extra.bb = bb
			 extra.q = q
			 extra.d = d
			db(m, extra)
			detect(m, extra)
			cmds(m, extra)
     	} catch (e) {
		console.error(e);
	}
}