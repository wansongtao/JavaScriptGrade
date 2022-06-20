class Observer {
  constructor(user) {
    this.user = user
  }

  update(info) {
    console.log(`${this.user}，你好，我们发布新产品了哦。具体信息如下：${info}`)
  }
}

class Phone {
  constructor(info) {
    this.info = info
  }
}

const observerQueue = []
const my = new Observer('wst')
const your = new Observer('dream')
observerQueue.push(my)
observerQueue.push(your)

const myPhone = new Phone('小米6，始发价只要999')
const newPhone = new Proxy(myPhone, {
  set(target, property, value, receiver) {
    observerQueue.forEach((item) => {
      item.update(value)
    })

    return Reflect.set(target, property, value, receiver)
  }
})

newPhone.info = '新品小米7发售，限时抢购，只需1999元！'
