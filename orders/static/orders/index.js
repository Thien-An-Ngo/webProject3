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

  const orderLinks = document.querySelectorAll('.price'),
  menuOrderForm = document.querySelector('#menuOrderForm'),
  menuToCart = document.querySelector('#menuAddToCart');

  orderLinks.forEach(link => {
    link.onclick = () => {
      document.querySelector('#menuModalLabel').innerHTML = link.dataset.order;
      document.querySelector('#dishID').value = link.dataset.orderid;
      document.querySelector('#dishSize').value = link.dataset.size;
      document.querySelector('#menuPriceLabel').innerHTML = formatter.format(link.dataset.price);
      if (link.dataset.dish === "sub") {
        menuOrderForm.classList.add("show")
      }
      else if (link.dataset.dish !== "sub" && menuOrderForm.classList.contains("show")) {
        menuOrderForm.classList.remove("show")
      }
    }
  })
})
