/**
 * 策略模式
 */

const strategy = (grade) => {
  const obj = {
    a: () => {
      console.log('a--------')
    },
    b: () => {
      console.log('b--------')
    },
    c: () => {
      console.log('c--------')
    }
  };

  return obj[grade]()
}

strategy('a');