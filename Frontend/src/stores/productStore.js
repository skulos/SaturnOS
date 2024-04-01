import { defineStore } from 'pinia'
import pb from '@/pocketbase/pocketbase'
import Product from '@/models/product.js'

export const useProductsStore = defineStore({
  id: 'products',
  state: () => ({
    pb: pb,
    products: []
  }),
  actions: {
    subscribe() {
        pb.collection('products').subscribe(
            '*',
            (event) => {
                this.products.push(Product.fromJSON(event.record))
            },
            {}
        )
    },
    async resets() {
      this.products = [];
      this.readProducts();
    },
    async updateProduct(id, code, name, active) {
      const product = new Product(code, name, active)
      await pb.collection('products').update(id, product.toJSON())
      this.resets();
    },
    async deleteProduct(id) {
      await pb.collection('products').delete(id);
      this.resets();
    },
    async createProductFromData(code, name, active) {
      const product = new Product(code, name, active)
      await this.pb.collection('products').create(product.toJSON())
      await this.readProducts()
    },
    async createProduct(product) {
      await this.pb.collection('products').create(product.toJSON())
      await this.readProducts()
    },
    async readProducts() {
      const record = await this.pb.collection('products').getFullList()
      this.products = record.map((record) => Product.fromJSON(record))
    }
    // async findById(id) {
    //   const record = await pb.collection('products').getOne(id)
    // }
  }
});