function commas(num) {
	let numStringArray = num.toString().split('').reverse();
	let extra = 0;
	for (let i = 1; i < numStringArray.length; i++) {
		if (i % 3 === 0 && i !== numStringArray.length - 1) {
			numStringArray.splice(i + extra, 0, ',');
			extra++;
		}
	}

	return numStringArray.reverse().join('');
}

module.exports = commas;
