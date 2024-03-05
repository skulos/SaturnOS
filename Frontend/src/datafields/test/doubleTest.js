const DoubleTest = {
    collection: 'double_test',
    metric: 'Double Test',
    labels: [
        'LABEL 1',
        'LABEL 2',
    ],
    formDataFields: [
        {
            id: 'test_one',
            label: 'Test Value String',
            type: 'string',
            value: '',
            second: ''
          },
          {
            id: 'test_two',
            label: 'Test Value Date',
            type: 'date',
            value: new Date().toISOString().slice(0, 10),
            second: new Date().toISOString().slice(0, 10)
          },
          {
            id: 'test_three',
            label: 'Test Value Number',
            type: 'number',
            value: 0,
            second: 0
          }
    ]
};

export default DoubleTest