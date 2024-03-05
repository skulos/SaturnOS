const ListTest = {
  collection: 'list_test',
  metric: 'List Test',

  formDataFields: [
    {
      id: 'test_one',
      label: 'Test Value String',
      type: 'string',
      value: ''
    },
    {
      id: 'test_two',
      label: 'Test Value Date',
      type: 'date',
      value: new Date().toISOString().slice(0, 10)
    },
    {
      id: 'test_three',
      label: 'Test Value Number',
      type: 'number',
      value: 0
    }
  ]
};

export default ListTest
