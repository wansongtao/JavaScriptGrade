const test = {
  a: 1,
  b: 2
};


let val = test.b;
Object.defineProperty(test, 'b', {
  get() {
    console.log(`你获取了属性b的值: ${val}`);
    // 这里不能通过this.b获取值，会陷入无限循环
    return val;
  },
  set(newVal) {
    // 这里也不能直接修改this.b的值，会陷入无限循环
    console.log(`你修改了属性b的值：${val} => ${newVal}`);
    val = newVal;
  }
});

console.log(test.b);
test.b = 99;
console.log(test.b);
