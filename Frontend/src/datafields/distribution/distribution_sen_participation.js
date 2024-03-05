const SENParticipation = {
    collection: 'distribution_sen_participation',
    metric: 'SEN Participation',
    formDataFields: [
        {
            id: 'suppliers_offering',
            label: 'Suppliers Offering',
            type: 'number',
            value: 0
        },
        {
            id: 'suppliers_selling',
            label: 'Suppliers Selling',
            type: 'number',
            value: 0
        },
        {
            id: 'suppliers_offering_and_selling',
            label: 'Suppliers Offering and Selling',
            type: 'number',
            value: 0
        },
        {
            id: 'services_offered',
            label: 'Services Offered',
            type: 'number',
            value: 0
        },
        {
            id: 'services_sold',
            label: 'Services Sold',
            type: 'number',
            value: 0
        }
    ]
};

export default SENParticipation;
