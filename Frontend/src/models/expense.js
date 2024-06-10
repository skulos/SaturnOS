class Expense {
  constructor(expense_account, pay_from, amount, paid) {
    this.id = ''
    this.expense_account = expense_account
    this.pay_from = pay_from
    this.amount = amount
    this.paid = paid
    this.expanded = null
  }

  toJSON() {
    return {
      expense: this.expense_account,
      pay_from: this.pay_from,
      amount: this.amount,
      paid: this.paid
    }
  }

  static fromJSON(json) {
    const expense = new Expense(json.expense, json.pay_from, json.amount, json.paid)
    expense.id = json.id
    expense.expanded = json.expand
    return expense
  }
}

export default Expense

// {
//     "amount": 100,
//     "collectionId": "rra3pf1g309om1q",
//     "collectionName": "expenses",
//     "created": "2024-05-18 15:29:32.835Z",
//     "expense": "33dwj4h89cx1jwk",
//     "id": "tmvge1k91438nd0",
//     "paid": false,
//     "pay_from": "g1rertk7euzd6l2",
//     "updated": "2024-05-18 15:29:32.835Z"
// }
