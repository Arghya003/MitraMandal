import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../Hooks/useShowToast'
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
const LogoutButton = () => {
   const showToast=useShowToast()
   const navigate=useNavigate()
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
                navigate("/auth")
           
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
     onClick={handleLogout} ><FiLogOut size={25}/></Button>
    </div>
  )
}

export default LogoutButton
