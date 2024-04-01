class Stock {
    constructor(code, name, cost, price, sold) {
      this.id = ''
      this.code = code
      this.name = name
      this.cost = cost
      this.price = price
      this.sold = sold
    }
  
    toJSON() {
      return {
        code: this.code,
        name: this.name,
        cost: this.cost,
        price: this.price,
        sold: this.sold
      }
    }
  
    static fromJSON(json) {
      const stock = new Stock(json.code, json.name, json.cost, json.price, json.sold)
      stock.id = json.id
      return stock
    }
  }

  export default Stock;


  

  // Stock Item
  /*
    code    - used to identify the item via barcodes and in bills
    name    - name of the product
    active  - active and disabled
    cost    - what did it cost
    price   - what does it sell for
    qty     - how many are there to sell
    bill_id - what bill created this item
  */

  // Stock Items
  /*
    code    - used to identify the item via barcodes and in bills
    name    - name of the product
    active  - active and disabled
    cost    - what did it cost
    price   - what does it sell for
    qty     - how many are there to sell
    bill_id - what bill created this item
  */


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Product
  /*
    code    - used to identify the item via barcodes and in bills
    name    - name of the product
    active  - active and disabled (meaning sold or not)
    cost    - what did it cost
    price   - what does it sell for
    bill_id - what bill created this item
  */

 // Stock Items
  /*
    code        - used to identify the item via barcodes and in bills
    name        - name of the product
    qty         - how many are there to sell
    ave_cost    - what did it cost
    avg_price   - what does it sell for
  */   
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////