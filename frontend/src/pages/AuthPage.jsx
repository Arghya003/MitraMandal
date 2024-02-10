import React from 'react'
import SignupCard from '../components/SignUp'
import LoginCard from '../components/Login'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'

const AuthPage = () => {
    const authScreenState=useRecoilValue(authScreenAtom);
        console.log(authScreenState)
    
  return (
    <div>
     {authScreenState==='login'?<LoginCard/>:<SignupCard/>}
    </div>
  )
}

export default AuthPage
