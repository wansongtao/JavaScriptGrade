/**
 * @description 寄生式继承，原型式+工厂模式
 */

// 在原有对象上扩展属性、方法
function parasitic(obj) {
  const newObj = (function getObject(o) {
    function Fn(){}
    Fn.prototype = o
    return new Fn()
  })(obj)

  newObj.add = function() {
    console.log('+++++++++++');
  }

  return newObj
}

function Person(name) {
  this.name = name

  this.sayName = function() {
    console.log(this.name);
  }
}

const my = new Person('wst')
const newMy = parasitic(my)
newMy.age = 24

newMy.sayName()
newMy.add()
console.log(newMy instanceof Person);
