let totalSavings = 0
let totalIncomes = 0
let totalExpenses = 0
let transactions = []

const addTransaction = () => {
  const conceptField = document.getElementById('new-concept')
  const amountField = document.getElementById('new-amount')

  const newTransaction = {
    concept: conceptField.value,
    amount: parseFloat(amountField.value)
  }

  transactions.push(newTransaction)
  totalSavings += newTransaction.amount

  if (newTransaction.amount < 0) {
    totalExpenses += Math.abs(newTransaction.amount)
  } else {
    totalIncomes += newTransaction.amount
  }

  conceptField.value = ''
  amountField.value = ''

  updateView()
}

//Update the conteiner with total amount expenses/income
const updateView = () => {
  document.getElementById('total-savings').innerHTML = totalSavings + " €"
  document.getElementById('total-incomes').innerHTML = totalIncomes + " €"
  document.getElementById('total-expenses').innerHTML = totalExpenses + " €"

  const transactionList = document.getElementById('transactions-list')
  transactionList.textContent = ''


//Add the list of expenses/income
  transactions.forEach((element, index) => {
    const newChild = `<div class="list-group-item d-flex gap-3 py-3">
        <span class="concept d-flex gap-2 w-100 justify-content-between">${element.concept}</span>
        <span class="amount ${element.amount < 0 ? 'expense': 'income'}">${element.amount}</span>
        <span class="delete-button bi-trash" onclick="deleteTransaction(${index})"></span>
      </div>`
    transactionList.insertAdjacentHTML('beforeend', newChild)
  })
}

//Remove the transaction, when you click at the button
const deleteTransaction = (index) => {
  const amountToRemove = transactions[index].amount
  //remove the value from total saving
  totalSavings = totalSavings - amountToRemove
  //remove the value from income/expenses
  if (amountToRemove < 0){
    totalExpenses = totalExpenses + amountToRemove
  } else {
    totalIncomes = totalIncomes - amountToRemove
  }
  var removeTransaction = transactions.splice(index,1)
  updateView();
}

