import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout/MainLayout'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import NewsFeed from './pages/NewsFeed/NewsFeed'
import UserPosts from './pages/UserPosts/UserPosts'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import AppProtectedRoutes from './ProtectedRouted/AppProtectedRoutes'
import AuthProtectedRoutes from './ProtectedRouted/AuthProtectedRoutes'
import PostDetails from './pages/PostDetails/PostDetails'
import Settings from './components/Settings/Settings'


export default function App() {


  const routes = createBrowserRouter([
    {path:"/", element: <MainLayout /> , children: [
      {index:true, element: <AppProtectedRoutes><NewsFeed/></AppProtectedRoutes> },
      {path:"profile", element: <AppProtectedRoutes><UserPosts/></AppProtectedRoutes> },
      {path:"settings", element: <AppProtectedRoutes><Settings/></AppProtectedRoutes> },

      {path:"post/:id", element: <AppProtectedRoutes><PostDetails/></AppProtectedRoutes> }, 
      {path: "*", element: <NotFound/>},


    ]},
    {path: "/", element: <AuthLayout /> , children: [
      {path: "login", element: <AuthProtectedRoutes><Login/></AuthProtectedRoutes>},
      {path: "register", element: <AuthProtectedRoutes><Register/></AuthProtectedRoutes> },

    ]},
  ])
  return (
    <>
     <RouterProvider router={routes}></RouterProvider>
    </>
  )
}
