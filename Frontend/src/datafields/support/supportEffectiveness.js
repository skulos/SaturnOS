const SupportEffectiveness = {
    collection: 'support_effectiveness',
    metric: 'Support Effectiveness',
    formDataFields: [
        {
            id: 'first_response',
            label: 'First Response',
            type: 'string',
            value: '00:00:00'
        },
        {
            id: 'resolved_time',
            label: 'Resolved Time',
            type: 'string',
            value: '00:00:00'
        },
        {
            id: 'tickets_resolved',
            label: 'Tickets Resolved',
            type: 'number',
            value: 0
        },
        {
            id: 'consultants_active',
            label: 'Consultants Active',
            type: 'number',
            value: 0
        },
        {
            id: 'tickets_per_consultant_3',
            label: 'Tickets Per Consultant (3)',
            type: 'number',
            value: 0
        },
        // {
        //     id: 'tickets_per_consultant_per_day',
        //     label: 'Tickets per Consultant per Day',
        //     type: 'number',
        //     value: 0
        // },
        // TODO calculate self
        {
            id: 'points',
            label: 'Points',
            type: 'number',
            value: 0
        },
        {
            id: 'points_per_consultant',
            label: 'Points per Consultant',
            type: 'number',
            value: 0
        },
        {
            id: 'abandoned_calls',
            label: 'Abandoned Calls',
            type: 'number',
            value: 0
        },
        {
            id: 'chats',
            label: 'Chats',
            type: 'number',
            value: 0
        },
        {
            id: 'calls',
            label: 'Calls',
            type: 'number',
            value: 0
        }
    ]
};

export default SupportEffectiveness;
