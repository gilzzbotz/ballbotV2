import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';
import { JSDOM } from 'jsdom';
import https from 'https';

let agent = new https.Agent({ rejectUnauthorized: false });
Buffer.toArrayBuffer = function toArrayBufferV2() {
        const ab = new ArrayBuffer(this.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i < this.length; ++i) {
            view[i] = this[i];
        }
        return ab;
    }
Buffer.toArrayBufferV2 = function toArrayBuffer() {
        return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
}
/*
 * Created Bochielteam : https://github.com/bochielteam/
 * Gw copas ini, karena gw lemah klo bikin scraper
 * Gak ada PC, modal hp :v
 */
export default async buffer => {
  const { ext, mime } = await fileTypeFromBuffer(buffer)
  let form = new FormData()
  let baseUrl = 'https://telegra.ph/upload'
  const blob = new Blob([buffer.toArrayBuffer()], { type: mime })
  form.append('file', blob, 'tmp.' + ext)
  let res = await fetch(baseUrl, {
    method: 'POST',
    body: form
  })
  let img = await res.json()
  if (img.error) throw img.error
  return 'https://telegra.ph' + img[0].src
}
export const webp2png = async(source) => {
  let form = new FormData()
  let isUrl = typeof source === 'string' && /https?:\/\//.test(source)
  const blob = !isUrl && new Blob([source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength)])
  form.append('new-image-url', isUrl ? blob : '')
  form.append('new-image', isUrl ? '' : blob, 'image.webp')
  let res = await fetch('https://s6.ezgif.com/webp-to-png', {
		method: 'POST',
		body: form,
		agent
  })
  let html = await res.text()
  let { document } = new JSDOM(html).window
  let form2 = new FormData()
  let obj = {}
  for (let input of document.querySelectorAll('form input[name]')) {
		obj[input.name] = input.value
		form2.append(input.name, input.value)
  }
  let res2 = await fetch('https://ezgif.com/webp-to-png/' + obj.file, {
    method: 'POST',
    body: form2,
    agent
  })
  let html2 = await res2.text()
  let { document: document2 } = new JSDOM(html2).window
  return new URL(document2.querySelector('div#output > p.outfile > img').src, res2.url).toString()
}
export const webp2mp4 = async (source) => {
	let form = new FormData()
	let isUrl = typeof source === 'string' && /https?:\/\//.test(source)
	const blob = !isUrl && new Blob([source.toArrayBuffer()])
	form.append('new-image-url', isUrl ? blob : '')
	form.append('new-image', isUrl ? '' : blob, 'image.webp')
	let res = await fetch('https://s6.ezgif.com/webp-to-mp4', {
		method: 'POST',
		body: form,
		agent
	})
	let html = await res.text()
	let { document } = new JSDOM(html).window
	let form2 = new FormData()
	let obj = {}
	for (let input of document.querySelectorAll('form input[name]')) {
		obj[input.name] = input.value
		form2.append(input.name, input.value)
	}
  let res2 = await fetch('https://ezgif.com/webp-to-mp4/' + obj.file, {
		method: 'POST',
		body: form2,
		agent
  })
  let html2 = await res2.text()
  let { document: document2 } = new JSDOM(html2).window
  return new URL(document2.querySelector('div#output > p.outfile > video > source').src, res2.url).toString()
}