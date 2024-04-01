class Product {
    constructor(code, name, active) {
      this.id = ''
      this.code = code
      this.name = name
      this.active = active
    }
  
    toJSON() {
      return {
        code: this.code,
        name: this.name,
        active: this.active,
      }
    }
  
    static fromJSON(json) {
      const product = new Product(json.code, json.name, json.active)
      product.id = json.id
      return product
    }
  }

  export default Product;