const OnboardingCompaniesInOnboarding = {

  collection: 'onboarding_companies_in_onboarding',
  metric: 'Companies in Onboarding',

  formDataFields: [
    {
      id: 'company_name',
      label: 'Company Name',
      type: 'string',
      value: ''
    },
    {
      id: 'date_received',
      label: 'Date Received',
      type: 'date',
      value: new Date().toISOString().slice(0, 10),
    },
    {
      id: 'weeks_in_onboarding',
      label: 'Weeks in Onboarding',
      type: 'number',
      value: 0
    },
  ]
}

export default OnboardingCompaniesInOnboarding
