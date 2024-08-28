import axios from 'axios'

const $host = axios.create({ baseURL: import.meta.env.VITE_API_URL })
const $authHost = axios.create({ baseURL: import.meta.env.VITE_API_URL })

const authInstance = (config) => {
  if (localStorage.getItem('token') === null) return
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInstance)

export { $authHost, $host }
