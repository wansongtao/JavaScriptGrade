// 复合胜过继承

class Base {
  constructor() {
    console.log(new.target);

    if (new.target === Base) {
      throw new Error('该类不能直接实例化')
    }

    if (!this.shuffle) {
      throw new Error('派生类上必须要定义洗牌算法')
    }
  }

  getNumbers() {
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(Math.ceil(Math.random() * i * 100))
    }

    return arr
  }
}

class Card extends Base {
  constructor(name) {
    // 显式定义了构造函数，则必须调用super
    super()
    this.name = name
  }

  shuffle() {
    const arr = this.getNumbers()
    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
      let j = Math.ceil(Math.random() * i)

      // [arr[i], arr[j]] = [arr[j], arr[i]] // 会报j未初始化的错误
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }

    console.log(arr);
  }
}

const myCard = new Card('card')
myCard.shuffle()

// 以下代码报错：ReferenceError: Cannot access 'j' before initialization(初始化之前访问了j)
// const cards = [1, 2, 3, 4, 5, 6]
// const i = 1
// const j = 4

// console.log(cards[j]);  // 加上这个就不会报错了

// [cards[i], cards[j]] = [cards[j], cards[i]]
