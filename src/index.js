const puppeteer = require('puppeteer');
const landingUrl = 'https://ojoconmipisto.com/category/noticias/';

const toDateUs = longDate => {
	const splitedDate = longDate.split(' ');
	const months = {
		enero: '01',
		febrero: '02',
		marzo: '03',
		abril: '04',
		mayo: '05',
		junio: '06',
		julio: '07',
		agosto: '08',
		septiembre: '09',
		octubre: '10',
		noviembre: '11',
		diciembre: '12'
	};
	return `${splitedDate[2]}-${months[splitedDate[1]]}-${splitedDate[0]}`;
};

const trimText = text => {
	return text.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
};
async function start() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(landingUrl, { waitUntil: 'networkidle0' });
	await page.waitForSelector('#content div[id^="post-"] h2 a');
	const links = await page.evaluate(() =>
		[ ...document.querySelectorAll('#content div[id^="post-"] h2 a') ].map(node => node.href)
	);
	console.log(links);

	for (const link of links) {
		const page1 = await browser.newPage();
		await page1.goto(link, { waitUntil: 'networkidle0' });

		let element = await page1.$('div[id^="post-"] h1');
		let title = await page1.evaluate(element => element.textContent, element);
		element = await page1.$('div[id^="post-"] > div.entry-content > :first-child');
		let subtitle = await page1.evaluate(element => element.textContent, element);
		element = await page1.$('div[id^="post-"] > div.entry-content');
		let content = await page1.evaluate(element => element.textContent, element);
		element = await page1.$('div[id^="post-"] > div.entry-meta');
		let date = await page1.evaluate(element => element.textContent, element);

		title = trimText(title);
		subtitle = trimText(subtitle);
		content = trimText(content);
		date = trimText(date);
		dateUS = toDateUs(date);

		console.log({
			title,
			subtitle,
			content,
			date,
			dateUS
		});

		await page1.close();
	}
	await browser.close();
}

module.exports = start;
// https://ojoconmipisto.com/category/noticias/
// https://ojoconmipisto.com/category/noticias/page/2/
//
