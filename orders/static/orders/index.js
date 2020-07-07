// Create USD currency formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// Use it.
var values = document.querySelectorAll('.value'),
prices = document.querySelectorAll('.price')

document.addEventListener('DOMContentLoaded', () => {

  for (let i = 0; i < values.length; i++){
    prices[i].innerHTML = formatter.format(values[i].value);
    if (isNaN(values[i].value)) {
      prices[i].parentNode.innerHTML = ""
    }
  };

  const firstTop = document.querySelector('#firstTop'),
  secondTop = document.querySelector('#secondTop'),
  thirdTop = document.querySelector('#thirdTop'),
  noValue = "Choose...";;

  firstTop.onchange = () => {
    console.log("firstHurz");
    if (firstTop.value !== "noValue") {
      secondTop.removeAttribute('disabled')
    };

    if (firstTop.value === "noValue") {
      secondTop.setAttribute("disabled", "");
      let secondOpts = secondTop.options;
      for (let opt, j = 0; opt = secondOpts[j]; j++) {
        if (opt.value == noValue) {
          secondTop.selectedIndex = j;
          break;
        }
      };
      thirdTop.setAttribute("disabled", "");
      let thirdOpts = thirdTop.options;
      for (let opt, j = 0; opt = thirdOpts[j]; j++) {
        if (opt.value == noValue) {
          thirdTop.selectedIndex = j;
          break;
        }
      }
    }
  };

  secondTop.onchange = () => {
    if (firstTop.value !== "noValue" && secondTop.value !== "noValue") {
      thirdTop.removeAttribute('disabled')
    };

    if (firstTop.value === "noValue") {
      secondTop.setAttribute("disabled", "");
      let secondOpts = secondTop.options;
      for (let opt, j = 0; opt = secondOpts[j]; j++) {
        if (opt.value == noValue) {
          secondTop.selectedIndex = j;
          break;
        }
      };
      thirdTop.setAttribute("disabled", "");
      let thirdOpts = thirdTop.options;
      for (let opt, j = 0; opt = thirdOpts[j]; j++) {
        if (opt.value == noValue) {
          thirdTop.selectedIndex = j;
          break;
        }
      }
    }

    if (secondTop.value === "noValue") {
      thirdTop.setAttribute("disabled", "");
      let thirdOpts = thirdTop.options;
      for (let opt, j = 0; opt = thirdOpts[j]; j++) {
        if (opt.value == noValue) {
          thirdTop.selectedIndex = j;
          break;
        }
      }
    }
  }
})
