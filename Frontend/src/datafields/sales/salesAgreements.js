const SalesAgreements = {

  collection: 'sales_agreements_received',
  metric: 'Agreements Received',

  formDataFields: [
    {
      id: 'company_name',
      label: 'Company Name',
      type: 'string',
      value: ''
    },
    {
      id: 'country',
      label: 'Country',
      type: 'string',
      value: ''
    },
  ]
}

export default SalesAgreements
