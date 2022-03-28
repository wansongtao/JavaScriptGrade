/**
 * @description 寄生式组合继承
 */

function Person(name) {
  this.name = name
}

Person.prototype.sayName = function() {
  console.log(this.name);
}

function People(name, age) {
  Person.call(this, name)
  this.age = age
}

function inheritProto(childObj, obj) {
  const prototype = obj.prototype
  prototype.constructor = childObj
  childObj.prototype = prototype
}

inheritProto(People, Person)

const your = new People('love', '24')

your.sayName()
