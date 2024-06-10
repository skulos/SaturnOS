import { defineStore } from 'pinia'
import pb from '@/pocketbase/pocketbase'
import Account from '@/models/accounts'

export const useAccountsStore = defineStore({
  id: 'accounts',
  state: () => ({
    pb: pb,
    accounts: []
  }),
  getters: {},
  actions: {
    subscribe() {
      pb.collection('accounts').subscribe(
        '*',
        (event) => {
          this.accounts.push(Account.fromJSON(event.record))
        },
        {}
      )
    },
    getAccountNameById(id) {
      const account = this.accounts.filter((account) => account.id === id)
      const ledgerAccount = Account.fromJSON(account.at(0))
      return ledgerAccount.name
    },
    async resets() {
      this.accounts = []
      this.readAccounts()
    },
    async updateAccount(id, name, active, balance_type, account_type) {
      const account = new Account(name, active, balance_type, account_type)
      await pb.collection('accounts').update(id, account.toJSON())
      this.resets()
    },
    async deleteAccount(id) {
      await pb.collection('accounts').delete(id)
      this.resets()
    },
    async createAccountFromData(name, balance_type, account_type) {
      const account = new Account(name, true, balance_type, account_type)
      const record = await this.pb.collection('accounts').create(account.toJSON())
      await this.readAccounts()
      return record
    },
    async createAccount(account) {
      await this.pb.collection('accounts').create(account.toJSON())
      await this.readAccounts()
    },
    async readAccounts() {
      // const record = await this.pb.collection('accounts').getFullList()
      const record = await this.pb.collection('accounts').getFullList()
      this.accounts = record.map((record) => Account.fromJSON(record))
    }
  }
})
