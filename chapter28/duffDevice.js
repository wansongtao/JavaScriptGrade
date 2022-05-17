/**
 * @description 达夫设备技术
 * 使用该技术展开循环，提高性能
 */

const getRandomArray = (length) => {
	if (typeof length !== 'number') {
		throw new Error('argument type error');
	}

	if (length <= 0) {
		return [];
	}

	const arr = [];

	// 使用达夫设备技术，拆成多个循环，大大减少循环次数
	let iterations = Math.floor(length / 8);
	let leftover = length % 8;
	let i = 0;

	if (leftover > 0) {
		// 余数次
		do {
			arr[i++] = Math.floor(Math.random() * 100);
		} while (--leftover > 0);
	}

	// 倍数次
	do {
		arr[i++] = Math.floor(Math.random() * 100);
		arr[i++] = Math.floor(Math.random() * 100);
		arr[i++] = Math.floor(Math.random() * 100);
		arr[i++] = Math.floor(Math.random() * 100);
		arr[i++] = Math.floor(Math.random() * 100);
		arr[i++] = Math.floor(Math.random() * 100);
		arr[i++] = Math.floor(Math.random() * 100);
		arr[i++] = Math.floor(Math.random() * 100);
	} while (--iterations > 0);

	return arr;
};

const result = getRandomArray(100);
console.log(result.length);
