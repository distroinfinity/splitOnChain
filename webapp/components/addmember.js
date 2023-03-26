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
} from "@chakra-ui/react";
import { Polybase } from "@polybase/client";
import { useState } from "react";
const db = new Polybase({
  defaultNamespace:
    "pk/0xf699df4b2989f26513d93e14fd6e0befd620460546f3706a4e35b10ac3838457a031504254ddac46f6519fcf548ec892cc33043ce74c5fa9018ef5948a685e1d/splitonchain",
});

export default function AddMember({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newMember, setNewMember] = useState("");
  const [added, setAdded] = useState(false);

  const addMember = async () => {
    console.log("group id in add member", id);
    if (!id) return;

    setAdded(false);

    const recordData = await db
      .collection("Group")
      .record(
        id // id of entry to be updated
      )
      .call("addMember", [newMember.toLowerCase()]); // hardcoded group id

    console.log("added member to Group ", id, recordData);

    // if a user-member does not exists create a user end and add group to its db
    let user;
    try {
      user = await db.collection("User").record(newMember.toLowerCase()).get();
      console.log("User Already exists");
    } catch (e) {
      // .create() accepts two params, address and name of user
      // populate these dynamically with address and name of user
      user = await db
        .collection("User")
        .create([publicKey.toLowerCase(), "TestName - Yash"]);
      console.log("New User created");
    }
    console.log("user is ", user);
    user = user.data;

    // group id to new member collection
    const userData = await db
      .collection("User")
      .record(
        user.id // id of entry to be updated
      )
      .call("addGroup", [id]); // hardcoded group id

    console.log("added group to user table", userData);

    setAdded(true);
  };

  // const initialRef = React.useRef(null)
  // const finalRef = React.useRef(null)
  const handleInputChange = (event) => {
    setAdded(false);
    setNewMember(event.target.value);
  };
  return (
    <>
      <Button onClick={onOpen}>Add Member</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add another member to the group</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Wallet Address</FormLabel>
              <Input
                placeholder=""
                value={newMember}
                onChange={handleInputChange}
              />
            </FormControl>

            {added && <Text>Added</Text>}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={addMember}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
