const readFile = require('../utils/readFile');
const { Parser } = require('json2csv');
var fs = require('fs');

async function json2csv() {
	try {
		const data = await readFile('data');
		const dataJson = JSON.parse(data);
		const fields = Object(dataJson[0]).keys;
		const opts = { fields };
		const parser = new Parser(opts);
		const csv = parser.parse(dataJson);
		return csv;
	} catch (err) {
		console.error(err);
	}
}

async function saveCsv() {
	try {
		const csvContent = await json2csv();
		const log = fs.openSync('./output/data.csv', 'w');
		fs.writeSync(log, csvContent);
	} catch (error) {
		console.log(error);
	}
}

module.exports = saveCsv;
