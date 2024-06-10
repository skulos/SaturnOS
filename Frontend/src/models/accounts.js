class LedgerAccount {
  constructor(name, active, balance_type, account_type) {
    this.id = ''
    this.name = name
    this.active = active
    this.balance_type = balance_type
    this.account_type = account_type
  }

  toJSON() {
    return {
      name: this.name,
      active: this.active,
      balance_type: this.balance_type,
      account_type: this.account_type
    }
  }

  static fromJSON(json) {
    const ledger = new LedgerAccount(json.name, json.active, json.balance_type, json.account_type)
    ledger.id = json.id
    return ledger
  }
}

export default LedgerAccount
