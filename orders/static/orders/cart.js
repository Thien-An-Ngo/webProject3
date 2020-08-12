// Create USD currency formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

document.addEventListener('DOMContentLoaded', () => {
  const prices = document.querySelectorAll('.prices'),
  hiddenPrices = document.querySelectorAll('.hiddenPrices'),
  displaySum = document.querySelector('#sum'),
  deleteSvgs = document.querySelectorAll('.deleteSvg'),
  deleteIDs = document.querySelectorAll('.deleteOrderIDs'),
  deleteTd = document.querySelectorAll('.deleteOrderTd'),
  deleteLink = document.querySelectorAll('.deleteOrderA');

  if (displaySum && prices) {
    displaySum.innerHTML = formatter.format(displaySum.innerHTML)
    for (let i = 0; i < prices.length; i++) {
      prices[i].innerHTML = formatter.format(prices[i].innerHTML)      
    }
  }

  if (deleteIDs) {
    for (let i = 0; i < deleteIDs.length; i++) {
      console.log("hurz");
      const orderEntryID = deleteIDs[i].value;
      deleteLink[i].setAttribute('href', `/deleteOrderEntry/${orderEntryID}`)
    }
  }

  if (deleteTd) {
    deleteSvgs.forEach(link => {
      link.onclick = () => {
        let arrayPosition;
        for (let i = 0; i < deleteSvgs.length; i++) {
          if (deleteSvgs[i] === link) {
            const btn = deleteTd[i];
            if (btn.classList.contains('show')) {
              btn.classList.remove('show')
            }
            else {
              btn.classList.add('show');
            }
          };
        }
      }
    })
  }
})
