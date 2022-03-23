/**
 * @description 原型式继承
 */

// 将传入对象的属性写入一个新对象的原型上，并返回新对象。
// 在原对象上扩展
function prototyInherit(obj) {
  function Fn(){}
  Fn.prototype = obj

  return new Fn()
}

function Person(name) {
  this.name = name

  this.sayName = function() {
    console.log(this.name);
  }
}

Person.prototype.outInfo = function() {
  console.log(`hello ${this.name}`);
}

const my = new Person('wst')
const newMy = prototyInherit(my)
newMy.name = 'xuna'

newMy.sayName()
newMy.outInfo()
