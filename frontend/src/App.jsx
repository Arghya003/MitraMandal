import React from "react"
import { Container } from '@chakra-ui/react'
//import { Button } from "@chakra-ui/button"
import { Navigate, Routes } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import { Route } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import LogoutButton from "./components/LogoutButton"
import UpdateProfile from "./pages/UpdateProfile"
const App = () => {
  const user=useRecoilValue(userAtom)
  return (
    <div>
      <Container maxW="620px"> 
      <Header/>
     <Routes>
      <Route path="/" element={user?<HomePage/>: <Navigate to ="/auth"/>}/>
          <Route path="/auth" element={!user?<AuthPage />:<Navigate to="/"/>} />
          <Route path="/update" element={user ? <UpdateProfile /> : <Navigate to="/auth" />} />
      <Route path="/:username" element={<UserPage/>}/>
       <Route path="/:username/post/:pid" element={<PostPage/>}/>
     </Routes>
     {user && <LogoutButton/>}
      </Container>
       
     
    </div>
  )
}

export default App
