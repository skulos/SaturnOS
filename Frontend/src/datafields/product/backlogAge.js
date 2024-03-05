const BacklogAgeData = {
    collection: 'backlog_age_data',
    metric: 'Backlog Age Data',
    formDataFields: [
        {
            id: 'strategic_features',
            label: 'Strategic Features',
            type: 'number',
            value: 0
        },
        {
            id: 'customer_requested_features',
            label: 'Customer Requested Features',
            type: 'number',
            value: 0
        },
        {
            id: 'improvement_bugs',
            label: 'Improvement Bugs',
            type: 'number',
            value: 0
        },
        {
            id: 'regression_related_bugs',
            label: 'Regression Related Bugs',
            type: 'number',
            value: 0
        },
        {
            id: 'critical_bugs',
            label: 'Critical Bugs',
            type: 'number',
            value: 0
        }
    ]
};

export default BacklogAgeData;
