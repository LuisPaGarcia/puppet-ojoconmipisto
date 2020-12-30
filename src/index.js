const puppeteer = require('puppeteer');
const dateToUs = require('./utils/dateToUs');
const trimText = require('./utils/trimText');
const generatePaths = require('./utils/generatePaths');

const landingUrl = 'https://ojoconmipisto.com/category/noticias/';
const pageConfig = { waitUntil: 'networkidle0' };

async function start() {
	const paths = generatePaths();
	const browser = await puppeteer.launch();
	for (const path of paths) {
		const page = await browser.newPage();
		await page.goto(landingUrl.concat(path), pageConfig);
		await page.waitForSelector('#content div[id^="post-"] h2 a');
		const links = await page.evaluate(() =>
			[ ...document.querySelectorAll('#content div[id^="post-"] h2 a') ].map(node => node.href)
		);
		console.log(links);

		for (const link of links) {
			const postPage = await browser.newPage();
			await postPage.goto(link, pageConfig);

			let element = await postPage.$('div[id^="post-"] h1');
			let title = await postPage.evaluate(element => element.textContent, element);
			element = await postPage.$('div[id^="post-"] > div.entry-content > :first-child');
			let subtitle = await postPage.evaluate(element => element.textContent, element);
			element = await postPage.$('div[id^="post-"] > div.entry-content');
			let content = await postPage.evaluate(element => element.textContent, element);
			element = await postPage.$('div[id^="post-"] > div.entry-meta');
			let date = await postPage.evaluate(element => element.textContent, element);

			title = trimText(title);
			subtitle = trimText(subtitle);
			content = trimText(content);
			date = trimText(date);
			dateUS = dateToUs(date);

			// console.log({
			// 	title,
			// 	subtitle,
			// 	content,
			// 	date,
			// 	dateUS
			// });

			await postPage.close();
		}
		await page.close();
	}
}

module.exports = start;
// https://ojoconmipisto.com/category/noticias/
// https://ojoconmipisto.com/category/noticias/page/2/
//
