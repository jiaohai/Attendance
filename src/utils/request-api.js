import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

export const post = (url, data, config) => service({
  url,
  data,
  ...config,
  method: 'post'
})

export const put = (url, data, config) => service({
  url,
  data,
  ...config,
  method: 'put'
})

export const del = (url, data, config) => service({
  url,
  data,
  ...config,
  method: 'delete'
})

export const get = (url, params, config) => service({
  url,
  params,
  ...config,
  method: 'get'
})

export default service
