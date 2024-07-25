import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://35.175.150.25:8000/api',
})
