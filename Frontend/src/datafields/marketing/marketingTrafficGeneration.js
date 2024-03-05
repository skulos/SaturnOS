const MarketingTrafficGeneration = {
    collection: 'marketing_traffic_generation',
    metric: 'Traffic Generation',
    labels: [
        'AUDIENCE',
        'CLICK TO DEMO',
    ],
    formDataFields: [
        {
            id: 'newsletter',
            label: 'Newsletter',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'social_media',
            label: 'Social Media',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'podcast',
            label: 'Podcast',
            type: 'number',
            value: 0,
            second: 0
        },
    ]
};

export default MarketingTrafficGeneration