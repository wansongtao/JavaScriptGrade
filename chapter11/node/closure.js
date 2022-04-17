// 通过node调试可以清楚看到
// all函数未用到上层函数的变量，所以其scopes属性里不会有closure（闭包）属性
function all() {
  function test() {
    const a = 10
    const b = {a: 10}
  
    // 因为该函数用到了上层函数的变量，所以创建的时候会在scopes属性里添加一个closure属性里面包含了引用的值
    return () => {
      return b
    }
  }
  
  const res = test()
  console.log(res)
  console.log(11111)
}

all()