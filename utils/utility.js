class Utility {
	zeroLeading(num, size) {
		num = num.toString()
		while (num.length < size) num = '0' + num
		return num
	}

	increamentials(prefix, latestNumber) {
		console.log(prefix, latestNumber, latestNumber.replace(/[A-Z,0]/g, ''))
		latestNumber = this.zeroLeading(
			Number(latestNumber.replace(/[A-Z,0]/g, '')) + 1,
			5
		)
		return `${prefix}${latestNumber}`
	}

	rupiahFormatted(number) {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
		}).format(number)
	}
}

module.exports = new Utility()
