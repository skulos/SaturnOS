const SupportNumberOfTickets = {
    collection: 'support_number_of_tickets',
    metric: 'Number of Tickets',
    formDataFields: [
        {
            id: 'total',
            label: 'Total',
            type: 'number',
            value: 0
        },
        {
            id: 'basic_assistance',
            label: 'Basic Assistance',
            type: 'number',
            value: 0
        },
        {
            id: 'medium_troubleshooting',
            label: 'Medium Troubleshooting',
            type: 'number',
            value: 0
        },
        {
            id: 'effort',
            label: 'Effort',
            type: 'number',
            value: 0
        },
        {
            id: 'in_depth_troubleshooting',
            label: 'In-depth Troubleshooting',
            type: 'number',
            value: 0
        },
        {
            id: 'no_assistance',
            label: 'No Assistance',
            type: 'number',
            value: 0
        },
        {
            id: 'not_graded',
            label: 'Not Graded',
            type: 'number',
            value: 0
        }
    ]
};

export default SupportNumberOfTickets;
