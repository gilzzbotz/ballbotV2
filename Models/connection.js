const { DisconnectReason } = (await import('@adiwajshing/baileys')).default;
import q from '../Setting/settings.js';
import { Boom } from '@hapi/boom';

export const con = async(p, serve, mulai) => {
   const { lastDisconnect, connection } = p 
   try {
      connection == 'close' ? 
      (new Boom(lastDisconnect.error ).output?.statusCode === DisconnectReason.loggedOut ? mulai() : mulai()):
      connection == 'open' ? 
      //serve.sendMessage(q.developer[0]+q.idwa, { text: q.connect })
      ''
      :console.log(p);
   } catch (e) {
   	console.log(e)
   }
}