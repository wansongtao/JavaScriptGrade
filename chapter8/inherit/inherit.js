/**
 * @description 经典继承
 * 不能继承父类原型上的方法
 */

function hi() {
  console.log('hello world');
}

function Person(name) {
  this.name = name;

  // 每次都要实例化一个函数
  // this.hi = function() {
  //   console.log('hello world');
  // }
  this.hi = hi;
}

Person.prototype.sayName = function () {
  console.log(this.name);
}

function Myself(name) {
  Person.call(this, name)
}

const your = new Myself('xuna')
your.hi()

// 不能继承原型上的方法
// your.sayName()
