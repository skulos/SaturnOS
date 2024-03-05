const LeadGenerationAndSales = {
    collection: 'sales_lead_generation_and_sales',
    metric: 'Lead Generation and Sales',
    formDataFields: [
        {
            id: 'lead_generation_consultants',
            label: 'Lead Generation Consultants',
            type: 'number',
            value: 0
        },
        {
            id: 'demos_booked_per_consultant',
            label: 'Demos Booked per Consultant',
            type: 'number',
            value: 0
        },
        {
            id: 'sales_execs',
            label: 'Sales Execs',
            type: 'number',
            value: 0
        },
        {
            id: 'demos_done_per_execs',
            label: 'Demos Done per Execs',
            type: 'number',
            value: 0
        },
        {
            id: 'agreements_received_per_sales',
            label: 'Agreements Received Per Sales',
            type: 'number',
            value: 0
        }
    ]
};

export default LeadGenerationAndSales;
