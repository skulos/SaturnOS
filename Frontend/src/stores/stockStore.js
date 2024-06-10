import { defineStore } from 'pinia'
import pb from '@/pocketbase/pocketbase'
import StockItem from '@/models/stock'

export const useStockItemsStore = defineStore({
  id: 'expenses',
  state: () => ({
    pb: pb,
    stockItems: []
  }),
  actions: {
    subscribe() {
      pb.collection('stock_items').subscribe(
        '*',
        (event) => {
          this.stockItems.push(StockItem.fromJSON(event.record))
        },
        {}
      )
    },
    async resets() {
      this.stockItems = []
      this.readStockItems()
    },
    async updateStockItem(id, code, name, qty, cost, price, bill, remaining, sold_out) {
      const product = new StockItem(code, name, qty, cost, price, bill, remaining, sold_out)
      await pb.collection('stock_items').update(id, product.toJSON())
      this.resets()
    },
    async deleteStockItem(id) {
      await pb.collection('stock_items').delete(id)
      this.resets()
    },
    async createStockItemFromData(code, name, qty, cost, price, bill, remaining, sold_out) {
      const product = new StockItem(code, name, qty, cost, price, bill, remaining, sold_out)
      const record = await this.pb.collection('stock_items').create(product.toJSON())
      return record
      // await this.readStockItems()
    },
    async createStockItem(stockItem) {
      await this.pb.collection('stock_items').create(stockItem.toJSON())
      await this.readStockItems()
    },
    async readStockItems() {
      const record = await this.pb.collection('stock_items').getFullList()
      this.stockItems = record.map((record) => StockItem.fromJSON(record))
    }
  }
})
