
import { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import useShowToast from '../Hooks/useShowToast';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import Post from '../components/Posts';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postAtom';

const UserPage = () => {
  const[user,setUser]=useState(null);
  const [posts,setPosts]=useRecoilState(postsAtom)
  const[fetching,setFetching]=useState(true)
  const showToast=useShowToast()
  const {username}=useParams()
  useEffect(()=>{
    const getUser=async()=>{
      try{
          const res= await fetch(`/api/users/profile/${username}`);
          const data=await res.json();
        //  console.log(data)

          if(data.error){
              showToast("Error",data.error,"error")
              return;
          }
          setUser(data)
      }
      catch(e){
        console.log(e)
        showToast("Error", e, "error")
      }
    } 
      const getPosts=async()=>{
        setFetching(true)
        try{
          const res=await fetch(`/api/posts/user/${username}`)
          const data= await res.json();
          console.log(data)
          setPosts(data)
        }
        catch(e){
          showToast("Error",e,"error")
          setPosts([])
        }
        finally{
          setFetching(false)
        }

      }


      getPosts()
    getUser();
  },[username,showToast,setPosts])

  if(!user)
  return <h1>User Not Found</h1>;

  return (
    <div>
      <UserHeader user={user}/>
      {!fetching&& posts.length===0&&<Text m={26} p={12} size={"xxl"}>No posts to show 😥</Text>}
      {fetching&&
      <Flex justifyContent={"center"} my={12}>
        <Spinner size={"xl"}/>
        </Flex>}

        {posts.map((post)=>(
          <Post key={post._id} post={post} postedBy={post.postedBy}setPosts={setPosts}/>
        ))}
      
      
    </div>
  )
}

export default UserPage
