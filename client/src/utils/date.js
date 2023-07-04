export default {
	transform(dateString) {

		const addLeadingZeroes = (str) => {
			return ('0' + str).slice(-2)
		}

		const date = new Date(dateString);

		return addLeadingZeroes(date.getDate()) + '.' + addLeadingZeroes(date.getMonth()) + '.' + date.getFullYear() + ' в ' + addLeadingZeroes(date.getHours()) + ':' + addLeadingZeroes(date.getMinutes())
	}
}