const ProductActivitarFailureRate = {
    collection: 'product_activitar_failure_rate',
    metric: 'Activitar Payment Failure Rate',
    formDataFields: [
        {
            id: 'se_payment_failure_rate',
            label: 'SE Payment Failure Rate',
            type: 'number',
            value: 0
        },
        {
            id: 'activitar_payment_failure_rates',
            label: 'Activitar Payment Failure Rates',
            type: 'number',
            value: 0
        },
        {
            id: 'outerfix_payment_failure_rates',
            label: 'Outerfix Payment Failure Rates',
            type: 'number',
            value: 0
        },
        {
            id: 'all_payment_failures',
            label: 'All Payment Failures',
            type: 'number',
            value: 0
        }
    ]
};

export default ProductActivitarFailureRate;
