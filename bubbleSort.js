/**
 * @description 获取伪随机数，可以指定范围
 * @param {number} [min=0]
 * @param {number} [max=65532]
 * @returns {number}
 */
const getPseudoRandomNumber = (min = 0, max = 65532) => {
	if (!Number.isInteger(min) || !Number.isInteger(max) || min === max) {
		throw new Error('argument error');
	}

	if (min > max) {
		const temp = min;
		max = min;
		min = temp;
	}

	try {
		const crypto = require('crypto');
		const arr = new Uint16Array(1);
		const maxNum = 65532;

		const randomNum = crypto.webcrypto.getRandomValues(arr)[0] / maxNum;
		return Math.ceil(randomNum * (max - min) + min);
	} catch (ex) {
		console.error(ex.message);
	}
};

/**
 * @description 获取一个指定长度的数组，填充随机数
 * @param {number} [len=10000]
 * @returns {object[number]}
 */
const getRandomArray = (len = 10000) => {
	if (!Number.isInteger(len)) {
		throw new Error('argument error');
	}

	const arr = [];
	let iterations = Math.floor(len / 8);
	let leftover = len % 8;
	let i = 0;

	if (leftover > 0) {
		do {
			arr[i++] = getPseudoRandomNumber(1, len);
		} while (--leftover > 0);
	}

	do {
		arr[i++] = getPseudoRandomNumber(1, len * 10);
		arr[i++] = getPseudoRandomNumber(1, len * 10);
		arr[i++] = getPseudoRandomNumber(1, len * 10);
		arr[i++] = getPseudoRandomNumber(1, len * 10);
		arr[i++] = getPseudoRandomNumber(1, len * 10);
		arr[i++] = getPseudoRandomNumber(1, len * 10);
		arr[i++] = getPseudoRandomNumber(1, len * 10);
		arr[i++] = getPseudoRandomNumber(1, len * 10);
	} while (--iterations > 0);

	return arr;
};

/**
 * @description 使用达夫设备技术实现冒泡排序
 * @param {*} arr 
 * @returns 
 */
const duffBubbleSort = (arr) => {
	if (!Array.isArray(arr)) {
		throw new Error('argument type error');
	}

	if (!arr.length) {
		return [];
	}

	let iterations = Math.floor((arr.length - 1) / 8);
	let leftover = (arr.length - 1) % 8;
	let i = 0;

	const childSort = (idx, numberArr) => {
		const len = numberArr.length - (idx + 1);
		let loops = Math.floor(len / 8);
		let minLoop = len % 8;
		let count = 0;

		if (minLoop > 0) {
			do {
				if (arr[count] > arr[count + 1]) {
					[arr[count], arr[count + 1]] = [arr[count + 1], arr[count]];
				}

				count++;
			} while (--minLoop > 0);
		}

		do {
			if (arr[count] > arr[count + 1]) {
				[arr[count], arr[count + 1]] = [arr[count + 1], arr[count]];
			}
			count++;

			if (arr[count] > arr[count + 1]) {
				[arr[count], arr[count + 1]] = [arr[count + 1], arr[count]];
			}
			count++;

			if (arr[count] > arr[count + 1]) {
				[arr[count], arr[count + 1]] = [arr[count + 1], arr[count]];
			}
			count++;

			if (arr[count] > arr[count + 1]) {
				[arr[count], arr[count + 1]] = [arr[count + 1], arr[count]];
			}
			count++;

			if (arr[count] > arr[count + 1]) {
				[arr[count], arr[count + 1]] = [arr[count + 1], arr[count]];
			}
			count++;

			if (arr[count] > arr[count + 1]) {
				[arr[count], arr[count + 1]] = [arr[count + 1], arr[count]];
			}
			count++;

			if (arr[count] > arr[count + 1]) {
				[arr[count], arr[count + 1]] = [arr[count + 1], arr[count]];
			}
			count++;

			if (arr[count] > arr[count + 1]) {
				[arr[count], arr[count + 1]] = [arr[count + 1], arr[count]];
			}
			count++;
		} while (--loops > 0);
	};

	if (leftover > 0) {
		do {
			childSort(i, arr);
			i++;
		} while (--leftover > 0);
	}

	do {
		childSort(i, arr);
		i++;

		childSort(i, arr);
		i++;

		childSort(i, arr);
		i++;

		childSort(i, arr);
		i++;

		childSort(i, arr);
		i++;

		childSort(i, arr);
		i++;

		childSort(i, arr);
		i++;

		childSort(i, arr);
		i++;
	} while (--iterations > 0);

	return arr;
};

/**
 * @description 冒泡排序
 * @param {*} arr 
 * @returns 
 */
const bubbleSort = (arr) => {
  if (!Array.isArray(arr)) {
		throw new Error('argument type error');
	}

	if (!arr.length) {
		return [];
	}

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
};

const {
  performance
} = require('node:perf_hooks');

const ARRAYLENGTH = 200000;

const arr1 = getRandomArray(ARRAYLENGTH);
const arr2 = [...arr1];

const startTime = performance.now()
bubbleSort(arr1)
const endTime = performance.now()

console.log('native: ' + (endTime - startTime).toFixed(2) + '毫秒');


const start = performance.now()
duffBubbleSort(arr2)
const end = performance.now()

console.log('duff device: ' + (end - start).toFixed(2) + '毫秒');

/**
 * 使用达夫设备实现冒泡排序和原生冒泡排序性能相差不大
 */
