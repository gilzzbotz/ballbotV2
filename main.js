const { default: HOHOHOHO, useMultiFileAuthState, makeInMemoryStore } = (await import('baileys')).default;
import { msgUp } from './Models/Pesan/msg-upsert.js';
import { connect } from './Models/Function/serve.js';
import { con } from './Models/connection.js';
import q from './Setting/settings.js';
import * as ws from 'ws';
import p from 'pino';
import fs from 'fs';
const logs = p({ level: 'silent' })
const store = makeInMemoryStore({ logger: logs })

/*
* @param { makeWASocket, useMultiFileAuthState }
* from adiwajshing/baileys
* @param { iqbal, serve }
* Created By https://github.com/bolaxd/
*/
const mulai = async() => {
	try {
	   const { state, saveCreds } = await useMultiFileAuthState('Auth');
	   const serve =  HOHOHOHO({
	      browser: q.browser, // From config
	      printQRInTerminal: true, // QR terminal
	      logger: logs, // Pino String query
	      auth: state // Baileys Multi
	   });
	   store.bind(serve.ev);
	   connect(serve);
	   // DATABASE
		if (serve.db) setInterval(async () => {
			if (serve.db.data) await serve.db.write();
		}, q.autoload);
		serve.loadDB();
	   // Menangani koneksi
	   serve.ev.on('connection.update', async (iqbal) => con(iqbal, serve, mulai));
	   // Menangani acara { pesan, update }
	   serve.ev.on('messages.upsert', async (iqbal) => msgUp(iqbal, serve, store));
	   // Simpan credensial login
	   serve.ev.on('creds.update', saveCreds);
	} catch (e) {
		console.log(e);
	}
}
mulai();