
import { Flex, Image,useColorMode } from '@chakra-ui/react'

const Header = () => {
  const {colorMode,toggleColorMode}=useColorMode()
    return <Flex justifyContent={"center"} mt={6} mb={12} >
        <Image
           onClick={toggleColorMode} cursor={"pointer"}
            w={9}
           
            
            alt="logo"
            src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"} />
   
    </Flex>
}

export default Header
