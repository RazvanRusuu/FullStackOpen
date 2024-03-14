import axios from 'axios'
const baseUrl = '/api/blogs'

axios.interceptors.request.use(function (config) {
  const user = JSON.parse(localStorage.getItem('blog_auth'))
  if (user && user.token) config.headers.Authorization = `Bearer ${user.token}`

  return config
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data.data)
}

const createBlog = async (body) => {
  const request = await axios.post(baseUrl, body)
  return request.data
}

const updateBlog = async (blog) => {
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.data
}

const deleteBlog = async (blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`)
}

export default { getAll, createBlog, updateBlog, deleteBlog }
