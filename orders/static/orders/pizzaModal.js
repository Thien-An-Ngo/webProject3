// Create USD currency formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function checkNoValue(sel1, sel2, sel3, sel4, hidden, hidden2) {
  if (sel1.value === "noValue") {
    sel2.setAttribute("disabled", "");
    hidden.removeAttribute("disabled")
    selOpt(sel2)
    if (sel3) {
      sel3.setAttribute("disabled", "")
      selOpt(sel3)
      hidden2.removeAttribute("disabled")
    }
  }
  else {
    if (sel2.hasAttribute("disabled")) {
      sel2.removeAttribute("disabled")
    }
    if (!hidden.hasAttribute("disabled")) {
      hidden.setAttribute("disabled", "")
    }
    const opt1 = sel1.selectedIndex,
    opt2 = sel2.selectedIndex;
    showOpt(sel2);
    hideOpt(sel2, opt1)
    if (sel3) {
      showOpt(sel3);
      hideOpt(sel3, opt1)
      if (opt2 !== 0) {
        hideOpt(sel2, opt2)
      }
    }
    if (sel4) {
      hideOpt(sel2, sel4.selectedIndex)
    }
  }
}



// reset topping select
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

// makes all options in a select visible
function showOpt(sel) {
  let selOpts = sel.options;
  for (let i = 0; i < selOpts.length; i++) {
    let thisOpt = selOpts[i]
    if (thisOpt.classList.contains("d-none")) {
      thisOpt.classList.remove("d-none")
    }
  }
}

// hides one option in a select
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

function whatPrices(type, size, tops) {
  let price = 0,
  prices = {},
  standartPrice = 0,
  oneTopPrice = 0,
  twoTopPrice = 0,
  threeTopPrice = 0,
  specialPrice = 0,
  special = false;
  if (type === "Regular Pizza") {
    if (size === "small") {
      standartPrice = 12.7
      if (tops) {
        if (tops >= 1) {oneTopPrice = 1};
        if (tops >= 2) {twoTopPrice = 1.5};
        if (tops === 3) {threeTopPrice = 1};
        if (tops === "special") {specialPrice = 5.05; special = true}
      }
    }
    else if (size === "large") {
      standartPrice = 17.95;
      if (tops) {
        if (tops >= 1) {oneTopPrice = 2};
        if (tops >= 2) {twoTopPrice = 2};
        if (tops === 3) {threeTopPrice = 2};
        if (tops === "special") {specialPrice = 8; special = true}
      }
    }
  }
  else if (type === "Sicilian Pizza") {
    if (size === "small") {
      standartPrice = 24.45;
      if (tops) {
        if (tops >= 1) {oneTopPrice = 2};
        if (tops >= 2) {twoTopPrice = 2};
        if (tops === 3) {threeTopPrice = 1};
        if (tops === "special") {specialPrice = 6; special = true}
      }
    }
    else if (size === "large") {
      standartPrice = 38.7;
      if (tops) {
        if (tops >= 1) {oneTopPrice = 2};
        if (tops >= 2) {twoTopPrice = 2};
        if (tops === 3) {threeTopPrice = 2};
        if (tops === "special") {specialPrice = 7; special = true}
      }
    }
  }
  price = standartPrice + oneTopPrice + twoTopPrice + threeTopPrice + specialPrice;
  if (!special) {
    prices = {
      "price": price,
      "standartPrice": standartPrice,
      "oneTopPrice": oneTopPrice,
      "twoTopPrice": twoTopPrice,
      "threeTopPrice": threeTopPrice
    }
  }
  else {
    prices = {
      "specialPrice": price
    }
  }
  return prices
};

function displayPrices(prices, notice, standart, sum, top1, top2, top3) {
  if (!prices.specialPrice) {
    sum.innerHTML = formatter.format(prices.price);
    standart.innerHTML = formatter.format(prices.standartPrice);
    notice.innerHTML = "Standart (Cheese Only)";
    if (top1) {
      top1.innerHTML = formatter.format(prices.oneTopPrice);
      top1.parentNode.parentNode.classList.add('show')
    }
    if (top2) {
      top2.innerHTML = formatter.format(prices.twoTopPrice);
      top2.parentNode.parentNode.classList.add('show')
    }
    if (top3) {
      top3.innerHTML = formatter.format(prices.threeTopPrice)
      top3.parentNode.parentNode.classList.add('show')
    }
  }
  else {
    sum.innerHTML = formatter.format(prices.specialPrice);
    standart.innerHTML = formatter.format(prices.specialPrice);
    notice.innerHTML = "Price of Special Pizza";
  }
}

function displayPricesInit(type, size, tops) {
  if (tops !== "special") {
    tops = parseInt(tops)
  }
  const prices = whatPrices(type, size, tops),
  standartPrice = document.querySelector('#pizzaStandartPrice'),
  notice = document.querySelector('#priceNotice'),
  topPrice1 = document.querySelector('#pizzaPriceOne'),
  topPrice2 = document.querySelector('#pizzaPriceTwo'),
  topPrice3 = document.querySelector('#pizzaPriceThree'),
  pizzaPrice = document.querySelector('#pizzaPrice');


  topPrice1.parentNode.parentNode.classList.remove('show');
  topPrice2.parentNode.parentNode.classList.remove('show');
  topPrice3.parentNode.parentNode.classList.remove('show');
  if (tops !== "special") {
    if (tops === 0) {
      displayPrices(prices, notice, standartPrice, pizzaPrice)
    }
    if (tops === 1) {
      displayPrices(prices, notice, standartPrice, pizzaPrice, topPrice1)
    };
    if (tops === 2) {
      displayPrices(prices, notice, standartPrice, pizzaPrice, topPrice1, topPrice2)
    };
    if (tops === 3) {
      displayPrices(prices, notice, standartPrice, pizzaPrice, topPrice1, topPrice2, topPrice3)
    }
  }
  else {
    displayPrices(prices, notice, standartPrice, pizzaPrice)
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const pizza = document.querySelectorAll('.pizza'),

  firstTop = document.querySelector('#firstTop'),
  secondTop = document.querySelector('#secondTop'),
  thirdTop = document.querySelector('#thirdTop'),
  toppings = [firstTop, secondTop, thirdTop],

  pizzaSize = document.getElementsByName('pizzaSize'),
  special = document.querySelector('#pizzaSpecial'),

  hidden2ndTop = document.querySelector('#hidden2ndTop'),
  hidden3rdTop = document.querySelector('#hidden3rdTop');

  var pizzaType = "",
  pizzaSizeVal = "small",
  topNote = 0;

  pizza.forEach(link => {
    link.onclick = () => {
      document.querySelector('#pizzaModalLabel').innerHTML = link.dataset.pizza;
      document.querySelector('#pizzaType').value = link.dataset.pizza;
      selOpt(firstTop);
      selOpt(secondTop);
      selOpt(thirdTop);
      if (firstTop.hasAttribute("disabled")) {
        firstTop.removeAttribute("disabled");
      }
      pizzaType = link.dataset.pizza;
      special.checked = false;
      topNote = 0;
      pizzaSizeVal = "small";
      for (let i = 0; i < pizzaSize.length; i++) {
        if (pizzaSize[i].value === "small") {
          pizzaSize[i].checked = true;
          break
        }
      }
      displayPricesInit(pizzaType, pizzaSizeVal, topNote)
    }
  })

  // Change Toppings on Reset
  if (firstTop) {
    toppings.forEach(topping => {
      topping.onchange = () => {
        topNote = topping.dataset.tops;
        if (topping.dataset.topping === "firstTop") {
          checkNoValue(firstTop, secondTop, thirdTop, undefined, hidden2ndTop, hidden3rdTop);
          if (topping.value === "noValue") {
            topNote = 0
          }
          else {
            topNote = 1
          }
        }
        if (topping.dataset.topping === "secondTop") {
          checkNoValue(secondTop, thirdTop, undefined, firstTop, hidden3rdTop);
          if (topping.value === "noValue") {
            topNote = 1
          }
          else {
            topNote = 2
          }
        }
        if (topping.dataset.topping === "thirdTop") {
          if (topping.value === "noValue") {
            topNote = 2
          }
          else {
            topNote = 3
          }
        }
        displayPricesInit(pizzaType, pizzaSizeVal, topNote);
      }
    })

    pizzaSize.forEach(radio => {
      radio.onclick = () => {
        pizzaSizeVal = radio.value;
        displayPricesInit(pizzaType, pizzaSizeVal, topNote)
      }
    })

    special.onclick = () => {
      if (special.checked) {
        selOpt(firstTop)
        firstTop.setAttribute("disabled", "");
        selOpt(secondTop);
        secondTop.setAttribute("disabled", "");
        selOpt(thirdTop);
        thirdTop.setAttribute("disabled", "");

        topNote = "special";
        displayPricesInit(pizzaType, pizzaSizeVal, topNote)
      }
      else if (!special.checked) {
        firstTop.removeAttribute("disabled");

        topNote = 0;
        displayPricesInit(pizzaType, pizzaSizeVal, topNote)
      }
    }
  };
})
