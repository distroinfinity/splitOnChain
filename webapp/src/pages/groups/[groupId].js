import Nav from "./../../../components/nav";
import Card from "./../../../components/card";
import GetCard from "./../../../components/getcard";
import DoneCard from "./../../../components/donecard";
import PayBack from "./../../../components/paymodal";
import AddMember from "./../../../components/addmember";
import { Polybase } from "@polybase/client";
import { useRouter } from "next/router";
import AddDue from "../../../components/addduemodal";

import { useState } from "react";
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
} from "@chakra-ui/react";
import { useEffect } from "react";

const db = new Polybase({
  defaultNamespace:
    "pk/0xf699df4b2989f26513d93e14fd6e0befd620460546f3706a4e35b10ac3838457a031504254ddac46f6519fcf548ec892cc33043ce74c5fa9018ef5948a685e1d/splitonchain",
});

export default function problems() {
  let router = useRouter();

  const [id, setId] = useState(null);
  const [group, setGroup] = useState(null);

  async function loadGroup() {
    console.log("groupId passed as quer", router.query.groupId);
    const id = router.query.groupId;
    if (!id) return;
    setId(id);
    const group = await db.collection("Group").record(id).get();
    console.log("group fetched", group.data);
    setGroup(group.data);
  }

  useEffect(() => {
    loadGroup();
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
      <HStack direction="row" h="1000px" p={4} spacing="24px" align={"top"}>
        <VStack w="200px" direction="column" spacing="24px">
          <Text textDecor={"underline"}>Members</Text>
          {group?.members?.map((member, index) => {
            return <Text>{member}</Text>;
          })}

          <AddMember id={group?.id} />
        </VStack>
        <Divider orientation="vertical" />
        <Flex
          gap={"20px"}
          flexDir={"column"}
          marginTop={"10px"}
          marginBottom={"60px"}
          align={"top"}
          w="650"
        >
          <Text fontSize={"45px"}>{group?.name}</Text>
          <Text fontSize={"35px"}>DUES</Text>
          <Text fontSize={"20px"}>You owe: 0.09ETH</Text>
          <Text fontSize={"20px"}>You're owed: 0.06ETH</Text>
          <Flex flexDir={"row"}>
            {/* <Button
              // onClick={addEntry}
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
            >
              Add Expense
            </Button> */}
            <AddDue group={group} />
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
            >
              Settle up!
            </Button>
          </Flex>
          <Text fontSize={"25px"}>All Activity</Text>
          <Card solved={"true"} />
          <GetCard solved={"true"} />
          <DoneCard solved={"true"} />
        </Flex>
        <Divider orientation="vertical" />
        <Flex w="300px"></Flex>
      </HStack>
    </Flex>
  );
}
