// Create USD currency formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function calculate(array) {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum = sum + parseInt(array[i].value)
  }
  return sum
}

document.addEventListener('DOMContentLoaded', () => {
  const prices = document.querySelectorAll('.prices'),
  hiddenPrices = document.querySelectorAll('.hiddenPrices'),
  displaySum = document.querySelector('#sum'),
  deleteSvgs = document.querySelectorAll('.deleteSvg'),
  deleteIDs = document.querySelectorAll('.deleteOrderIDs'),
  deleteTd = document.querySelectorAll('.deleteOrderTd'),
  deleteLink = document.querySelectorAll('.deleteOrderA');

  if (prices && hiddenPrices) {
    for (let i = 0; i < hiddenPrices.length; i++) {
      prices[i].innerHTML = formatter.format(hiddenPrices[i].value)
    };
    const sum = calculate(hiddenPrices);
    displaySum.innerHTML = formatter.format(sum)
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
