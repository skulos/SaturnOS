const OnboardingCompaniesCancelled = {

  collection: 'onboarding_companies_cancelled',
  metric: 'Companies that cancelled',

  formDataFields: [
    {
      id: 'company_name',
      label: 'Company Name',
      type: 'string',
      value: ''
    },
    {
      id: 'date_live',
      label: 'Date Live',
      type: 'date',
      value: new Date().toISOString().slice(0, 10),
    },
    {
      id: 'months_live',
      label: 'Months live',
      type: 'number',
      value: 0
    },
  ]
}

export default OnboardingCompaniesCancelled
