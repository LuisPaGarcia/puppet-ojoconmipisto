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

module.exports = toDateUs;
