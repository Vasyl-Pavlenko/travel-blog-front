import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from 'react-icons/ai'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'
import {
  createComment,
  getPostComments,
} from '../redux/features/comment/commentSlice'
import { CommentItem, Loader } from '../components'

const PostPage = () => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState(null);

  const { user } = useSelector((state) => state.auth)
  const { comments, loading } = useSelector((state) => state.comment)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const removePostHandler = () => {
    try {
      setIsLoading(true)
      dispatch(removePost(params.id))
      toast('Post has been deleted');
      navigate('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = () => {
    if (!comment.trim()) {
      setFormError('Comment is required');
      toast.error(formError);
      return;
    }

    try {
      setIsLoading(true)
      const postId = params.id
      dispatch(createComment({ postId, comment }))
      setComment('')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true)
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [params.id, dispatch])

  const fetchPost = useCallback(async () => {
  setIsLoading(true);
  try {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  } catch (error) {
    console.error("An error occurred while fetching the post:", error);
  } finally {
    setIsLoading(false);
  }
}, [params.id]);

useEffect(() => {
  fetchPost();
}, [fetchPost]);

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if (isLoading || loading) {
    return <Loader />
  }

  return (
    <div className='max-w-screen-lg container mx-auto py-10'>
      <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-lg py-2 px-4 hover:bg-gray-700 ease-linear duration-300'>
        <Link
          className='flex'
          to={'/'}
        >
          Back
        </Link>
      </button>

      {post && (
        <div className='flex flex-col md:flex-row md:w-full gap-10 py-8'>
          <div className='md:w-2/3 w-4/5 mx-auto'>
            <div className='flex flex-col basis-1/4 flex-grow rounded-xl'>
              <div className={`flex ${post?.imgUrl ? 'h-80' : ''} pb-3`}>
                {post?.imgUrl && (
                  <img
                    src={`${process.env.RENDER_URL}/${post.imgUrl}`}
                    alt='img'
                    className='object-cover w-full rounded-xl'
                  />
                )}
              </div>
            </div>

            <div className='flex justify-between items-center py-3'>
              <div className='text-xs text-white opacity-50'>
                {post?.username}
              </div>

              <div className='text-xs text-white opacity-50'>
                <Moment
                  date={post.createdAt}
                  format='D MMM YYYY'
                />
              </div>
            </div>

            <div className='text-white text-xl'>
              {post.title}
            </div>

            <p className='text-white opacity-60 text-xs pt-4'>
              {post.text}
            </p>

            <div className='flex gap-3 items-center mt-2 justify-between'>
              <div className='flex gap-3 mt-4'>
                <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                  <AiFillEye />{' '}
                  
                  <span>{post.views}</span>
                </button>

                <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                  <AiOutlineMessage />{' '}

                  <span>{post.comments?.length || 0} </span>
                </button>
              </div>

              {user?._id === post.author && (
                <div className='flex gap-3 mt-4'>
                  <button className='flex items-center justify-center gap-2 text-white opacity-50 hover:scale-125 ease-linear duration-300'>
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>

                  <button
                    onClick={removePostHandler}
                    className='flex items-center justify-center gap-2  text-white opacity-50 hover:scale-125 ease-linear duration-300'
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
      
          <div className='md:w-1/3 w-3/5 p-8 bg-gray-600 flex flex-col gap-2 rounded-xl mx-auto'>
            {isLoading || loading ? (
              <Loader />
            ) : (
              user?._id && (
                <form
                  className='flex gap-2'
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type='text'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Comment'
                    className='text-black w-full bg-gray-300 border p-2 text-xs outline-none placeholder:text-gray-600 rounded-lg'
                  />
              
                  <button
                    type='submit'
                    onClick={handleSubmit}
                    className='flex justify-center items-center bg-gray-700 hover:bg-gray-800 ease-linear duration-300 text-xs text-white rounded-lg py-2 px-4'
                  >
                    Send
                  </button>
                </form>
            ))}
            <span className='text-white'>Comments:</span>

            {comments?.map((cmt) => (
              <CommentItem
                key={cmt._id}
                cmt={cmt}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostPage;
