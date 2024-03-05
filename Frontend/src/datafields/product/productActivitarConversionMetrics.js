const ProductActivitarConversionMetrics = {
    collection: 'product_activitar_conversion_metrics',
    metric: 'Activitar Conversion Metrics',
    formDataFields: [
        {
            id: 'sessions',
            label: 'Sessions',
            type: 'number',
            value: 0
        },
        {
            id: 'users',
            label: 'Users',
            type: 'number',
            value: 0
        },
        {
            id: 'sessions_per_user',
            label: 'Sessions per User',
            type: 'number',
            value: 0
        },
        {
            id: 'engaged_sessions',
            label: 'Engaged Sessions',
            type: 'number',
            value: 0
        },
        {
            id: 'engaged_sessions_vs_sessions',
            label: 'Engaged Sessions vs Sessions',
            type: 'number',
            value: 0
        },
        {
            id: 'purchase',
            label: 'Purchase',
            type: 'number',
            value: 0
        },
        {
            id: 'purchase_vs_users',
            label: 'Purchase vs Users',
            type: 'number',
            value: 0
        },
        {
            id: 'purchases_per_engaged_session',
            label: 'Purchases per Engaged Session',
            type: 'number',
            value: 0
        }
    ]
};

export default ProductActivitarConversionMetrics;
