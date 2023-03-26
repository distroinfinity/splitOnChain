import Nav from "./../../../components/nav";
import Card from "./../../../components/card";
import GetCard from "./../../../components/getcard";
import DoneCard from "./../../../components/donecard";
import PayBack from "./../../../components/paymodal";
import AddMember from "./../../../components/addmember";
import { Polybase } from "@polybase/client";
import { useRouter } from "next/router";
import AddDue from "../../../components/addduemodal";
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

import { EmbedSDK } from "@pushprotocol/uiembed";

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

const PK = "bb135cbe9c7af0c586dc9e3388c6c7aaa2f636dbb15cbe01d12be23bc9384c24";
const Pkey = `0x${PK}`;

const db = new Polybase({
  defaultNamespace:
    "pk/0xf699df4b2989f26513d93e14fd6e0befd620460546f3706a4e35b10ac3838457a031504254ddac46f6519fcf548ec892cc33043ce74c5fa9018ef5948a685e1d/splitonchain",
});

export default function problems() {
  let router = useRouter();

  const [id, setId] = useState(null);
  const [group, setGroup] = useState(null);
  const [entries, setEntries] = useState([]);

  const sendNotification = async () => {
    const _signer = new ethers.Wallet(Pkey);
    console.log("signer", _signer);
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer: _signer,
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
          title: `[SDK-TEST] notification TITLE:`,
          body: `[sdk-test] notification BODY`,
        },
        payload: {
          title: `[sdk-test] payload title`,
          body: `sample msg body`,
          cta: "",
          img: "",
        },
        channel: "eip155:5:0x20A8f7eee66bE17110845413Bac91Fa66e0A8DA8", // your channel address
        env: "staging",
      });
      console.log("notification sent", apiResponse);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

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
  async function loadNotifications() {
    const notifications = await PushAPI.user.getFeeds({
      user: "eip155:5:0x20A8f7eee66bE17110845413Bac91Fa66e0A8DA8", // user address in CAIP
      env: "staging",
    });
    console.log("fetched notifications", notifications);
  }

  useEffect(() => {
    loadGroup();
    loadNotifications();
  }, []);
  useEffect(() => {
    // if (account) { // 'your connected wallet address'
    EmbedSDK.init({
      headerText: "Recent Activity", // optional
      targetID: "sdk-trigger-id", // mandatory
      appName: "consumerApp", // mandatory
      user: "0x20A8f7eee66bE17110845413Bac91Fa66e0A8DA8", // mandatory
      chainId: 1, // mandatory
      viewOptions: {
        type: "sidebar", // optional [default: 'sidebar', 'modal']
        showUnreadIndicator: true, // optional
        unreadIndicatorColor: "#cc1919",
        unreadIndicatorPosition: "bottom-right",
      },
      theme: "light",
      onOpen: () => {
        console.log("-> client dApp onOpen callback");
      },
      onClose: () => {
        console.log("-> client dApp onClose callback");
      },
    });
    // }

    return () => {
      EmbedSDK.cleanup();
    };
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
        <VStack w="400px" direction="column" spacing="24px">
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
        <Flex
          gap={"20px"}
          flexDir={"column"}
          marginTop={"10px"}
          marginBottom={"60px"}
          align={"top"}
          w="300px"
        >
          {/* <Button onClick={sendNotification}> Send Notification</Button> */}
          <button id="sdk-trigger-id">trigger button</button>
        </Flex>
      </HStack>
    </Flex>
  );
}
