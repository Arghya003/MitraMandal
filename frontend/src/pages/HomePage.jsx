import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'

const HomePage = () => {
const user=useRecoilValue(userAtom)
  return (
    <div>
          <Link to={`/${user.username}`}>
              <Flex w={"full"} justifyContent={"center"}>
                  <Button mx={"auto"}>Visit Profile Page</Button>
              </Flex>
          </Link>
    </div>
   
  )
}

export default HomePage
