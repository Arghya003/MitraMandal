import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRecoilState, useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import userAtom from '../atoms/userAtom'
export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false)
    const setAuthState = useSetRecoilState(authScreenAtom);
    const[input,setInput]=useState({
        name:"",
        username:"",
        email:"",
        password:"",
    })
        const setUser=useRecoilState(userAtom)
    const toast=useToast()
    const handleSignUp=async()=>{
        try{        
            //console.log(input)
                const res=await fetch("/api/users/signup",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(input)
                })
                const data=await res.json();
                if(data.error){
                        toast({
                            title:"Error",
                            description:data.error,
                            status:"error",
                            duration:3000,
                            isClosable:true
                        })
                }
                console.log(data);
                localStorage.setItem("user-threads",JSON.stringify(data))
                setUser(data)
        }
        catch(e){
            console.log(e)
            toast({
                title: "Error",
                description:"",
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
    }
    return (
        <Flex
          
            align={'center'}
            justify={'center'}
            >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                   
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl  isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input onChange={(e)=>setInput({...input,name:e.target.value})}value={input.name}type="text" />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl  isRequired>
                                    <FormLabel>UserName</FormLabel>
                                    <Input onChange={(e) => setInput({ ...input, username: e.target.value })} value={input.username}type="text" />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl  isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input onChange={(e) => setInput({ ...input, email: e.target.value })} value={input.email} type="email" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input onChange={(e) => setInput({ ...input, password: e.target.value })} value={input.password} type={showPassword ? 'text' : 'password'} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={useColorModeValue("gray.600","gray.700")}
                                color={'white'}
                                _hover={{
                                    bg: useColorModeValue("gray.700","gray.800"),
                                }}
                                onClick={handleSignUp}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link onClick={()=>setAuthState("login")}  color={'blue.400'}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}