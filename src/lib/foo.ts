export function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export function arrayIncludesTuple(arr, tup) {
	for (let [x, y] of arr) {
		if (tup[0] === x && tup[1] === y) {
			return true;
		}
	}

	return false;
}

export function initStore() {
	return 0;
}

export function updateStore(s) {
	return (s += 1);
}
