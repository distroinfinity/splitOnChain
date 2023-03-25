import Nav from "../../components/nav";
import Card from "../../components/card";
import GetCard from "../../components/getcard";
import DoneCard from "../../components/donecard";
import PayBack from "../../components/paymodal";
import AddMember from "../../components/addmember";
import { Flex, Text, Stack, Divider, HStack, Box, VStack, Button, useDisclosure, Spacer } from "@chakra-ui/react";
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
      <HStack direction='row' h='1000px' p={4} spacing='24px' align={"top"}>
      <VStack w='200px' direction="column" spacing='24px'>
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
        marginTop={"10px"}
        marginBottom={"60px"}
        align={"top"}
        w='650'
      >
        <Text fontSize={"35px"}>DUES</Text>
        <Text fontSize={"20px"}>You owe: 0.09ETH</Text>
        <Text fontSize={"20px"}>You're owed: 0.06ETH</Text>
        <Flex flexDir={"row"}>
        <Button
        type="button"
        background={"rgba(255, 255, 255, 0.04)"}
        height={"47px"}
        margin={"10px"}
        paddingRight={"20px"}
        paddingLeft={"20px"}
        borderRadius={"4px"}
        border={"1px solid rgba(255, 255, 255, 0.2)"}
        _hover={{
          background: "rgba(255, 255, 255, 0.02)",
          boxShadow: "0px 1px 12px rgba(255,255,255,0.05)",
        }}
        _active={{}}
        fontSize={"21px"}
        fontWeight={"medium"}
        >Add Due</Button>
        <Button
        type="button"
        background={"rgba(255, 255, 255, 0.04)"}
        height={"47px"}
        margin={"10px"}
        paddingRight={"20px"}
        paddingLeft={"20px"}
        borderRadius={"4px"}
        border={"1px solid rgba(255, 255, 255, 0.2)"}
        _hover={{
          background: "rgba(255, 255, 255, 0.02)",
          boxShadow: "0px 1px 12px rgba(255,255,255,0.05)",
        }}
        _active={{}}
        fontSize={"21px"}
        fontWeight={"medium"}
        >Settle up!</Button>
        </Flex>
        <Text fontSize={"25px"}>All Activity</Text>
        <Card solved={"true"}/>
        <GetCard solved={"true"}/>
        <DoneCard solved={"true"}/>
      </Flex>
      <Divider orientation='vertical' />
      <Flex w='300px'></Flex>
      </HStack>
    </Flex>
  );
}
