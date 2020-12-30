function generatePaths() {
	const diff = 2;
	const pageLimit = 210 - diff;
	return [ '', ...[ ...Array(pageLimit).keys() ].map(e => `page/${e + diff}/`) ];
}

module.exports = generatePaths;
