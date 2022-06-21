/**
 * 单例模式
 */

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const Single = (function () {
  let instance = null;

  return function (name, age) {
    if (!instance) {
      instance = new Person(name, age);
    }

    return instance;
  }
})();

const test = new Single('wst', 24);
console.log(test)
const personal = new Single('lst', 22);
console.log(personal)
console.log(test === personal)