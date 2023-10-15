import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import AddPost from './pages/AddPost/AddPost.jsx'
import PostPage from './pages/PostPage/PostPage.jsx'
import AuthorPage from './pages/AuthorPage/AuthorPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {path: '/', element: <Home/>},
      {path: '/author/:id', element: <AuthorPage/>},
      {path: '/post/:id', element: <PostPage/>},
      {path: '/create', element: <AddPost/>},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
