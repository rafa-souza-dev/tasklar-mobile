import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://34.228.54.151:8000/api',
})
