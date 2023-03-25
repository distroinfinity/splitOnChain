import Nav from "../../components/nav";
import Card from "../../components/card";
import GetCard from "../../components/getcard";
import PayBack from "../../components/paymodal";
import AddMember from "../../components/addmember";
import { Flex, Text, Stack, Divider, HStack, Box, VStack, Button, useDisclosure } from "@chakra-ui/react";
export default function problems() {
  
  return (
    <Flex
      className="font"
      minH={"100vh"}
      background={"#181818"}
      flexDir={"column"}
      color={"white"}
      cursor={"default"}
    >
      <Nav />
      <HStack direction='row' h='500px' p={4} spacing='24px'>
      <VStack w='300px' direction="column" spacing='24px'>
        <Text textDecor={"underline"}>Members</Text>
        <Text>Apoorva</Text>
        <Text>Hash</Text>
        <Text>Charu</Text>
        <AddMember/>
      </VStack>
      <Divider orientation='vertical' />
      <Flex
        gap={"20px"}
        flexDir={"column"}
        marginTop={"60px"}
        marginBottom={"60px"}
        align={"center"}
        w='650'
      >
        <Text fontSize={"35px"}>DUES</Text>
        <Text fontSize={"20px"}>You owe: 0.09ETH</Text>
        <Text fontSize={"20px"}>You're owed: 0.06ETH</Text>
        <Button>Add Due</Button>
        <Button>Settle up!</Button>
        <Card solved={"true"}/>
        <GetCard solved={"false"}/>
      </Flex>
      <Divider orientation='vertical' />
      <Flex w='300px'></Flex>
      </HStack>
    </Flex>
  );
}
