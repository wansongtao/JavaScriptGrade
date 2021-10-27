const targetObj = {
  a: 1,
  b: 2,
  set c(val) {
    // 将源对象上的属性c合并到目标对象上的时候，会触发目标对象上的[[Set]]
    c = ++val;
  },
  get c() {
    // 不定义这个方法，将无法读取属性c的值
    return c;
  }
}

const test = {
  b: 3,
  c: 7
}
// 返回目标对象并将源对象的属性复制到目标对象上
const newObj = Object.assign(targetObj, {b: 1, c: 6}, test);

console.log(newObj.c, targetObj, test);
targetObj.a = 10;
console.log(newObj.a);

class Assign{
  constructor(target, ...args) {
    if (!args.length) {
      return target;
    }

    return this.merge(target, args);
  }

  merge(target, args) {
    args.forEach((item) => {
      for (const key in item) {
        let val = target[key];

        Object.defineProperty(target, key, {
          get() {
            return val;
          },
          set(newVal) {
            val = newVal;
          }
        });

        target[key] = item[key];
      }
    })

    return target;
  }
}

const a = {a: 1};
const myObj = new Assign(a, {b: 2}, {a: 3});

console.log(myObj, myObj.a, myObj.b, a.a, a.b);