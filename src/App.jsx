import React, { Suspense, lazy, useEffect } from 'react';
import { Layout } from './components/Layout.jsx';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/features/auth/authSlice.js';
import { Loader } from './components/Loader/Loader.jsx';

const MainPage = lazy(() => import(/* webpackChunkName: "MainPage" */ './pages/MainPage.jsx'));
const PostsPage = lazy(() => import(/* webpackChunkName: "PostsPage" */'./pages/PostsPage.jsx'));
const PostPage = lazy(() => import(/* webpackChunkName: "PostPage" */'./pages/PostPage.jsx'));
const AddPostPage = lazy(() => import(/* webpackChunkName: "AddPostPage" */'./pages/AddPostPage.jsx'));
const RegisterPage = lazy(() => import(/* webpackChunkName: "RegisterPage" */'./pages/RegisterPage.jsx'));
const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */'./pages/LoginPage.jsx'));
const EditPostPage = lazy(() => import(/* webpackChunkName: "EditPostPage" */'./pages/EditPostPage.jsx'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='posts' element={<PostsPage />} />
          <Route path=':id' element={<PostPage />} />
          <Route path=':id/edit' element={<EditPostPage />} />
          <Route path='new' element={<AddPostPage />} />
          <Route path='registration' element={<RegisterPage />} />
          <Route path='login' element={<LoginPage />} />
        </Routes>
      </Suspense>
      <ToastContainer position='bottom-right' />
    </Layout>
  );
}

export default App;
