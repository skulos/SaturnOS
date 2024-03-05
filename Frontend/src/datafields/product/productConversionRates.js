const ProductActivitarConversionRates = {
    collection: 'product_activitar_conversion_rates',
    metric: 'Activitar Conversion Rates',
    formDataFields: [
        {
            id: 'se_conversion_rates_product_to_checkout',
            label: 'SE Conversion Rates (Product to Checkout)',
            type: 'number',
            value: 0
        },
        {
            id: 'se_conversion_rates_checkout_to_confirmation',
            label: 'SE Conversion Rates (Checkout to Confirmation)',
            type: 'number',
            value: 0
        },
        {
            id: 'app_conversion_rates',
            label: 'App Conversion Rates',
            type: 'number',
            value: 0
        },
        {
            id: 'outerfix_conversion_rates',
            label: 'Outerfix Conversion Rates',
            type: 'number',
            value: 0
        }
    ]
};

export default ProductActivitarConversionRates;
