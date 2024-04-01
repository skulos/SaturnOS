import { defineStore } from 'pinia'
import pb from '@/pocketbase/pocketbase'
import { Supplier } from '@/models/suppliers'

export const useSuppliersStore = defineStore({
  id: 'suppliers',
  state: () => ({
    pb: pb,
    suppliers: []
  }),
  actions: {
    subscribe() {
        pb.collection('suppliers').subscribe(
            '*',
            (event) => {
                this.suppliers.push(Supplier.fromJSON(event.record))
            },
            {}
        )
    },
    async resets() {
      this.suppliers = [];
      this.readSuppliers();
    },
    async updateSupplier(id, name, email, accountType) {
      const supplier = new Supplier(name, email, true, accountType.toLowerCase())
      await pb.collection('suppliers').update(id, supplier.toJSON())
      this.resets();
    },
    async deleteSupplier(id) {
      await pb.collection('suppliers').delete(id);
      this.resets();
    },
    async createSupplierFromData(name, email, accountType) {
      const supplier = new Supplier(name, email, true, accountType.toLowerCase())
      await this.pb.collection('suppliers').create(supplier.toJSON())
      await this.readSuppliers()
    },
    async createSupplier(supplier) {
      await this.pb.collection('suppliers').create(supplier.toJSON())
      await this.readSuppliers()
    },
    async readSuppliers() {
      const record = await this.pb.collection('suppliers').getFullList()
      this.suppliers = record.map((record) => Supplier.fromJSON(record))
    }
  }
});
