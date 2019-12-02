import Mock from 'mockjs'

Mock.mock(RegExp('/mock/relation/substations-list.*'), 'post', res => {
  return Mock.mock({
    statusCode: 200,
    result: 0,
    results: {
      'list|10': [{
        key: '@integer(2100000001, 32999999999)',
        substationName: '@county',
        'lines|1-20': ['@county -@integer(102, 996)']
      }],
      total: '@integer(0,230)'
    }
  })
})
