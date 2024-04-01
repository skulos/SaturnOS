import pb from '@/pocketbase/pocketbase'

class Supplier {
  constructor(name, email, active, accountType) {
    this.id = ''
    this.name = name
    this.email = email
    this.active = active
    this.accountType = accountType
  }

  toJSON() {
    return {
      name: this.name,
      email: this.email,
      active: this.active,
      account_type: this.accountType.toLowerCase()
    }
  }

  static fromJSON(json) {
    const supplier = new Supplier(json.name, json.email, json.active, json.account_type)
    supplier.id = json.id
    return supplier
  }
}

class Suppliers {

  constructor() {
    if (!Suppliers.instance) {
      this.pb = pb
      Suppliers.instance = this
    }
    return Suppliers.instance
  }

  async createSupplierFromData(name, email, account_type) {
    const supplier = new Supplier(name, email, true, account_type.toLowerCase())
    await this.pb.collection('suppliers').create(supplier.toJSON())
  }

  async createSupplier(supplier) {
    await this.pb.collection('suppliers').create(supplier.toJSON())
  }

  async readSuppliers() {
    const record = await this.pb.collection('suppliers').getFullList()
    const suppliers = record.map((record) => Supplier.fromJSON(record))

    return suppliers
  }

  async read() {
    const record = await this.pb.collection('suppliers').getFullList()
    const suppliers = record.map((record) => Supplier.fromJSON(record))

    return suppliers
  }
};


// const Suppliers = new SuppliersClass(pb)

export {Supplier, Suppliers};

// export default Suppliers;
// const Suppliers = new SuppliersClass()
// Object.freeze(Suppliers)