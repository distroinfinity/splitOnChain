import { Flex, Text, Button, Image } from "@chakra-ui/react";
import Link from "next/link";
import { Auth } from "@polybase/auth";
import { useEffect, useState } from "react";
import { Polybase } from "@polybase/client";

const auth = typeof window !== "undefined" ? new Auth() : null;

const db = new Polybase({
  defaultNamespace:
    "pk/0xf699df4b2989f26513d93e14fd6e0befd620460546f3706a4e35b10ac3838457a031504254ddac46f6519fcf548ec892cc33043ce74c5fa9018ef5948a685e1d/splitonchain",
});

export default function () {
  const [signedIn, setSignIn] = useState(false);
  const [user, setUser] = useState(null);

  async function getPublicKey() {
    const msg = "Login with Chat";
    const sig = await auth.ethPersonalSign(msg);
    const publicKey = ethPersonalSignRecoverPublicKey(sig, msg);
    return "0x" + publicKey.slice(4);
  }

  async function signIn() {
    const authState = await auth.signIn({ force: true });
    console.log("signed in", authState);
    // get public
    let publicKey = authState.userId;

    if (!publicKey) {
      publicKey = await getPublicKey();
    }

    // Create user if not exists
    let user;
    try {
      user = await db.collection("User").record(publicKey).get();
      console.log("User Already exists");
    } catch (e) {
      // .create() accepts two params, address and name of user
      // populate these dynamically with address and name of user
      user = await db.collection("User").create([publicKey, "TestName - Yash"]);
      console.log("New User created");
    }

    console.log("user is ", user.data);
    setUser(user.data);
    setSignIn(true);
    return;
  }

  async function signOut() {
    const authState = await auth.signOut();
    console.log("singed out", authState);
    setSignIn(false);
    setUser(null);
  }

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
            <Text
              className="sub"
              fontSize={"20px"}
              fontWeight={"normal"}
              w={"1000px"}
              textAlign={"center"}
              opacity={"85%"}
            >
              gm, {user?.id}
            </Text>
          </Flex>
          <Flex gap={"20.35px"}>
            {signedIn == true ? (
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
            ) : (
              ""
            )}

            {signedIn == false ? (
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
                onClick={signIn}
              >
                SignIn
              </Button>
            ) : (
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
                onClick={signOut}
              >
                SignOut
              </Button>
            )}
          </Flex>
        </Flex>

        {/* <Flex justify={"center"} userSelect={"none"}>
          <Image src={"hero.svg"} alt={"hero"} />
        </Flex> */}
      </Flex>
    </Flex>
  );
}
