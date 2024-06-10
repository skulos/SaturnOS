class Bill {
  constructor(supplier, supplier_ref, issue_date, payment_method, payed, products, total) {
    this.id = ''
    this.supplier = supplier
    this.supplier_ref = supplier_ref
    this.issue_date = issue_date
    this.payment_method = payment_method
    // eft, cash, card
    this.payed = payed
    this.products = products
    this.total = total
    this.expanded = null
  }

  toJSON() {
    return {
      supplier: this.supplier,
      supplier_ref: this.supplier_ref,
      issue_date: this.issue_date,
      payment_method: this.payment_method,
      payed: this.payed,
      products: this.products,
      total: this.total
    }
  }

  static fromJSON(json) {
    const date = json.issue_date.slice(0, 10)
    const bill = new Bill(
      json.supplier,
      json.supplier_ref,
      date,
      json.payment_method,
      json.payed,
      json.products,
      json.total
    )
    bill.id = json.id
    bill.expanded = json.expand
    return bill
  }
}

export default Bill
