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
  Checkbox,
  CheckboxGroup,
  Select,
  Stack,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace:
    "pk/0xf699df4b2989f26513d93e14fd6e0befd620460546f3706a4e35b10ac3838457a031504254ddac46f6519fcf548ec892cc33043ce74c5fa9018ef5948a685e1d/splitonchain",
});

export default function AddDue({ group }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log("group details in add expensee modal", group);
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState(0);
  const [options, setOptions] = useState([]);
  const [paidBy, setPaidBy] = useState("");

  // const initialRef = React.useRef(null)
  // const finalRef = React.useRef(null)
  const handleOptionChange = (option) => {
    if (options.includes(option)) {
      setOptions(options.filter((o) => o !== option));
    } else {
      setOptions([...options, option]);
    }
  };

  async function addEntry() {
    if (!group?.id) {
      console.log("no group id found");
      return;
    }

    // create a new Entry
    let entry;
    let randomid = Math.random().toString(36).substring(7);
    entry = await db
      .collection("Entry")
      .create([randomid, paidBy, options, parseInt(value), desc, 0, group.id]);

    console.log("Entry created", entry);

    let groupId = entry.data.groupId;

    // add entryId to Group Table
    const recordData = await db
      .collection("Group")
      .record(
        groupId // id of entry to be updated
      )
      .call("addEntry", [randomid]); // hardcoded group id

    console.log("added entry to group table", recordData);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ value, desc, paidBy, options });
    await addEntry();
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
        ADD EXPENSE
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box as="form" onSubmit={handleSubmit}>
            <ModalHeader>Add a Expense</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Select Members to Split</FormLabel>
                <CheckboxGroup
                  colorScheme="green"
                  defaultValue={["naruto", "kakashi"]}
                >
                  <Stack spacing={[1, 5]} direction={["row", "column"]}>
                    {group?.members?.map((member, index) => {
                      return (
                        // <Checkbox value="hash"
                        <Checkbox
                          isChecked={options.includes(member)}
                          onChange={() => handleOptionChange(member)}
                        >
                          {member}
                        </Checkbox>
                      );
                    })}
                    {/* <Checkbox value="charu">Charu</Checkbox>
                  <Checkbox value="apoorva">Apoorva</Checkbox> */}
                  </Stack>
                </CheckboxGroup>
              </FormControl>
              <br></br>
              <br></br>
              <FormControl>
                <FormLabel>Value(USD)</FormLabel>
                <Input
                  type="number"
                  placeholder=""
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  placeholder=""
                  value={desc}
                  onChange={(event) => setDesc(event.target.value)}
                />
              </FormControl>
              <FormControl id="select">
                <FormLabel>Paid By</FormLabel>
                <Select
                  placeholder="Select a member"
                  value={paidBy}
                  onChange={(event) => setPaidBy(event.target.value)}
                >
                  {group?.members?.map((member, index) => {
                    return (
                      // <Checkbox value="hash"
                      <option value={member}>{member}</option>
                    );
                  })}
                  {/* <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option> */}
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              {/* console.log({ value, desc, paidBy, options }); */}
              <Button
                type="submit"
                mr={3}
                isDisabled={
                  !(
                    value != 0 &&
                    desc.length != 0 &&
                    paidBy != null &&
                    options.length != 0
                  )
                }
              >
                Add Expense!
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
