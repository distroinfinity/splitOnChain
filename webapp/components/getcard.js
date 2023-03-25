import { Flex, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function GetCard({ solved, tag, title }) {
  return (
    <motion.div
      initial={{ opacity: "0" }}
      animate={{ opacity: "100%" }}
      transition={{ duration: "0.2", type: "linear" }}
    >
      <Flex
        h={"66px"}
        w={"700px"}
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
        opacity={solved == "true" ? "100%" : "60%"}
      >
        <Flex
          marginLeft={"30px"}
          marginRight={"30px"}
          w={"600px"}
          gap={"30px"}
          fontSize={"18px"}
          align={"center"}
        >
          <Text>You lent 0.06ETH to Charu for PARASAILING</Text>
          <Button>REMIND TO PAY</Button>
        </Flex>
      </Flex>
    </motion.div>
  );
}
