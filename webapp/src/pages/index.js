import { Flex, Text, Button, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function index() {
  return (
    <Flex
      className="font"
      background={"#181818"}
      flexDir={"column"}
      color={"white"}
      cursor={"default"}
    >
      <Flex h={"100vh"} gap={"76px"} flexDir={"column"} overflowY={"hidden"}>
        <Flex
          marginTop={"113px"}
          flexDir={"column"}
          align={"center"}
          gap={"28.72px"}
        >
          <Flex gap={"16px"} flexDir={"column"} align={"center"}>
            <Text fontSize={"34px"} fontWeight={"bold"}>
              SPLITONCHAIN
            </Text>
            <Text
              className="sub"
              fontSize={"20px"}
              fontWeight={"normal"}
              w={"1000px"}
              textAlign={"center"}
              opacity={"85%"}
            >
              a project built for ETHGlobal's{" "}
              <a
                href={"https://ethglobal.com/events/scaling2023/"}
                target={"_blank"}
                rel={"noreferrer"}
                style={{ textDecoration: "underline" }}
              >
                Scaling Ethereum Hackathon
              </a>{" "}
              to decentralise the famous Splitwise
            </Text>
          </Flex>
          <Flex gap={"20.35px"}>
            <Link href={"./problems"}>
              <Button
                height={"47px"}
                paddingRight={"25px"}
                paddingLeft={"25px"}
                rounded={"4px"}
                bg={"#528D51"}
                fontSize={"20px"}
                fontWeight={"normal"}
                _hover={{
                  background: "#497E48",
                  boxShadow: "0px 1px 12px rgba(255,255,255,0.05)",
                }}
                _active={{}}
              >
                Make a new group
              </Button>
            </Link>
            <Button
              height={"47px"}
              paddingRight={"25px"}
              paddingLeft={"25px"}
              rounded={"4px"}
              bg={"rgba(255, 255, 255, 0.04)"}
              border={"1px solid rgba(255, 255, 255, 0.1)"}
              fontSize={"20px"}
              fontWeight={"normal"}
              _hover={{
                background: "rgba(255, 255, 255, 0.02)",
                boxShadow: "0px 1px 12px rgba(255,255,255,0.05)",
              }}
              _active={{}}
            >
              Signup/Login
            </Button>
          </Flex>
        </Flex>

        {/* <Flex justify={"center"} userSelect={"none"}>
          <Image src={"hero.svg"} alt={"hero"} />
        </Flex> */}
      </Flex>
    </Flex>
  );
}
