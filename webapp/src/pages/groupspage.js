import Nav from "../../components/nav";
import Card from "../../components/card";
import GetCard from "../../components/groupcard";
import PayBack from "../../components/paymodal";
import AddMember from "../../components/addmember";
import { Flex, Text, Stack, Divider, HStack, Box, VStack, Button, useDisclosure, Spacer } from "@chakra-ui/react";
import GroupCard from "../../components/groupcard";
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
      <Flex gap={"20px"}>
      <GroupCard/>
      <GroupCard/>
      <GroupCard/>
      </Flex>
      
    </Flex>
  );
}
