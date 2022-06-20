const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

let iterations = Math.ceil(arr.length / 8);
let start = arr.length % 8;
let i = 0;

do {
  // 每个case语句后没有加break
  switch(start) {
    case 0: console.log(arr[i++]);
    case 7: console.log(arr[i++]);
    case 6: console.log(arr[i++]);
    case 5: console.log(arr[i++]);
    case 4: console.log(arr[i++]);
    case 3: console.log(arr[i++]);
    case 2: console.log(arr[i++]);
    case 1: console.log(arr[i++]);
  }

  start = 0;
} while(--iterations > 0);

