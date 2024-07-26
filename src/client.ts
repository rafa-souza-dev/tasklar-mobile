import axios from 'axios'

export const client = axios.create({
  baseURL: 'https://3819-35-175-150-25.ngrok-free.app/api',
})
