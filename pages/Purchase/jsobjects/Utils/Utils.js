export default {
	getUUID: () => {
		let prefix = "";
		let d = new Date().getTime();
		d += (parseInt(Math.random() * 100)).toString();
		if (undefined === prefix) {
			prefix = 'uid-';
		}
		d = prefix + d;
		return d;
	}
}