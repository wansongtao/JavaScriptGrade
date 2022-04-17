function add(a, b) {
  return new Promise((resolve) => {
    resolve(a + b)
  })
}

function minusFive(val) {
  return val - 5
}

function multiplyTen(val) {
  return val * 10
}

function divisorTwo(val) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val / 2)
    }, 10)
  })
}

// 因为Promise.prototype.then返回的是promise，所以可以链式调用
add(10, 2).then(minusFive).then(multiplyTen).then(divisorTwo).then((res) => {
  console.log(res)
})