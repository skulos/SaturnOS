class Customer {
    constructor(name, amount, active) {
      this.id = ''
      this.name = name
      this.active = active
      this.amount = amount
    }
  
    toJSON() {
      return {
        name: this.name,
        amount: this.amount,
        active: this.active,
      }
    }
  
    static fromJSON(json) {
      const customer = new Customer(json.name, json.amount, json.active)
      customer.id = json.id
      return customer
    }
  }

  export default Customer;