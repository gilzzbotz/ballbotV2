import q from '../../Setting/settings.js';

const fakeAll = {
	f1: (u, b) => {
		let ll = {
			key: {
				remoteJid: q.idst,
				participant: `0${q.idwa}`,
			},
			message: {
				orderMessage: {
					itemCount : 2022,
					status: 1, 
					surface : 1,
					message: u, 
					orderTitle: ``,
					thumbnail: b, 
					sellerJid: `0${q.idwa}`,
				}
			}
		}
		return ll
	},
	
	f2: (a, b, c) => {
		let pp = { 
			contextInfo: { 
				isForwarded: true, 
				forwardingScore: 9999, 
				externalAdReply: {
					mediaType: 1,
					title: a,
					thumbnail: {url: q.thumb2}, 
					thumbnailUrl: q.thumb2, 
					sourceUrl: c, 
					renderLargerThumbnail: true 
				} 
			}
		}
		return pp
	},
	// Tambahin sendiri dibawah jgn manja
	
}

export default fakeAll