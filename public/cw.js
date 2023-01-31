let intervalID;
self.addEventListener("message", (e) => {
  if (typeof e.data[0] == "number") {
    let counter = e.data[0];
    switch (e.data[1]) {
      case "start":
        intervalID = self.setInterval(() => {
          counter++;
          self.postMessage([counter, true]);
        }, 1000);
        break;
      case "stop":
        clearInterval(intervalID);
        self.postMessage([counter, false]);
        break;
    }
  }
});
