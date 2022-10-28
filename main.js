process.on('uncaughtException', console.error);
const { default: HOHOHOHO, useMultiFileAuthState, makeInMemoryStore } = (await import('baileys')).default;
const { chain } = (await import('lodash')).default;
import { msgUp } from './Models/Pesan/msg-upsert.js';
import { connect } from './Models/Function/serve.js';
import { con } from './Models/connection.js';
import { JSONFile } from './Models/DB/jsonfile.js';
import { Low } from './Models/DB/Low.js';
import q from './Setting/settings.js';
import * as ws from 'ws';
import p from 'pino';
import fs from 'fs';
const logs = p({ level: 'silent' })
const store = makeInMemoryStore({ logger: logs })

/*
* @param
* from adiwajshing/baileys
* @returns
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
		serve.db = new Low(new JSONFile(q.namedb + '.json'));
		//DB fungtion load
		serve.loadDB = async function loadDB() {if (serve.db.READ) return new Promise((resolve) => setInterval(()=> (!serve.db.READ ? (clearInterval(this), resolve(serve.db.data == null ? serve.loadDB() : serve.db.data)) : null), 1000));if (serve.db.data !== null) return;serve.db.READ = true;await serve.db.read();serve.db.READ = false;
			serve.db.data = {
				user: {},
				chat: {},
				set: {},
				/* Tambahkan kreasi kamu disini */
				...(serve.db.data || {})};serve.db.chain = chain(serve.db.data)}
		if (serve.db) setInterval(async () => {if (serve.db.data) await serve.db.write()}, q.autoload);
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