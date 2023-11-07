import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts, PostItem, Loader } from '../components'
import { getAllPosts } from '../redux/features/post/postSlice'

const MainPage = () => {
  const dispatch = useDispatch()
  const { posts, popularPosts, loading } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (loading) {
    return (
      <Loader />
    )
  }

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Posts don't exist yet...
      </div>
    );
  }  

  return (
    <div className='max-w-[1024px] mx-auto py-10'>
      <div className='flex flex-col md:flex-row md:w-full gap-10 py-8'>
        <div className='md:w-2/3 w-4/5 mx-auto'>
          {posts?.map((post, idx) => (
            <PostItem
              key={idx}
              post={post}
            />
          ))}
        </div>
        
        <div className='md:w-1/3 w-4/5 mx-auto'>
          <div className='text-xs uppercase text-white'>
            Popular:
          </div>

          {popularPosts?.map((post, idx) => (
            <PopularPosts
              key={idx}
              post={post}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainPage;