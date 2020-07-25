// Create USD currency formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function checkNoValue(sel1, sel2, sel3, sel4) {
  if (sel1.value === "noValue") {
    sel2.setAttribute("disabled", "");
    selOpt(sel2)
    if (sel3) {
      sel3.setAttribute("disabled", "")
      selOpt(sel3)
    }
  }
  else {
    if (sel2.hasAttribute("disabled")) {
      sel2.removeAttribute("disabled")
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

document.addEventListener('DOMContentLoaded', () => {

  const pizza = document.querySelectorAll('.pizza'),

  firstTop = document.querySelector('#firstTop'),
  secondTop = document.querySelector('#secondTop'),
  thirdTop = document.querySelector('#thirdTop'),
  tops = [firstTop, secondTop, thirdTop],

  pizzaSize = document.getElementsByName('pizzaSize'),
  special = document.querySelector('#pizzaSpecial'),

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

    }
  })

  // Change Toppings on Reset
  if (firstTop) {
    firstTop.onchange = () => {
      checkNoValue(firstTop, secondTop, thirdTop)
    };

    secondTop.onchange = () => {
      checkNoValue(secondTop, thirdTop, undefined, firstTop)
    };

    thirdTop.onchange = () => {
      if (
        firstTop.value !== "noValue" &&
        secondTop.value !== "noValue" &&
        thirdTop.value !== "noValue"
      ) {

      };
    };

    pizzaSize.forEach(radio => {
      radio.onclick = () => {

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
        if (standartPrice.parentNode.classList.contains('show')) {
          standartPrice.parentNode.classList.remove('show')
        }
      }
      else if (!special.checked) {
        firstTop.removeAttribute("disabled");
        standartPrice.parentNode.classList.add('show')
      }
    }
  };
})
