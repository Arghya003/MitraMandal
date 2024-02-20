
import { Flex, Image,useColorMode } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { Link, Link as RouterLink } from 'react-router-dom'
import{AiFillHome} from "react-icons/ai"
import { RxAvatar } from "react-icons/rx"
const Header = () => {
  const user=useRecoilValue(userAtom)
  const {colorMode,toggleColorMode}=useColorMode()
    return (
    <Flex justifyContent={"space-between"} mt={6} mb={12} >
      {user &&(
        <Link  ink as={RouterLink} to ="/">
        <AiFillHome size={26}/>

        </Link>
      )}
        <Image
           onClick={toggleColorMode} cursor={"pointer"}
            w={9}
           
            
            alt="logo"
            src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"} />
        {user && (
          <Link  as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={26} />

          </Link>
        )}
    </Flex>
    )
}

export default Header
