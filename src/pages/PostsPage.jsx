import React from 'react'
import { useEffect, useState } from 'react'
import { PostItem, Loader } from '../components'
import axios from '../utils/axios'

const PostsPage = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMyPosts = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/posts/user/me')
      setPosts(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMyPosts()
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Posts don't exist yet...
      </div>
    );
  }

  return (
    <div className='w-full md:w-4/5 mx-auto py-10 flex flex-col gap-10'>
      {posts?.map((post, idx) => (
        <PostItem
          post={post}
          key={idx}
        />
      ))}
    </div>
  )
}

export default PostsPage;
