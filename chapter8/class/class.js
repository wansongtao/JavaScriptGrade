/**
 * @description es6类，体验
 */

class Person {
  constructor(name) {
    this.name = name
  }

  test() {
    console.log(this.name);
  }

  static sayName() {
    console.log('hello world.');
  }
}

const my = new Person('wst')

// my.sayName()  // 实例不能访问到静态方法
Person.sayName()
my.test()

class People extends Person {
  constructor(name, age) {
    // 在类构造函数中，不能在super()之前引用this
    // console.log(this);

    // 调用父类构造函数并传参
    super(name)
    this.age = age
  }

  outPutInfo() {
    // super() // 不能在方法里使用super
    // super.sayName()
    console.log(`my name is ${this.name}, ${this.age} years old.`);
  }

  static getSuper() {
    // console.log(super); // 不能单独引用super
    super.sayName()
  }
}

const your = new People('spaceX', 24)
// 静态方法也会继承
People.sayName()
your.outPutInfo()
your.test()
People.getSuper()