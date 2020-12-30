const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

function getStuff(pathName) {
	const path = {
		data: './output/data.json',
		completed: './output/completed.json'
	};
	return readFile(path[pathName] || pathName);
}
module.exports = getStuff;
