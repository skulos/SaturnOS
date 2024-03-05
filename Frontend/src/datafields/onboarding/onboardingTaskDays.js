const OnboardingTaskDays = {
  collection: 'onboarding_task_days',
  metric: 'Task Days',
  formDataFields: [
    {
      id: 'payment_gateway_application_completed',
      label: 'Payment gateway application completed',
      type: 'number',
      value: 0
    },
    {
      id: 'service_information_is_provided',
      label: 'Service information is provided',
      type: 'number',
      value: 0
    },
    {
      id: 'terms_and_conditions_is_provided',
      label: 'Terms and Conditions is provided',
      type: 'number',
      value: 0
    },
    {
      id: 'setup_complete',
      label: 'Setup Complete',
      type: 'number',
      value: 0
    },
    {
      id: 'first_training_after_agreement',
      label: '1st Training After Agreement',
      type: 'number',
      value: 0
    },
    {
      id: 'second_training_after_agreement',
      label: '2nd Training After Agreement',
      type: 'number',
      value: 0
    },
    {
      id: 'final_training_after_agreement',
      label: 'Final Training After Agreement',
      type: 'number',
      value: 0
    },
    {
      id: 'onboarding_checklist_completion',
      label: 'Onboarding checklist completion',
      type: 'number',
      value: 0
    },
    {
      id: 'se_links_sent',
      label: 'SE Links Sent',
      type: 'number',
      value: 0
    },
    {
      id: 'date_to_live',
      label: 'Date to Live',
      type: 'number',
      value: 0
    }
  ]
};

export default OnboardingTaskDays;
