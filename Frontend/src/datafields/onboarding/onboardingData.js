const OnboardingData = {

  collection: 'onboarding_data',
  metric: 'Onboarding Data',

  formDataFields: [
    { id: 'number_of_consultants', label: 'Number of Consultants', type: 'number', value: 0 },
    {
      id: 'number_of_companies_in_onboarding_at_start_of_period',
      label: 'Number of Companies in Onboarding at Start of Period',
      type: 'number',
      value: 0
    },
    {
      id: 'number_of_companies_that_went_live_in_period',
      label: 'Number of Companies that Went Live in Period',
      type: 'number',
      value: 0
    },
    {
      id: 'number_of_new_companies_received_in_period',
      label: 'Number of New Companies Received in Period',
      type: 'number',
      value: 0
    },
    {
      id: 'number_of_companies_live_per_consultant',
      label: 'Number of Companies Live per Consultant',
      type: 'number',
      value: 0
    },
    {
      id: 'number_of_companies_remaining_in_onboarding_end_period',
      label: 'Number of Companies Remaining in Onboarding End Period',
      type: 'number',
      value: 0
    }
  ]
}

export default OnboardingData
