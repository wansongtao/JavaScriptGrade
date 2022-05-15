const factorial = (n) => {
  if (n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
};

self.addEventListener('message', (e) => {
  const value = e.data;

  self.postMessage(factorial(value));
});