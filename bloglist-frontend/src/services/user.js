import axios from 'axios'
import { defineConfig } from './blogs'

const baseUrl = '/api/users'

defineConfig(axios)

export const getUsers = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

export const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)

  return response.data.data
}
