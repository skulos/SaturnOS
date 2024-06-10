import { defineStore } from 'pinia'
import pb from '@/pocketbase/pocketbase'
import Bill from '@/models/bill'

export const useBillsStore = defineStore({
  id: 'bills',
  state: () => ({
    pb: pb,
    bills: []
  }),
  getters: {
    getUnpaidBillCount: (state) => {
      return state.bills.filter((bill) => bill.payed === false).length
    },
    getUnpaidBillAmount: (state) => {
      const unpaidBills = state.bills.filter((bill) => bill.payed === false)
      return unpaidBills.reduce((total, bill) => total + bill.total, 0)
    }
  },
  actions: {
    subscribe() {
      pb.collection('bills').subscribe(
        '*',
        (event) => {
          this.bills.push(Bill.fromJSON(event.record))
        },
        {}
      )
    },
    async resets() {
      this.bills = []
      this.readBills()
    },
    async updateBill(id, supplier, supplier_ref, issue_date, payment_method, payed, products) {
      const bill = new Bill(supplier, supplier_ref, issue_date, payment_method, payed, products)
      await pb.collection('bills').update(id, bill.toJSON())
      this.resets()
    },
    async deleteBill(id) {
      await pb.collection('bills').delete(id)
      this.resets()
    },
    async createBillFromData(
      supplier,
      supplier_ref,
      issue_date,
      payment_method,
      payed,
      products,
      total
    ) {
      const bill = new Bill(
        supplier,
        supplier_ref,
        issue_date,
        payment_method,
        payed,
        products,
        total
      )
      const record = await this.pb.collection('bills').create(bill.toJSON())
      await this.readBills()
      return record
    },
    async createBill(bill) {
      await this.pb.collection('bills').create(bill.toJSON())
      await this.readBills()
    },
    async readBills() {
      // const record = await this.pb.collection('bills').getFullList()
      const record = await this.pb.collection('bills').getFullList({ expand: 'supplier,products' })
      this.bills = record.map((record) => Bill.fromJSON(record))
    }
  }
})

// [
//   {
//       "collectionId": "jfy6sf3ej4dmdti",
//       "collectionName": "bills",
//       "created": "2024-03-31 10:47:57.978Z",
//       "expand": {
//           "products": [
//               {
//                   "active": true,
//                   "code": "BROEI50",
//                   "collectionId": "v2obfgenn849qtd",
//                   "collectionName": "products",
//                   "created": "2024-03-30 19:19:22.381Z",
//                   "id": "6m5kfsd0z2lvlmo",
//                   "name": "Broei Mengsel 50kg",
//                   "updated": "2024-03-30 19:19:22.381Z"
//               },
//               {
//                   "active": true,
//                   "code": "BROEI25",
//                   "collectionId": "v2obfgenn849qtd",
//                   "collectionName": "products",
//                   "created": "2024-03-30 19:14:07.125Z",
//                   "id": "lz9hv23i81mnciz",
//                   "name": "Broei Mengelsel 25kg",
//                   "updated": "2024-03-30 19:14:07.125Z"
//               }
//           ],
//           "supplier": {
//               "account_type": "eft",
//               "active": true,
//               "collectionId": "381cged67ppxeyc",
//               "collectionName": "suppliers",
//               "created": "2024-03-21 20:43:20.639Z",
//               "email": "info@montego.co.za",
//               "id": "ojjz6akv6j1i5oa",
//               "name": "Montego",
//               "updated": "2024-03-21 20:43:20.639Z"
//           }
//       },
//       "id": "7te3qb7zagy6zj0",
//       "issue_date": "2024-03-31 00:00:00.000Z",
//       "payed": false,
//       "payment_method": "cash",
//       "products": [
//           "6m5kfsd0z2lvlmo",
//           "lz9hv23i81mnciz"
//       ],
//       "supplier": "ojjz6akv6j1i5oa",
//       "supplier_ref": "dregrgrg",
//       "updated": "2024-03-31 10:47:57.978Z"
//   }
// ]
