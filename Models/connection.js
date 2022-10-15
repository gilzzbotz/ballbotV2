const { DisconnectReason } = (await import('@adiwajshing/baileys')).default;
import q from '../Setting/settings.js';
import b from './Fake/function.js';
import { Boom } from '@hapi/boom';

export const con = async(p, serve, mulai) => {
   const { lastDisconnect, connection } = p 
   try {
      if (connection == 'close') {
	      if (new Boom(lastDisconnect.error ).output?.statusCode === DisconnectReason.loggedOut) mulai()
	      else mulai()
      } else if (connection == 'open') {
	      serve.sendteks(q.developer[0]+q.idwa, q.connect, b.f1);
	      console.log(p);
      }
   } catch (e) { console.log(e) }
}