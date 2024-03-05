const MarketingBrandAwareness = {
    collection: 'marketing_brand_awareness',
    metric: 'Brand Awareness',
    // labels: [
        // 'NUMBER OF TICKETS',
        // 'TOTAL SCORE',
    // ],
    formDataFields: [
        {
            id: 'newsletter',
            label: 'Newsletter',
            firstLabel: 'Opens',
            secondLabel: 'Conversion Rate',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'social_media',
            label: 'Social Media',
            firstLabel: 'Growth',
            secondLabel: '% Change',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'social_conversation',
            label: 'Social Conversation',
            firstLabel: 'Ave Repost',
            secondLabel: 'Engagement',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'podcast',
            label: 'Podcast',
            firstLabel: 'Growth',
            secondLabel: '% Change',
            type: 'number',
            value: 0,
            second: 0
        },
    ]
};

export default MarketingBrandAwareness