import { Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PayBack from "./paymodal";

export default function Card({ solved, entry, tag, title }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("entry object ");
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
          <Text>
            {entry.paidBy} spent {entry.value} USD for {entry.description}
          </Text>
        </Flex>
      </Flex>
    </motion.div>
  );
}
