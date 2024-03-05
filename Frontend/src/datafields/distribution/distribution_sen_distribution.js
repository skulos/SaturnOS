const SENDistribution = {
    collection: 'distribution_sen_distribution',
    metric: 'SEN Distribution',
    labels: [
        'CURRENT NO. SERVICES',
        'NO. OF BOOKINGS',
        'BOOKINGS VALUE',
        'REVENUE',
    ],
    formDataFields: [
        {
            id: 'services_sold',
            label: 'Services Sold',
            type: 'number',
            value: 0,
            second: 0,
            third: 0,
            fourth:0
        },
    ]
};

export default SENDistribution;
