import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import FriendRequest from '../../components/FriendRequest/FriendRequest'
import { getAllPosts } from '../../Services/PostServices'
import PostSkeleton from '../../components/Skeletons/PostSkeleton'
import Post from '../../components/Post/Post'
// import { useQuery } from '@tanstack/react-query'
import CreatePost from '../../components/CreatePost/CreatePost'




export default function NewsFeed() {

// const {data , isLoading , isError , isFetching , error} = useQuery({
//  queryKey:["getPosts"],
//  queryFn:getAllPosts
// })




     const [posts , SetPosts] = useState([])
      async function fetchAllPost(){

      const response = await getAllPosts();
      // console.log(response.data.posts);
      SetPosts(response.data.posts)

    }

  useEffect(()=>{

   


    fetchAllPost()
  },[])
  
  // if (data) {
  //   console.log(data.posts);
    
  // }

  return (
    <>
      <div className="bg-gray-200">
       <div className="container pt-5 ">
        <div className="grid grid-cols-4">
        <div className="col-span-1 hidden lg:block">
          <SideBar/>
        </div>

        <div className="col-span-4   lg:col-span-2 space-y-5">
        <CreatePost fetchAllPost={fetchAllPost}/>
          {posts.length === 0 ? [...Array(10)].map((_ , index)=> <PostSkeleton key={index}/>) : <>

          {posts.map((post)=><Post key={post.id} post={post} /> )}

          </>}
          
        </div>



          <div className="col-span-1 hidden lg:block">
            <FriendRequest/>
          </div>

        </div>
       </div>
      </div>

    </>
  )
}
