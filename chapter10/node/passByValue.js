// es中的所有参数都是按值传递的。但是如果把对象作为参数传递，那么传递的值就是这个对象的引用。

function test(a, obj) {
  a = 10
  obj.a = 1

  console.log(a, obj)
}

const a = 8
const obj = {a: 99}

test(a, obj)

console.log(a, obj)