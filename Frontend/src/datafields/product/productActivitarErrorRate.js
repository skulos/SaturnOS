const ProductActivitarErrorRate = {
    collection: 'product_activitar_error_rate',
    metric: 'Activitar Error Rate',
    formDataFields: [
        {
            id: 'se_error_rates',
            label: 'SE Error Rates',
            type: 'number',
            value: 0
        },
        {
            id: 'activitar_error_rates',
            label: 'Activitar Error Rates',
            type: 'number',
            value: 0
        },
        {
            id: 'api_error_rates',
            label: 'API Error Rates',
            type: 'number',
            value: 0
        }
    ]
};

export default ProductActivitarErrorRate;
