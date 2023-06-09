let intervalID;
self.addEventListener("message", (e) => {
  let counter = e.data[0];
  let commonCounter = e.data[1];
  switch (e.data[2]) {
    case "start":
      intervalID = self.setInterval(() => {
        ++counter[0];
        ++counter[1];
        ++commonCounter;
        self.postMessage([counter, commonCounter, true]);
      }, 1000);
      break;
    case "stop":
      clearInterval(intervalID);
      self.postMessage([counter, commonCounter, false]);
      break;
  }
});
