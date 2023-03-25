import { Flex, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace:
    "pk/0xf699df4b2989f26513d93e14fd6e0befd620460546f3706a4e35b10ac3838457a031504254ddac46f6519fcf548ec892cc33043ce74c5fa9018ef5948a685e1d/splitonchain",
});

export default function GroupCard({ solved, tag, title, groupId }) {
  const [group, setGroup] = useState(null);

  async function loadGroup() {
    const group = await db.collection("Group").record(groupId).get();
    // console.log("group fetched", group.data);
    setGroup(group.data);
  }

  useEffect(() => {
    loadGroup();
  }, []);

  return (
    <motion.div
      initial={{ opacity: "0" }}
      animate={{ opacity: "100%" }}
      transition={{ duration: "0.2", type: "linear" }}
    >
      <Flex
        h={"250px"}
        w={"400px"}
        gap={"20px"}
        marginTop={"20px"}
        marginLeft={"20px"}
        marginRight={"20px"}
        background={
          solved == "true"
            ? "rgba(255, 255, 255, 0.04)"
            : "rgba(255, 255, 255, 0.03)"
        }
        border={
          solved == "true"
            ? "1px solid rgba(255, 255, 255, 0.2)"
            : "1px solid rgba(255, 255, 255, 0.1)"
        }
        borderRadius={"7px"}
        borderWidth={"3px"}
        opacity={solved == "true" ? "100%" : "60%"}
        alignItems={"center"}
      >
        <Flex
          marginLeft={"30px"}
          marginRight={"30px"}
          borderRadius={"10px"}
          padding={"10px"}
          w={"1440px"}
          gap={"30px"}
          fontSize={"25px"}
          align={"center"}
          flexDir={"column"}
        >
          <Link href={`./groups/${group?.id}`}>
            <Flex flexDir={"column"}>
              <Flex>
                <Text fontWeight={"bold"}>{group?.name}</Text>
              </Flex>
              <Flex>
                <Text>You owe: 0.09ETH</Text>
              </Flex>
              <Flex>
                <Text>You're owed: 0.06ETH!</Text>
              </Flex>
              {/* <Button>PAY BACK</Button> */}
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </motion.div>
  );
}
