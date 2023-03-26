import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Flex, Text, Spacer, Button } from "@chakra-ui/react";
import { ConnectBtn } from "./custombutton";
import Link from "next/link";
import { BellIcon } from "@chakra-ui/icons";

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { EmbedSDK } from "@pushprotocol/uiembed";

const PK = "bb135cbe9c7af0c586dc9e3388c6c7aaa2f636dbb15cbe01d12be23bc9384c24";
const Pkey = `0x${PK}`;

export default function Nav() {
  const router = useRouter();
  const [header, setHeader] = useState("");

  useEffect(() => {
    const path = router.asPath;
    if (path == "/problems") {
      setHeader("problems");
    } else if (path == "/rankings") {
      setHeader("rankings");
    } else if (path == "/learn") {
      setHeader("learn");
    }
  }, [router.asPath]);

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
      w={"100%"}
      justify={"center"}
      borderBottom={"1px solid rgba(255, 255, 255, 0.2)"}
    >
      <Flex
        h={"97px"}
        w={"1302px"}
        justifyContent={"space-between"}
        align={"center"}
      >
        <Flex
          gap={"20px"}
          align={"center"}
          width={"700px"}
          justifyContent={"space-between"}
        >
          <Link href="./">
            <Text fontSize={"26px"} fontWeight={"bold"} userSelect={"none"}>
              SPLITONCHAIN
            </Text>
          </Link>
          <Flex gap={"20px"} align={"center"}>
            {/* <Link href={"./problems"}>
              <Text
                fontSize={"21px"}
                textDecor={header == "problems" ? "underline" : ""}
              >
                Activity
              </Text>
            </Link> */}
            <Link href={"./groupspage"}>
              <Text
                fontSize={"21px"}
                textDecor={header == "groupspage" ? "underline" : ""}
              >
                Groups
              </Text>
            </Link>
          </Flex>
          <Flex
            gap={"16px"}
            align={"right"}
            width={"100px"}
            paddingLeft={"700px"}
          >
            <Link href={"./newgroup"}>
              <Button
                fontSize={"21px"}
                type="button"
                background={"rgba(255, 255, 255, 0.04)"}
                height={"47px"}
                paddingRight={"20px"}
                paddingLeft={"20px"}
                borderRadius={"4px"}
                border={"1px solid rgba(255, 255, 255, 0.2)"}
                _hover={{
                  background: "rgba(255, 255, 255, 0.02)",
                  boxShadow: "0px 1px 12px rgba(255,255,255,0.05)",
                }}
                _active={{}}
                fontWeight={"medium"}
              >
                New Group
              </Button>
            </Link>
          </Flex>
        </Flex>
        {/* <ConnectBtn /> */}
        <Flex>
          <button id="sdk-trigger-id">
            <BellIcon boxSize={8} borderLeft={"50px"} />
          </button>
        </Flex>
      </Flex>
    </Flex>
  );
}
