import Nav from "../../components/nav";
import Card from "../../components/card";
import {
    Flex,
    Text,
    Stack,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
  } from '@chakra-ui/react'
export default function newgroup() {
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
      <Flex
        gap={"20px"}
        flexDir={"column"}
        marginTop={"60px"}
        marginBottom={"60px"}
        align={"center"}
      >
        <Text fontSize={"21px"}>Enter how many members in your group</Text>
        <NumberInput>
        <NumberInputField />
        <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
        </NumberInputStepper>
        </NumberInput>
        <Text fontSize={"21px"}>Enter their wallet addresses!</Text>
        <Stack spacing={3}>
        <Input placeholder='0x1234567890abcdefghij1234567890abcdefghijij1234567890abcdefghij' size='lg' width={"600px"}/>
        <Input placeholder='0x1234567890abcdefghij1234567890abcdefghijij1234567890abcdefghij' size='lg' />
        <Input placeholder='0x1234567890abcdefghij1234567890abcdefghijij1234567890abcdefghij' size='lg' />
        <Input placeholder='0x1234567890abcdefghij1234567890abcdefghijij1234567890abcdefghij' size='lg' />
        </Stack>
        <Button size="md" variant='outline'>Create Group</Button>
      </Flex>
    </Flex>
  );
}
