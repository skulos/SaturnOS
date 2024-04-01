import { defineStore } from 'pinia'
import pb from '@/pocketbase/pocketbase'
import Customer from '@/models/customer'

export const useCustomersStore = defineStore({
  id: 'customers',
  state: () => ({
    pb: pb,
    customers: []
  }),
  actions: {
    subscribe() {
      pb.collection('customers').subscribe(
        '*',
        (event) => {
          this.customers.push(Customer.fromJSON(event.record))
        },
        {}
      )
    },
    async resets() {
      this.customers = []
      this.readCustomers()
    },
    async updateCustomer(id, name) {
      const customers = new Customer(name, 0.0, true)
      await pb.collection('customers').update(id, customers.toJSON())
      this.resets()
    },
    async deleteCustomer(id) {
      await pb.collection('customers').delete(id)
      this.resets()
    },
    async createCustomerFromData(name) {
      const customers = new Customer(name, 0.0, true)
      await this.pb.collection('customers').create(customers.toJSON())
      await this.readCustomers()
    },
    async createCustomer(customer) {
      await this.pb.collection('customers').create(customer.toJSON())
      await this.readCustomers()
    },
    async readCustomers() {
      const record = await this.pb.collection('customers').getFullList()
      this.customers = record.map((record) => Customer.fromJSON(record))
    }
  }
})
