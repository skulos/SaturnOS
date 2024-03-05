const RevenueCollection = {
    collection: 'revenue_collection',
    metric: 'Collection',
    formDataFields: [
        {
            id: 'total_revenue',
            label: 'Total Revenue',
            type: 'number',
            value: 0
        },
        {
            id: 'collected_to_date',
            label: 'Collected to Date',
            type: 'number',
            value: 0.0
        },
        {
            id: 'collected_at_end_of_month',
            label: 'Collected at End of Month',
            type: 'number',
            value: 0.0
        },
        {
            id: 'collected_in_first_week',
            label: 'Collected in First Week',
            type: 'number',
            value: 0.0
        },
        {
            id: 'collected_in_second_week',
            label: 'Collected in Second Week',
            type: 'number',
            value: 0.0
        },
        {
            id: 'collected_in_third_week',
            label: 'Collected in Third Week',
            type: 'number',
            value: 0.0
        },
        {
            id: 'collected_in_fourth_week',
            label: 'Collected in Fourth Week',
            type: 'number',
            value: 0.0
        }
    ]
};

export default RevenueCollection;
