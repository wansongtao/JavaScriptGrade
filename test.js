Function.prototype.call2 = function (context, ...args) {
  let uniqueKey = Symbol("全局唯一引用");
  context[uniqueKey] = this;

  console.log(this, context[uniqueKey])

  let result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};

function test() {
  console.log(1111111)
}

test.call2(global)
