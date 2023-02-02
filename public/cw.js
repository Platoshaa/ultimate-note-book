let intervalID;
self.addEventListener("message", (e) => {
  if (typeof e.data[0] == "number") {
    let counter = e.data[0];
    let commonCounter = e.data[1];
    switch (e.data[2]) {
      case "start":
        intervalID = self.setInterval(() => {
          counter++;
          commonCounter++;
          self.postMessage([counter, commonCounter, true]);
        }, 1000);
        break;
      case "stop":
        clearInterval(intervalID);
        self.postMessage([counter, commonCounter, false]);
        break;
    }
  }
});
