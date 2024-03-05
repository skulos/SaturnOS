const SalesData = {
    collection: 'sales_data',
    metric: 'Sales Data',
    formDataFields: [
        {
            id: 'pitched_calls',
            label: 'Pitched Calls',
            type: 'number',
            value: 0
        },
        {
            id: 'demos_booked',
            label: 'Demos Booked',
            type: 'number',
            value: 0
        },
        {
            id: 'no_show',
            label: 'No-Show',
            type: 'number',
            value: 0
        },
        {
            id: 'completed',
            label: 'Completed',
            type: 'number',
            value: 0
        },
        {
            id: 'rescheduled',
            label: 'Rescheduled',
            type: 'number',
            value: 0
        },
        {
            id: 'agreements_received',
            label: 'Agreements Received',
            type: 'number',
            value: 0
        }
    ]
};

export default SalesData;
