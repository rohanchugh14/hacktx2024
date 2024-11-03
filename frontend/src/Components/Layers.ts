export const dropdownScopes = {
  budget_function: [
      'budget_function',
      'budget_subfunction',
      'federal_account',
      'program_activity',
      'object_class',
      'recipient',
      'award'
  ],
  agency: [
      'agency',
      'federal_account',
      'program_activity',
      'object_class',
      'recipient',
      'award'
  ],
  object_class: [
      'object_class',
      'agency',
      'federal_account',
      'program_activity',
      'recipient',
      'award'
  ]
};

export const rootScopes = [
  'budget_function',
  'agency',
  'object_class'
];