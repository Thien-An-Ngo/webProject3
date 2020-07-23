// Create USD currency formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function selOpt(sel) {
  let selOpts = sel.options;
  for (let j = 0; j < selOpts.length; j++) {
    let opt = selOpts[j];
    if (opt.value === "noValue") {
      sel.selectedIndex = j;
      break;
    }
  }
}

function showOpt(sel) {
  let selOpts = sel.options;
  for (let i = 0; i < selOpts.length; i++) {
    let thisOpt = selOpts[i]
    if (thisOpt.classList.contains("d-none")) {
      thisOpt.classList.remove("d-none")
    }
  }
}

function hideOpt(sel, option) {
  let selOpts = sel.options;
  if (sel.selectedIndex === option) {
    sel.selectedIndex = 0
  }
  for (let i = 0; i < selOpts.length; i++) {
    let thisOpt = selOpts[i];
    // console.log(thisOpt.value, ', type:', typeof thisOpt.value);
    if (parseInt(thisOpt.value) === option) {
      // console.log("hurzelilu");
      thisOpt.classList.add("d-none")
    }
  }
}

function calculate(type, val1, val2, val3, radios) {
  let price = 0;
  let size = "";
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      size = radios[i].value;
      break
    }
  };
  if (type === "Regular Pizza") {
    if (size === "small") {
      price = 12.7;
      if (val1 !== "noValue") {
        price = 13.7
      };
      if (val1 !== "noValue" && val2 !== "noValue") {
        price = 15.2
      };
      if (val1 !== "noValue" && val2 !== "noValue" && val3 !== "noValue") {
        price = 16.2
      };
    }
    if (size === "large") {
      price = 17.95;
      if (val1 !== "noValue") {
        price = 19.95
      };
      if (val1 !== "noValue" && val2 !== "noValue") {
        price = 21.95
      };
      if (val1 !== "noValue" && val2 !== "noValue" && val3 !== "noValue") {
        price = 23.95
      };
    }
  }
  if (type === "Sicilian Pizza") {
    if (size === "small") {
      price = 24.45;
      if (val1 !== "noValue") {
        price = 26.45
      };
      if (val1 !== "noValue" && val2 !== "noValue") {
        price = 28.45
      };
      if (val1 !== "noValue" && val2 !== "noValue" && val3 !== "noValue") {
        price = 29.45
      };
    }
    if (size === "large") {
      price = 38.7;
      if (val1 !== "noValue") {
        price = 40.7
      };
      if (val1 !== "noValue" && val2 !== "noValue") {
        price = 42.7
      };
      if (val1 !== "noValue" && val2 !== "noValue" && val3 !== "noValue") {
        price = 44.7
      };
    }
  }
  price = formatter.format(price);
  return price
}

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

  const orderReg = document.querySelector('#orderRegular'),
  orderSic = document.querySelector('#orderSicilian'),
  pizza = document.querySelectorAll('.pizza'),
  firstTop = document.querySelector('#firstTop'),
  secondTop = document.querySelector('#secondTop'),
  thirdTop = document.querySelector('#thirdTop'),
  tops = [firstTop, secondTop, thirdTop],
  noValue = "Choose...",
  pizzaSize = document.getElementsByName('pizzaSize'),
  standartPrice = document.querySelector('#pizzaStandartPrice'),
  firstTopPrice = document.querySelector('#pizzaPriceOne'),
  secondTopPrice = document.querySelector('#pizzaPriceTwo'),
  thirdTopPrice = document.querySelector('#pizzaPriceThree'),
  addPrices = [firstTopPrice, secondTopPrice, thirdTopPrice]
  pizzaPrice = document.querySelector('#pizzaPrice');

  var pizzaType = "";

  pizza.forEach(link => {
    link.onclick = () => {
      document.querySelector('#pizzaModalLabel').innerHTML = link.dataset.pizza;
      document.querySelector('#pizzaType').value = link.dataset.pizza;
      pizzaType = link.dataset.pizza;
      selOpt(firstTop);
      selOpt(secondTop);
      selOpt(thirdTop);
      addPrices.forEach(add => {
        add.parentNode.parentNode.classList.remove("show")
      })
      if (!secondTop.hasAttribute("disabled")) {
        secondTop.setAttribute("disabled", "");
      }
      if (!thirdTop.hasAttribute("disabled")) {
        thirdTop.setAttribute("disabled", "");
      }
      if (pizzaType === "Regular Pizza") {
        standartPrice.innerHTML = "$12.70"
      }
      if (pizzaType === "Sicilian Pizza") {
        standartPrice.innerHTML = "$24.45"
      }
      const price = calculate(pizzaType, firstTop.value, secondTop.value, thirdTop.value, pizzaSize);
      pizzaPrice.innerHTML = price
    }
  })

  // Change Toppings on Reset
  if (firstTop) {
    firstTop.onchange = () => {
      // console.log("firstHurz");
      if (firstTop.value !== "noValue") {
        secondTop.removeAttribute('disabled');
        const firstOpt = firstTop.selectedIndex,
        secondOpt = secondTop.selectedIndex;
        // console.log(currentOpt);
        showOpt(secondTop)
        showOpt(thirdTop)
        hideOpt(secondTop, firstOpt)
        hideOpt(thirdTop, firstOpt)
        if (secondOpt !== 0) {
          hideOpt(thirdTop, secondOpt)
        }
        firstTopPrice.parentNode.parentNode.classList.add("show")
        if (pizzaType === "Regular Pizza") {
          firstTopPrice.innerHTML = formatter.format(1)
        }
        else if (pizzaType === "Sicilian Pizza") {
          firstTopPrice.innerHTML = formatter.format(2)
        }
      };

      if (firstTop.value === "noValue") {
        secondTop.setAttribute("disabled", "");
        selOpt(secondTop);
        thirdTop.setAttribute("disabled", "");
        selOpt(thirdTop)
        firstTopPrice.parentNode.parentNode.classList.remove("show")
      }
      const price = calculate(pizzaType, firstTop.value, secondTop.value, thirdTop.value, pizzaSize);
      pizzaPrice.innerHTML = price
    };

    secondTop.onchange = () => {
      if (
        firstTop.value !== "noValue" &&
        secondTop.value !== "noValue"
      ) {
        const firstOpt = firstTop.selectedIndex,
        secondOpt = secondTop.selectedIndex;
        thirdTop.removeAttribute('disabled');
        showOpt(thirdTop);
        hideOpt(thirdTop, firstOpt);
        hideOpt(thirdTop, secondOpt)
        secondTopPrice.parentNode.parentNode.classList.add("show")
        if (pizzaType === "Regular Pizza") {
          secondTopPrice.innerHTML = formatter.format(1)
        }
        else if (pizzaType === "Sicilian Pizza") {
          secondTopPrice.innerHTML = formatter.format(2)
        }
      };

      if (firstTop.value === "noValue") {
        secondTop.setAttribute("disabled", "");
        selOpt(secondTop);
        thirdTop.setAttribute("disabled", "");
        selOpt(thirdTop)
      }

      if (secondTop.value === "noValue") {
        thirdTop.setAttribute("disabled", "");
        selOpt(secondTop)
        secondTopPrice.parentNode.parentNode.classList.remove("show")
      }
      const price = calculate(pizzaType, firstTop.value, secondTop.value, thirdTop.value, pizzaSize);
      pizzaPrice.innerHTML = price
    };

    thirdTop.onchange = () => {
      if (
        firstTop.value !== "noValue" &&
        secondTop.value !== "noValue" &&
        thirdTop.value !== "noValue"
      ) {
        thirdTopPrice.parentNode.parentNode.classList.add("show")
        if (pizzaType === "Regular Pizza") {
          thirdTopPrice.innerHTML = formatter.format(1)
        }
        else if (pizzaType === "Sicilian Pizza") {
          thirdTopPrice.innerHTML = formatter.format(2)
        }
      };
      if (thirdTop.value === "noValue") {
        thirdTopPrice.parentNode.parentNode.classList.remove("show")
      };
      const price = calculate(pizzaType, firstTop.value, secondTop.value, thirdTop.value, pizzaSize);
      pizzaPrice.innerHTML = price
    };

    pizzaSize.forEach(radio => {
      radio.onclick = () => {
        const price = calculate(pizzaType, firstTop.value, secondTop.value, thirdTop.value, pizzaSize);
        pizzaPrice.innerHTML = price
      }
    })
  };

  const orderLinks = document.querySelectorAll('.price'),
  menuOrderForm = document.querySelector('#menuOrderForm'),
  menuToCart = document.querySelector('#menuAddToCart');

  orderLinks.forEach(link => {
    link.onclick = () => {
      document.querySelector('#menuModalLabel').innerHTML = link.dataset.order;
      document.querySelector('#dishType').value = link.dataset.order;
      document.querySelector('#dishPrice').value = link.dataset.price;
      document.querySelector('#menuPriceLabel').innerHTML = formatter.format(link.dataset.price);
      if (link.dataset.dish === "sub") {
        menuOrderForm.classList.add("show")
      }
      else if (link.dataset.dish !== "sub" && extraCheese.classList.contains("show")) {
        menuOrderForm.classList.remove("show")
      }
    }
  })
})
