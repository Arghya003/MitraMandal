import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../Hooks/useShowToast'

const LogoutButton = () => {
   const showToast=useShowToast()
    const setUser=useSetRecoilState(userAtom)
    const handleLogout=async()=>{
        try{
               
                const res=await fetch("api/users/logout",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                const data=await res.json();

                if(data.error){
                    showToast("Error", data.error, "error")
                }
                localStorage.removeItem("user-threads")

                setUser(null)
           
        }
        catch(e){
            console.log(e.message)
        }
    }
  return (
    <div>
      <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
     onClick={handleLogout} >Logout</Button>
    </div>
  )
}

export default LogoutButton
