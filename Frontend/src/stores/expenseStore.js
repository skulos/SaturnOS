import { defineStore } from 'pinia'
import pb from '@/pocketbase/pocketbase'
import Expense from '@/models/expense'

export const useExpensesStore = defineStore({
  id: 'expenses',
  state: () => ({
    pb: pb,
    expenses: []
  }),
  getters: {
    getUnpaidExpenseCount: (state) => {
      const count = state.expenses.filter((bill) => bill.paid === false).length
      return count
    },
    getUnpaidExpenseAmount: (state) => {
      const unpaidBills = state.expenses.filter((bill) => bill.paid === false)
      return unpaidBills.reduce((total, expense) => total + expense.amount, 0)
    }
  },
  actions: {
    subscribe() {
      pb.collection('expenses').subscribe(
        '*',
        (event) => {
          this.expenses.push(Expense.fromJSON(event.record))
        },
        {}
      )
    },
    async resets() {
      this.expenses = []
      this.readExpenses()
    },
    // async updateExpense(id, ) {
    //   const product = new Expense(code, name, qty, cost, price, bill, remaining, sold_out)
    //   await pb.collection('expenses').update(id, product.toJSON())
    //   this.resets()
    // },
    async deleteExpense(id) {
      await pb.collection('expenses').delete(id)
      this.resets()
    },
    async createExpenseFromData(expsense_account, pay_from, amount, paid) {
      const expense = new Expense(expsense_account, pay_from, amount, paid)
      const record = await this.pb.collection('expenses').create(expense.toJSON())
      return record
      // await this.readStockItems()
    },
    async createExpense(expense) {
      await this.pb.collection('expenses').create(expense.toJSON())
      await this.readExpenses()
    },
    async readExpenses() {
      const record = await this.pb.collection('expenses').getFullList({ expand: 'expense.name' })
      this.expenses = record.map((record) => Expense.fromJSON(record))
    }
  }
})
