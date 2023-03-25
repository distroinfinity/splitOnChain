import Nav from "../../components/nav";
import Card from "../../components/card";
import {
  Flex,
  Text,
  Stack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";

import { User_data } from "@/contexts/userContexts";
import { useContext } from "react";
import { useState, useEffect } from "react";

import { Polybase } from "@polybase/client";
import { useRouter } from "next/router";

const db = new Polybase({
  defaultNamespace:
    "pk/0xf699df4b2989f26513d93e14fd6e0befd620460546f3706a4e35b10ac3838457a031504254ddac46f6519fcf548ec892cc33043ce74c5fa9018ef5948a685e1d/splitonchain",
});

export default function newgroup() {
  const router = useRouter();
  const { user } = useContext(User_data);

  const [groupName, setGroupName] = useState("");

  // const [userId, setUserId] = useState(null);

  // console.log("user through context is ", user);

  const addGroup = async () => {
    console.log("group name", groupName);
    if (!user) {
      console.log("You are not signed in");
      router.push("/");
      return;
    }

    // create a new Group
    let group;
    let randomid = Math.random().toString(36).substring(7);
    group = await db.collection("Group").create([randomid, groupName, user.id]);

    console.log("Group created", group);

    let groupId = group.data.id;

    // add groupId to user table

    const recordData = await db
      .collection("User")
      .record(
        user.id // id of entry to be updated
      )
      .call("addGroup", [groupId]); // hardcoded group id

    console.log("added group to user table", recordData);
    // router.push("./problems");
  };

  const handleInputChange = (event) => {
    setGroupName(event.target.value);
  };

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
      <Flex
        gap={"20px"}
        flexDir={"column"}
        marginTop={"60px"}
        marginBottom={"60px"}
        align={"center"}
      >
        {/* <Text fontSize={"21px"}>Enter how many members in your group</Text>
        <NumberInput>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput> */}
        <Input
          placeholder="Enter a group name"
          size="lg"
          width={"600px"}
          value={groupName}
          onChange={handleInputChange}
        />
        {/* <Text fontSize={"21px"}>Enter their wallet addresses!</Text>
        <Stack spacing={3}>
          <Input
            placeholder="0x1234567890abcdefghij1234567890abcdefghijij1234567890abcdefghij"
            size="lg"
            width={"600px"}
          />
          <Input
            placeholder="0x1234567890abcdefghij1234567890abcdefghijij1234567890abcdefghij"
            size="lg"
          />
          <Input
            placeholder="0x1234567890abcdefghij1234567890abcdefghijij1234567890abcdefghij"
            size="lg"
          />
          <Input
            placeholder="0x1234567890abcdefghij1234567890abcdefghijij1234567890abcdefghij"
            size="lg"
          />
        </Stack> */}
        <Button
          size="md"
          variant="outline"
          onClick={addGroup}
          isDisabled={groupName.length == 0 ? true : false}
        >
          {" "}
          Create Group
        </Button>
      </Flex>
    </Flex>
  );
}
