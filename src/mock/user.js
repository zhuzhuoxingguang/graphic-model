import Mock from 'mockjs'

Mock.mock(RegExp('/mock/user/list.*'), 'get', () => {
  return Mock.mock({
    statusCode: 200,
    code: 1,
    msg: '@csentence',
    result: {
      'list|10': [{
        name: '@cname',
        accountNumber: '@string(4,12)',
        phone: '@integer(13000000000, 19999999999)',
        'accountStatus|1': [0, 1],
        'id|+1': 100
      }]
    }
  })
})
