import Nav from "../../components/nav";
import Card from "../../components/card";
import GetCard from "../../components/groupcard";
import PayBack from "../../components/paymodal";
import AddMember from "../../components/addmember";
import {
  Flex,
  Text,
  Stack,
  Divider,
  HStack,
  Box,
  VStack,
  Button,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import GroupCard from "../../components/groupcard";

import { User_data } from "@/contexts/userContexts";
import { useContext } from "react";
import { useState, useEffect } from "react";

export default function problems() {
  const { user } = useContext(User_data);
  console.log("user through context in groups page ", user);

  async function loadGroups() {}

  useEffect(() => {
    loadGroups();
  }, []);

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
        {user?.groups?.length == 0 && <Text fontWeight={"bold"} fontSize={"30px"} margin={"50px"}>No groups created yet</Text>}
        {user?.groups.map((group, index) => {
          // console.log(group);
          return <GroupCard key={index} groupId={group} />;
        })}
      </Flex>
    </Flex>
  );
}
