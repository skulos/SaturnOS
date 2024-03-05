// Double Form
const BugFixesAndFeatures = {
    collection: 'bug_fixes_and_features',
    metric: 'Bug Fixes and Features',
    labels: [
        'NUMBER OF TICKETS',
        'TOTAL SCORE',
    ],
    formDataFields: [
        {
            id: 'improvement_bug_fixes',
            label: 'Improvement Bug Fixes',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'regression_related_bug_fixes',
            label: 'Regression Related Bug Fixes',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'critical_bug_fixes',
            label: 'Critical Bug Fixes',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'performance_related_bugs',
            label: 'Performance Related Bugs',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'feature_enhancement_releases',
            label: 'Feature / Enhancement Releases',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'pressing_features',
            label: 'Pressing Features',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'optimization_features',
            label: 'Optimization Features',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'tickets_in_progress',
            label: 'Tickets in Progress',
            type: 'number',
            value: 0,
            second: 0
        },
        {
            id: 'total_deploys',
            label: 'Total Deploys',
            type: 'number',
            value: 0,
            second: 0
        }
    ]
};

export default BugFixesAndFeatures;
