const puppeteer = require('puppeteer');
const dateToUs = require('./utils/dateToUs');
const trimText = require('./utils/trimText');
const saveData = require('./utils/saveData');
const saveCsv = require('./utils/saveCsv');
const saveCompleted = require('./utils/saveCompleted');
const generatePaths = require('./utils/generatePaths');
const log = require('./utils/log');

const landingUrl = 'https://ojoconmipisto.com/category/noticias/';
const pageConfig = { waitUntil: 'networkidle0' };

async function start() {
	const paths = generatePaths();
	const browser = await puppeteer.launch();
	for (const path of paths) {
		const page = await browser.newPage();
		try {
			await page.goto(landingUrl.concat(path), pageConfig);
			await page.waitForSelector('#content div[id^="post-"] h2 a');
			const links = await page.evaluate(() =>
				[ ...document.querySelectorAll('#content div[id^="post-"] h2 a') ].map(node => node.href)
			);
			log('green', `\n- Get 10 post links from ${landingUrl.concat(path)}`);
			// console.log(links);

			for (const url of links) {
				const postPage = await browser.newPage();
				try {
					await postPage.goto(url, pageConfig);

					// title capture
					let element = await postPage.$('div[id^="post-"] h1');
					let title = await postPage.evaluate(element => element.textContent, element);
					// subtitle capture
					element = await postPage.$('div[id^="post-"] > div.entry-content > :first-child');
					let subtitle = await postPage.evaluate(element => element.textContent, element);
					// content capture
					element = await postPage.$('div[id^="post-"] > div.entry-content');
					let content = await postPage.evaluate(element => element.textContent, element);
					// date capture
					element = await postPage.$('div[id^="post-"] > div.entry-meta');
					let date = await postPage.evaluate(element => element.textContent, element);

					// prepare output
					title = trimText(title);
					subtitle = trimText(subtitle);
					content = trimText(content);
					date = trimText(date);
					dateUS = dateToUs(date);
					const timestamp = new Date().toString();
					const post = {
						title,
						subtitle,
						content,
						date,
						dateUS,
						timestamp,
						url
					};

					// save completed log
					await saveCompleted(url);

					// save data
					await saveData(post);

					// save csv
					await saveCsv();

					// Close child post page
					await postPage.close();
					log('green', `Completed ${url}`);
				} catch (error) {
					console.log(error);
					await postPage.close();
					log('red', `Error on ${url}`);
					continue;
				}
			}
			// Close list of post page
			await page.close();
		} catch (error) {
			console.log(error);
			await page.close();
			log('red', `Error on links page ${landingUrl.concat(path)}`);
			continue;
		}
	}
}

module.exports = start;
