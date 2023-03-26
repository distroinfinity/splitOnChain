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
import { ethers } from "ethers";
import axios from "axios";

import { splitAddress } from "./../constants/config";
import Split from "./../constants/artifacts/contracts/Split.sol/Split.json";
// import NFTMarketplace from "./../../public/artifacts/contracts/NFTMarketPlace.sol/NFTMarketplace.json";

export default function PayBack({ group }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [usdAmount, setUsdAmount] = useState("");

  const [ethUsdRate, setEthUsdRate] = useState(null);
  const [ethAmountInWei, setEthAmountInWei] = useState(null);

  const [payTo, setPayTo] = useState("");

  // const initialRef = React.useRef(null)
  // const finalRef = React.useRef(null)
  useEffect(() => {
    async function fetchEthPrice() {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      setEthUsdRate(response.data.ethereum.usd);
    }

    fetchEthPrice();
  }, []);

  useEffect(() => {
    console.log(typeof ethUsdRate, typeof usdAmount);
    if (ethUsdRate && usdAmount) {
      const ethAmount = usdAmount / ethUsdRate;
      console.log("eth amount", ethAmount);
      const ethAmountInWei = ethers.utils.parseEther(ethAmount.toFixed(18));
      setEthAmountInWei(ethAmountInWei);
    }
  }, [ethUsdRate, usdAmount]);

  function handleInputChange(event) {
    console.log("usd selectyed", event.target.value);
    setUsdAmount(event.target.value);
  }

  async function handleTransfer() {
    console.log(" transfering ...., ", payTo, ethAmountInWei.toString());

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const splitContract = new ethers.Contract(splitAddress, Split.abi, signer);

    const split = splitContract.connect(signer);
    // const amountInWei = ethers.utils.parseUnits(
    //   ethAmountInWei.toString() / 1000000000000000000,
    //   "ether"
    // );

    const tx = await split.transferEther(payTo, {
      value: ethAmountInWei,
    });
    await tx.wait();
    console.log(`Successfully transferred ${usdAmount} USD in ETH`);
  }

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
          <ModalHeader>Pay Back</ModalHeader>
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
              <FormLabel>USD Amount: </FormLabel>
              <Input
                placeholder="Enter USD to transfer"
                type="number"
                value={usdAmount}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Euivalent Eth </FormLabel>
              <Input
                value={
                  ethAmountInWei
                    ? ethers.utils.formatEther(ethAmountInWei)
                    : "Loading..."
                }
                isDisabled={true}
              />
              <br></br>
              <Text>ETH Price: {ethUsdRate ? ethUsdRate : "Loading..."}</Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={handleTransfer}
              isDisabled={!(payTo != "" && usdAmount != "")}
            >
              Pay
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
