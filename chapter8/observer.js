class Observer {
  constructor(obj) {
    this.data = obj;
    this.proxy();

    return this.data;
  }

  proxy() {
    const data = this.data;

    for (const key in data) {
      let val = data[key];

      Object.defineProperty(data, key, {
        get() {
          return val;
        },
        set(newVal) {
          console.log(`您修改了属性${key}的值：${val} => ${newVal}`);
          val = newVal;
        }
      });
    }
  }
}

const test = new Observer({a: 1, b: 2});

console.log(test.a);
test.b = 6;

console.log(test.b);