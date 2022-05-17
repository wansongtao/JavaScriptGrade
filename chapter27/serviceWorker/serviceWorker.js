const factorial = (n) => {
  if (n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
};

self.addEventListener('message', (e) => {
  console.log(e, 'child');

  const result = factorial(e.data);
  e.source.postMessage(result);
});