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
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import userAtom from '../atoms/userAtom'
import useShowToast from '../Hooks/useShowToast'
export default function LoginCard() {
    const showToast=useShowToast()
    const [showPassword, setShowPassword] = useState(false)
    const setAuthState = useSetRecoilState(authScreenAtom)
    const setUser = useSetRecoilState(userAtom);
    const [inputs,setInputs]=useState({
        username:"",
        password:""
    }
    )
    const handleLogin=async()=>{
        try{
                const res=await fetch("/api/users/login",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"

                    },
                    body:JSON.stringify(inputs)
                })
                const data=await res.json();
                if(data.error){
                    showToast("Error",data.error,"error")
                    return;
                }
            localStorage.setItem("user-threads", JSON.stringify(data));
            setUser(data);
        }
        catch(e){
                console.log(e)
                showToast("Error",e,"error")
        }

    }
    
    return (
        <Flex

            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <h2>Click on Logo to change Theme</h2>

                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Login
                    </Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    boxShadow={'lg'}
                    p={8}
                    w={{
                        base:"full",
                        sm:"400px"
                    }}>
                    <Stack spacing={4}>
                       
                           
                            <Box>
                                <FormControl isRequired>
                                    <FormLabel>UserName</FormLabel>
                                <Input value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}  type="text" />
                                </FormControl>
                            </Box>
                      
                      
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}type={showPassword ? 'text' : 'password'} />
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
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={'white'}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}
                                onClick={handleLogin}>
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Don't have an account? <Link onClick={()=>setAuthState("signup")} color={'blue.400'}>SignUp</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}