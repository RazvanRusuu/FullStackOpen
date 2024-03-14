import userEvent from '@testing-library/user-event'
import { screen, render } from '@testing-library/react'
import BlogForm from './BlogForm'
import { describe, test, expect } from 'vitest'

describe('tesing blog form functionality', () => {
  test('submiting a form pass the necessary values', async () => {
    const mockSubmitHandler = vi.fn()
    const user = userEvent.setup()

    const mockValues = {
      title: 'Title...',
      author: 'Author...',
      url: 'url...',
    }

    render(<BlogForm handleBlogSubmit={mockSubmitHandler} />)

    const titleInput = screen.getByLabelText('Title')
    const authorInput = screen.getByLabelText('Author')
    const url = screen.getByLabelText('Url')

    const submitButton = screen.getByText('Submit')

    await user.type(titleInput, mockValues['title'])
    await user.type(authorInput, mockValues['author'])
    await user.type(url, mockValues['url'])

    await user.click(submitButton)

    expect(mockSubmitHandler.mock.calls).toHaveLength(1)
    console.log(mockSubmitHandler.mock.calls)
    expect(mockSubmitHandler.mock.calls[0][0].title).toBe(mockValues['title'])
    expect(mockSubmitHandler.mock.calls[0][0].author).toBe(mockValues['author'])
    expect(mockSubmitHandler.mock.calls[0][0].url).toBe(mockValues['url'])
  })
})
