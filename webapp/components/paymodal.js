import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function PayBack({ group }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [usdValue, setUsdValue] = useState(0);
  const [ethValue, setEthValue] = useState(0);
  const [ethPrice, setEthPrice] = useState(null);
  const [payTo, setPayTo] = useState("");

  // const initialRef = React.useRef(null)
  // const finalRef = React.useRef(null)

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.usd));
  }, []);

  const handleUsdChange = (event) => {
    const usd = event.target.value;
    setUsdValue(usd);
    if (ethPrice) {
      const eth = usd / ethPrice;
      setEthValue(eth);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
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
        fontSize={"21px"}
        fontWeight={"medium"}
      >
        PAY BACK
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Paying Hash 0.09ETH Back</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="select">
              <FormLabel>Whom to pay</FormLabel>
              <Select
                placeholder="Select a member"
                value={payTo}
                onChange={(event) => setPayTo(event.target.value)}
              >
                {group?.members?.map((member, index) => {
                  return <option value={member}>{member}</option>;
                })}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount in USD </FormLabel>
              <Input
                placeholder="Enter USD to transfer"
                type="number"
                value={usdValue}
                onChange={handleUsdChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Euivalent Eth </FormLabel>
              <Input value={ethValue} isDisabled={true} />
              <br></br>
              <Text>{ethPrice && <Text>1 ETH = ${ethPrice}</Text>}</Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3}>Pay</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
