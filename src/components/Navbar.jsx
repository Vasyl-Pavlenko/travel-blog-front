import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const activeStyles = {
    color: 'white',
  }

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast("You've logged out of the system")
    navigate('/')
  }

  return (
    <div className='flex py-4 justify-between items-center max-w-screen-lg mx-auto'>
      <button className='flex justify-center items-center px-4 py-2 bg-gray-600 text-xs text-white rounded-lg hover:bg-gray-700 ease-linear duration-300'>
        <Link to={'/'}>
          My blog
        </Link>
      </button>

      {isAuth && (
        <ul className='flex gap-4 md:gap-8'>
          <li>
            <NavLink
              to={'/'}
              href='/'
              className='text-xs text-gray-400 hover:text-white ease-linear duration-300'
              style={({ isActive }) => isActive ? activeStyles : undefined
              }
            >
              Main 
            </NavLink>
          </li>

          <li>
            <NavLink
              to={'/posts'}
              href='/'
              className='text-xs text-gray-400 hover:text-white ease-linear duration-300'
              style={({ isActive }) => isActive ? activeStyles : undefined
              }
            >
              My posts
            </NavLink>
          </li>

          <li>
            <NavLink
              to={'/new'}
              href='/'
              className='text-xs text-gray-400 hover:text-white ease-linear duration-300'
              style={({ isActive }) => isActive ? activeStyles : undefined
              }
            >
              Add post
            </NavLink>
          </li>
        </ul>
      )}

      <div className='flex justify-center items-center bg-gray-600 cursor-pointer text-xs text-white px-4 py-2 rounded-lg hover:bg-gray-700 ease-linear duration-300'>
        {isAuth ? (
          <button onClick={logoutHandler}>
            Log out
          </button>
        ) : (
          <Link to={'/login'}>
            Log in
          </Link>
        )}
      </div>
    </div>
  )
}
