const ProductTopCustomers = {

  collection: 'product_top_customers',
  metric: 'Product Top Customers',

  formDataFields: [
    {
      id: 'company_name',
      label: 'Company Name',
      type: 'string',
      value: ''
    },
    {
      id: 'number_of_feature_requests',
      label: 'Number of Feature Requests',
      type: 'number',
      value: 0
    },
    {
      id: 'average_time',
      label: 'Average Time',
      type: 'string',
      value: ''
    },
  ]
}

export default ProductTopCustomers
