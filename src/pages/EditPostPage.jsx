import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/post/postSlice'
import { toast } from 'react-toastify'

import axios from '../utils/axios'

const EditPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')
  const [formError, setFormError] = useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  const submitHandler = () => {
    if (!title.trim() || !text.trim()) {
      setFormError('Title and text are required');
      toast.error(formError);
      return;
    }

    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setText('')
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <form
      className='sm:w-4/5 md:w-3/5 mx-auto py-10'
      onSubmit={(e) => e.preventDefault()}
    >
      <label className='text-gray-300 py-2 bg-gray-500 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer hover:bg-gray-700 ease-linear duration-300 rounded-lg'>
        Add image:
        <input
          type='file'
          className='hidden'
          onChange={(e) => {
            setNewImage(e.target.files[0])
            setOldImage('')
          }}
        />
      </label>

      <div className='flex object-cover py-2'>
        {oldImage && (
          <img
            src={`${process.env.RENDER_URL}/${oldImage}`}
            alt={oldImage.name}
            className='rounded-2xl'
          />
        )}

        {newImage && (
          <img
            src={URL.createObjectURL(newImage)}
            alt={newImage.name}
            className='rounded-2xl'
          />
        )}
      </div>

      <label className='text-xs text-white opacity-70'>
        Post title:
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Add title'
          className='mt-1 text-black w-full rounded-lg bg-gray-300 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <label className='text-xs text-white opacity-70'>
        Post text:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder='Add text'
          className='mt-1 text-black w-full rounded-lg bg-gray-300 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
        />
      </label>

      <div className='flex gap-8 items-center justify-center mt-4'>
        <button
          onClick={submitHandler}
          className='flex justify-center items-center bg-blue-500 text-xs text-white rounded-lg py-2 px-4 hover:bg-blue-600 ease-linear duration-300'
        >
          Update
        </button>

        <button
          onClick={clearFormHandler}
          className='flex justify-center items-center bg-red-500 text-xs text-white rounded-lg py-2 px-4 hover:bg-red-600 ease-linear duration-300'
        >
          Clear
        </button>

        <button
          className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-lg py-2 px-4 hover:bg-gray-700 ease-linear duration-300'
        >
          <Link
          className='flex'
          to={'/'}
          >
            Back
          </Link>
        </button>
      </div>
    </form>
  )
}

export default EditPostPage;