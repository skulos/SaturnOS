const SupportCustomerSatisfaction = {
    collection: 'support_customer_satisfaction',
    metric: 'Customer Satisfaction',
    formDataFields: [
        {
            id: 'voluntary_surveys_completed',
            label: 'Voluntary Surveys Completed',
            type: 'number',
            value: 0
        },
        {
            id: 'satisfied',
            label: 'Satisfied',
            type: 'number',
            value: 0
        },
        {
            id: 'unsatisfied',
            label: 'Unsatisfied',
            type: 'number',
            value: 0
        },
        {
            id: 'score',
            label: 'Score',
            type: 'number',
            value: 0
        }
    ]
};

export default SupportCustomerSatisfaction;
