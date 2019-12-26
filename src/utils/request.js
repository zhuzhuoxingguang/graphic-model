import axios from 'axios'
// 不需要Loading状态的接口请求
// const whiteList = ['/substationAndBusTree']

// axios实例 方便设置baseURL和timeout
const service = axios.create({
  // eslint-disable-next-line template-curly-spacing
  baseURL: `/${ process.env.REACT_APP_BASE_URL }/`
})

// 拦截请求，发送请求之前，添加Loading状态和修正参数，get方法需要参数为params
service.interceptors.request.use(config => {
  if (config.method.toUpperCase() === 'GET') {
    config.params = config.data
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 拦截接口请求获取数据之后，处理axios返回的多与的数据，保留所需的res.data
// 如果存在loading实例，清空Loading
service.interceptors.response.use(res => {
  // 对返回的数据进行一些处理
  if (res.status === 200) {
    return res.data
  } else {
    return Promise.reject(res)
  }
}, error => {
  // 对返回的错误进行一些处理
  return Promise.reject(error)
})
// 请求方法
const request = (url, method = 'post', data) => {
  return new Promise((resolve, reject) => {
    service({ data, url, method }).then(res => {
      resolve(res)
    }).catch(_error => {
      reject(_error)
    })
  })
}

request.post = (url, data) => request(url, 'post', data)
request.get = (url, data) => request(url, 'get', data)
export default request
