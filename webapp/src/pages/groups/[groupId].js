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
  const [entries, setEntries] = useState([]);

  async function loadGroup() {
    console.log("groupId passed as quer", router.query.groupId);
    const id = router.query.groupId;
    if (!id) return;
    setId(id);
    const group = await db.collection("Group").record(id).get();
    console.log("group fetched", group.data);
    let temp = [];
    for (let i = 0; i < group.data.entries.length; i++) {
      const entry = await db
        .collection("Entry")
        .record(group.data.entries[i])
        .get();
      console.log(i, entry.data);
      temp.push(entry.data);
    }
    setGroup(group.data);
    setEntries(temp);
  }

  async function getEntry(id) {
    const entry = await db.collection("Entry").record(id).get();
    // console.log("group fetched", group.data);
    return entry;
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
          <Text fontSize={"20px"}>
            You owe: 10 USD to 0x20A8f7eee66bE17110845413Bac91Fa66e0A8DA8
          </Text>
          <Text fontSize={"20px"}>You're owed: 0 USD</Text>
          <Flex flexDir={"row"}>
            <AddDue group={group} />
            <PayBack group={group} />
          </Flex>
          <Text fontSize={"25px"}>All Activity</Text>
          {entries.map((entry, index) => {
            if (entry.type == 0) {
              return <Card key={index} solved={"true"} entry={entry} />;
            } else {
              <DoneCard solved={"true"} />;
            }
          })}

          {/* <GetCard solved={"true"} /> */}
        </Flex>
        <Divider orientation="vertical" />
        <Flex w="300px"></Flex>
      </HStack>
    </Flex>
  );
}
