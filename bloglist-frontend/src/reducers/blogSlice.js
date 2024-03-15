import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const initBlogs = () => {
  return async (dispatch) => {
    try {
      const { data } = await blogService.getAll()
      dispatch(setBlogs(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const setBlogAsync = (blog) => {
  return async (dispatch) => {
    try {
      const data = await blogService.createBlog(blog)
      dispatch(appendBlog(data))
    } catch (error) {
      throw error
    }
  }
}

export const deleteBlogAsync = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog)
    dispatch(deleteBlog(blog))
  }
}

export const updateBlogAsync = (blog) => {
  return async (dispatch) => {
    const data = await blogService.updateBlog(blog)
    dispatch(updateBlog(data))
  }
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    appendBlog: (state, action) => {
      state.push(action.payload.data)
    },
    updateBlog: (state, action) => {
      const blog = action.payload.data
      return state.map((currBlog) =>
        currBlog.id === blog.id ? blog : currBlog
      )
    },

    deleteBlog: (state, action) => {
      const blogId = action.payload.id
      return state.filter((blog) => blog.id != blogId)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions
export default blogSlice.reducer
