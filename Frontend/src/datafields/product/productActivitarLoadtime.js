const ProductActivitarLoadTime = {
    collection: 'product_activitar_load_time',
    metric: 'Activitar Load Time',
    formDataFields: [
        {
            id: 'activitar_dashboard_load_time',
            label: 'Activitar Dashboard Load Time',
            type: 'number',
            value: 0
        },
        {
            id: 'activitar_mbf_load_time',
            label: 'Activitar MBF Load Time',
            type: 'number',
            value: 0
        },
        {
            id: 'activitar_mbf_availability_load_time',
            label: 'Activitar MBF Availability Load Time',
            type: 'number',
            value: 0
        }
    ]
};

export default ProductActivitarLoadTime;
