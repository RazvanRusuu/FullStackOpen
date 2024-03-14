import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, expect, test } from 'vitest'

describe('test Blog component for user input', () => {
  const blog = {
    title: 'An example of blog title',
    author: 'Anonymus',
    url: 'https://example.com',
    likes: 23,
    user: {
      id: '2139333',
      name: 'name',
      username: 'username',
    },
  }

  test('renders correct content before user input', async () => {
    const { container } = render(<Blog blog={blog} />)
    const blogInfo = container.querySelector('.blog-info')

    expect(blogInfo).toHaveTextContent('An example of blog title')
  })

  test('render correct content after user event', async () => {
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toHaveTextContent('https://example.com')
    expect(button).toHaveTextContent('hide')
  })

  test('like event handler is called correctly', async () => {
    const mockLikeHandler = vi.fn()

    render(<Blog blog={blog} onLike={mockLikeHandler} />)

    const user = userEvent.setup()
    const exapandButton = screen.getByText('view')
    await user.click(exapandButton)

    const likeButton = screen.getByText('Like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
