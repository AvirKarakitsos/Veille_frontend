import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import AddElement from './pages/AddElement/AddElement.jsx'
import PostPage from './pages/PostPage/PostPage.jsx'
import AuthorPage from './pages/AuthorPage/AuthorPage.jsx'
import Error from './pages/Error/Error.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {path: '/', element: <Home/>},
      {path: '/author/:id', element: <AuthorPage/>},
      {path: '/post/:id', element: <PostPage/>},
      {path: '/create', element: <AddElement/>},
    ]
  },
  {
    path:'*',
    element: <Error/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
