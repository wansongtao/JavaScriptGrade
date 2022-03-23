/**
 * @description 组合继承，也叫伪经典继承，综合了原型链喝盗用构造函数
 */

function Person (name) {
  this.name = name
}

Person.prototype.sayName = function () {
  console.log(this.name);
}

function Personal(name, age) {
  Person.call(this, name)

  this.age = age
}

Personal.prototype = new Person()
Personal.prototype.outPutInfo = function () {
  console.log(this.name, this.age);
}

const my = new Personal('wst', 24)
my.sayName()
my.outPutInfo()

console.log(my instanceof Personal);