const fs = require('fs');
const paths = [
	{
		path: './output/data.json',
		defaultValue: '[]'
	},
	{
		path: './output/completed.json',
		defaultValue: '[]'
	}
];
function reset() {
	for (const node of paths) {
		const csv = fs.openSync(node.path, 'w');
		fs.writeSync(csv, node.defaultValue);
		console.log(`Erased: ${node.path}`);
	}
}

reset();
