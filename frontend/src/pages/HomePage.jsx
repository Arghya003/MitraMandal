import { Button, Flex,Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../Hooks/useShowToast'
import Posts from '../components/Posts'
import postsAtom from '../atoms/postAtom'

const HomePage = () => {
const [posts,setPosts]=useRecoilState(postsAtom)
const user=useRecoilValue(userAtom)
const showToast=useShowToast()

      useEffect(()=>{
          const getFeedPosts=async()=>{
            try{
               const res=await fetch("/api/posts/feed");
               const data=await res.json();
               if(data.error){
                showToast("Error",data.error,"error")
                return;
               }
               //console.log(data) 

               setPosts(data);
               //console.log(posts)
            }
            catch(e){
              console.log(e)
              showToast("Error",e.message,"error")
            }
          }
          getFeedPosts()
      },[showToast,setPosts])
      
  return (
   <>
   {
    posts.length===0?<Text ml={12} bg={"gray.900"} color={"gray.300","gray.300"}w={"half"}>Follow Users to See Feed Posts</Text>:
    <h1>

    </h1>
    }
{posts.map((post)=>(
  <Posts key={post._id} post ={post} postedBy={post.postedBy}/>
))}
   
   
  
   </>
   
  )
}

export default HomePage
