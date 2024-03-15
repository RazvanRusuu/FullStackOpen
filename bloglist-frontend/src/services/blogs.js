import axios from 'axios'
const baseUrl = '/api/blogs'

axios.interceptors.request.use(function (config) {
  const userLS = localStorage.getItem('blog_auth')

  const user = userLS && JSON.parse(userLS)

  if (user && user.token) config.headers.Authorization = `Bearer ${user.token}`

  return config
})

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
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
