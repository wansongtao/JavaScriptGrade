const factorial = (n) => {
  if (n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
};

self.addEventListener('connect', (e) => {
  const port = e.ports[0];

  port.addEventListener('message', (e) => {
    const workerResult = factorial(e.data);
    port.postMessage(workerResult);
  });

  port.start(); 
});
