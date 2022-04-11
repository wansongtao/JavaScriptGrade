// 默认参数值是es6才开始支持的，默认值可以是原始值、对象、调用函数返回的值
function test (name='wst', age=24, address='佛山') {
  console.log(name, age, address)
}

// 给参数传undefined相当于没有传值。这样可以利用多个默认值
test(undefined, 25) // 输出：wst 25 佛山