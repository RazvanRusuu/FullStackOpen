import axios from 'axios'
const baseUrl = '/api/blogs'

export const defineConfig = (axios) => {
  return axios.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem('blog_auth'))
    if (user && user.token)
      config.headers.Authorization = `Bearer ${user.token}`

    return config
  })
}

defineConfig(axios)

const getAll = async () => {
  const request = await axios.get(baseUrl)
  console.log(request.data.data)
  return request.data.data
}

const getBlog = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data.data
}

const createBlog = async (body) => {
  const request = await axios.post(baseUrl, body)
  return request.data
}

const updateBlog = async (blog) => {
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.data
}

const addCommentToBlog = async (blog) => {
  const request = await axios.post(`${baseUrl}/${blog.id}/comments`, {
    content: blog.comment,
  })

  return request.data
}

const deleteBlog = async (blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`)
}

export default {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  addCommentToBlog,
}
