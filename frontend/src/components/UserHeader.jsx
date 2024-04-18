import {
  Box,
  Flex,
  VStack,
  Text,
  
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { Portal } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { ChakraProvider } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { CgMoreO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useState } from "react";

import useShowToast from"../Hooks/useShowToast"


const UserHeader = ({user}) => {
  //Toast
  const toast = useToast();
  const showToast= useShowToast();
  //Copy Link Function
  const copyURL = () => {
    const connectionURL = window.location.href;
    navigator.clipboard.writeText(connectionURL).then(() => {
      toast({ description: "Copied" });
    });
    console.log(window);
  };
  const currentUser = useRecoilValue(userAtom);
  const[following,setFollowing]=useState(user.followers.includes(currentUser._id))
  //console.log(following)
  
  
 
  const handleFollowUnfollow=async()=>{
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
   

      try{
            const res= await fetch(`/api/users/follow/${user._id}`,{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              }

            })
            const data=await res.json()
            if(data.error){
              showToast("Error", data.error, "error")
              return;
            }
           // console.log(data)
            setFollowing(!following)


        if (following) {
          showToast("Success", `Unfollowed ${user.name}`, "success");
          user.followers.pop(); // simulate removing from followers
        } else {
          showToast("Success", `Followed ${user.name}`, "success");
          user.followers.push(currentUser?._id); // simulate adding to followers
        }
      }
      catch(error){
        showToast("Error",error,"error")
      }
      
  }



  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.700"}
              color={"white"}
              p={1}
              borderRadius={"full"}
            >
             
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src=''
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentUser.id===user.id &&(
        <Link to={"/update"}>
        <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
      {currentUser?._id !== user._id && (
        <Button size={"sm"} onClick={handleFollowUnfollow}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex width={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} Followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
                
        </Flex>
        <Flex gap={4}>
          <Box>
           
          </Box>
          <Menu>
            <MenuButton>
              <CgMoreO size={24} cursor={"pointer"} />
            </MenuButton>
            <Portal>
              <MenuList bg={"gray.dark"}>
                <MenuItem bg={"gray.dark"} color={"white"} onClick={copyURL}>
                  Copy Link
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
          <Text>Posts</Text>
        </Flex>
              
       
      </Flex>
    </VStack>
  );
};

export default UserHeader;
