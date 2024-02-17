
import { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom';
import useShowToast from '../Hooks/useShowToast';
import { Text } from '@chakra-ui/react';

const UserPage = () => {
  const[user,setUser]=useState(null);
  const showToast=useShowToast()
  const {username}=useParams()
  useEffect(()=>{
    const getUser=async()=>{
      try{
          const res= await fetch(`/api/users/profile/${username}`);
          const data=await res.json();
          console.log(data)

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
    getUser();
  },[username,showToast])

  if(!user)
  return <h1>User Not Found</h1>;

  return (
    <div>
      <UserHeader user={user}/>
      
      <UserPost likes={1200} replies={481} postImg="/public/Post-1.jpg" postTitle="Im just a baby doggo" date="1d" />
      <UserPost likes={1892} replies={231} postImg="/public/Post-2.jpg" postTitle="Its You And Me" date="3d"/>
      <UserPost likes={1110} replies={876} postImg="/public/Post-3.jpg" postTitle="What every One should have" date="1w" />
      <UserPost likes={700} replies={412}  postTitle="What's Up Bitches?" date="2w"/>
      
    </div>
  )
}

export default UserPage
