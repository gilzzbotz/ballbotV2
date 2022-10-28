import { instagramdl, instagramdlv2, instagramdlv3, instagramdlv4 } from '@bochilteam/scraper';

export const handle = async (m, { q, conn }) => {
	if (/^.*instagram/i.test(m.args[0])) {
		let res = await instagramdl(m.args[0])
					.catch(async _=> await instagramdlv2(m.args[0]))
					.catch(async _=> await instagramdlv3(m.args[0]))
					.catch(async _=> await instagramdlv4(m.args[0]))
			console.log(res);
	}
}