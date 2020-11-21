import axios, { AxiosInstance } from 'axios'

export const Api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  responseType: 'json'
})