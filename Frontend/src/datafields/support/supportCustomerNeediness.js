const SupportCustomerNeediness = {
    collection: 'support_customer_neediness',
    metric: 'Customer Neediness',
    formDataFields: [
        {
            id: 'customer',
            label: 'Customer Name',
            type: 'string',
            value: ''
          },
          {
            id: 'tickets',
            label: 'Tickets',
            type: 'number',
            value: 0
          },
          {
            id: 'weight',
            label: 'Weight',
            type: 'number',
            value: 0
          },
          {
            id: 'resolved',
            label: 'Resolved',
            type: 'number',
            value: 0
          },
    ]
};

export default SupportCustomerNeediness;