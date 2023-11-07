import React from 'react'
import { Link } from 'react-router-dom'
import { Loader } from './Loader'

export const PopularPosts = ({ post, loading }) => {
  if (loading) {
    return <Loader />
  }

  return (
    <div className='bg-gray-600 my-1 rounded-lg'>
      <Link
        to={`${post._id}`}
        className='flex text-xs p-2 text-gray-300 hover:bg-gray-700 hover:text-white ease-linear duration-300'
      >
        {post.title}
      </Link>
    </div>
  )
}
