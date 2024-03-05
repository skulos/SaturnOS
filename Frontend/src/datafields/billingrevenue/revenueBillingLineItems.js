const RevenueBillingLineitem = {
    collection: 'revenue_billing_items',
    metric: 'Billing Line Items',
    formDataFields: [
        {
            id: 'training',
            label: 'Training',
            type: 'number',
            value: 0
        },
        {
            id: 'setup_fees',
            label: 'Setup Fees',
            type: 'number',
            value: 0
        },
        {
            id: 'distribution_setup',
            label: 'Distribution Setup',
            type: 'number',
            value: 0
        },
        {
            id: 'payment_fee_revenue_share',
            label: 'Payment Fee Revenue Share',
            type: 'number',
            value: 0
        },
        {
            id: 'data_revenue',
            label: 'Data Revenue',
            type: 'number',
            value: 0
        },
    ]
};

export default RevenueBillingLineitem;
