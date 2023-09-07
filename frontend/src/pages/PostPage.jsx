import { Avatar, Flex ,Text,Image,Box, Divider, Button} from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import { useState } from "react"
import Comments from "../components/Comments"


const PostPage = () => {
  const [liked,setLiked]=useState(false)
  return (
  <>
  <Flex>
    <Flex w={"full"} alignItems={"center"} gap={3}>
      <Avatar src="/public/Avatar.jpg" size={"md"} name="Arghya Guha"/>
      <Flex>
        <Text fontSize={"sm"} fontWeight={"bold"}>itsArghya69</Text>
        <Image src="/public/verified.png" w={4} h={4} ml={1}/>
      </Flex>
    </Flex>
    <Flex gap={4} alignItems={"center"}>
      <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
      <BsThreeDots/>
    </Flex>
  </Flex>
  <Text my={3}>Its You and Me</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={"/public/Post-2.jpg"} w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked}/>
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>234 replies </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>{200+(liked?1:0)}likes</Text>
      </Flex>
      <Divider my={6}/>
      <Flex justifyContent={"space-between"} my={4}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"} >🖐</Text>
          <Text>Get the app to  like , reply and post </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={6}/>
      <Comments comment="looks really good" createdAt='2d' likes={100} username='Ayush' userAvatar='https://bit.ly/dan-abramov'/>
      <Comments comment="Looking Great Guys" createdAt='2d' likes={76} username='Aman' userAvatar='https://bit.ly/sage-adebayo' />
      <Comments comment="Proud of both of You" createdAt='1d' likes={12} username='Aditya' userAvatar='https://bit.ly/kent-c-dodds' />
      <Comments comment="Awwwwww" createdAt='1d' likes={400} username='Anuska' userAvatar='https://bit.ly/ryan-florence' /> 
      <Comments comment="Makes me feel so Good " createdAt='1d' likes={56} username='Ankit' userAvatar='https://bit.ly/prosper-baba' />
  </>
  )
}

export default PostPage
