const MarketingLeadGeneration = {
    collection: 'marketing_lead_generation',
    metric: 'Lead Generation',
    labels: [
        'CLICK THROUGHS',
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

export default MarketingLeadGeneration