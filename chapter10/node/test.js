// let obj = {a: 1}
// const newObj = obj

// obj = null
// console.log(newObj)

function test(a, b, ...c) {
  console.log(a + b)
}

const add = (...a) => {
  console.log(1)
}

console.log(test.length, add.length)
