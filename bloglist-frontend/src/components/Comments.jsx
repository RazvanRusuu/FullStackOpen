import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogs from '../services/blogs'
import { useParams } from 'react-router-dom'

const Comments = ({ comments }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const { id } = useParams()

  const mutation = useMutation({
    mutationFn: blogs.addCommentToBlog,
    mutationKey: ['blog'],
    onSuccess: (data) => {
      queryClient.setQueryData(['blog', data.data.id], data.data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleAddComment = () => {
    if (!comment) return
    mutation.mutate({ id, comment })
  }

  return (
    <div className="my-3">
      <h3 className="font-bold">Comments</h3>
      <div className="flex items-center gap-4">
        <input
          className="p-1 text-xs text-gray-600 border-gray-400 rounded-sm"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          onClick={handleAddComment}
          className="px-1 border text-sm border-gray-200"
        >
          Add comment
        </button>
      </div>
      <ul className="list-disc ml-10">
        {comments?.map((comm) => (
          <li className="list-disc" key={comm.id}>
            {comm.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
