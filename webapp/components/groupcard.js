import { Flex, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GroupCard({ solved, tag, title }) {
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
          <Link href={"./problems"}>
          <Flex flexDir={"column"}>

          <Flex><Text fontWeight= {'bold'}>GOA TRIP!</Text></Flex>
          <Flex><Text>You owe: 0.09ETH</Text></Flex>
          <Flex><Text>You're owed: 0.06ETH!</Text></Flex>
          {/* <Button>PAY BACK</Button> */}
          </Flex>
          </Link>
        </Flex>
      </Flex>
    </motion.div>
  );
}
