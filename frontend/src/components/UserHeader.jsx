import {
  Box,
  Flex,
  VStack,
  Text,
  Link,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { Portal } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { ChakraProvider } from "@chakra-ui/react";
import { CgMoreO } from "react-icons/cg";
const UserHeader = () => {
  //Toast
  const toast = useToast();
  //Copy Link Function
  const copyURL = () => {
    const connectionURL = window.location.href;
    navigator.clipboard.writeText(connectionURL).then(() => {
      toast({ description: "Copied" });
    });
    console.log(window);
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Arghya Guha
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>itsArghya69</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.700"}
              color={"white"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="Arghya Guha" src="/Avatar.jpg" size={{
            base:"md",
            md:"2xl",
          }} />
        </Box>
      </Flex>
      <Text>Free soul in the pursuit of Peace</Text>
      <Flex width={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>1K followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
                  <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex gap={4}>
          <Box>
            <BsInstagram size={24} cursor={"pointer"} />
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
          <Text>Threads</Text>
        </Flex>
              <Flex flex={1} borderBottom={"1.5px solid gray"} color={"gray.light"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                  <Text>Replies</Text>
              </Flex>
       
      </Flex>
    </VStack>
  );
};

export default UserHeader;
