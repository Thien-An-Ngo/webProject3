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
  orderSic = document.querySelector('#orderSicilian')
  pizza = document.querySelectorAll('.pizza'),
  firstTop = document.querySelector('#firstTop'),
  secondTop = document.querySelector('#secondTop'),
  thirdTop = document.querySelector('#thirdTop'),
  noValue = "Choose...";

  pizza.forEach(link => {
    link.onclick = () => {
      document.querySelector('#pizzaModalLabel').innerHTML = link.dataset.pizza;
      document.querySelector('#pizzaType').value = link.dataset.pizza;
      selOpt(firstTop);
      selOpt(secondTop);
      selOpt(thirdTop);
      if (!secondTop.hasAttribute("disabled")) {
        secondTop.setAttribute("disabled", "");
      }
      if (!thirdTop.hasAttribute("disabled")) {
        thirdTop.setAttribute("disabled", "");
      }
    }
  })

  // Change Toppings on Reset
  if (firstTop) {
    firstTop.onchange = () => {
      console.log("firstHurz");
      if (firstTop.value !== "noValue") {
        secondTop.removeAttribute('disabled')
      };

      if (firstTop.value === "noValue") {
        secondTop.setAttribute("disabled", "");
        selOpt(secondTop);
        thirdTop.setAttribute("disabled", "");
        selOpt(thirdTop)
      }
    };

    secondTop.onchange = () => {
      if (firstTop.value !== "noValue" && secondTop.value !== "noValue") {
        thirdTop.removeAttribute('disabled')
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
      }
    }
  };

  const orderLinks = document.querySelectorAll('.price'),
  menuOrderForm = document.querySelector('#menuOrderForm'),
  menuToCart = document.querySelector('#menuAddToCart')
  ;

  orderLinks.forEach(link => {
    link.onclick = () => {
      document.querySelector('#menuModalLabel').innerHTML = link.dataset.order;
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
