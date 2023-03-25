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
  } from '@chakra-ui/react'

  export default function AddMember() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    // const initialRef = React.useRef(null)
    // const finalRef = React.useRef(null)
  
    return (
      <>
        <Button onClick={onOpen}>Add Member</Button>
    
  
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add another member to the group</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Wallet Address</FormLabel>
                <Input placeholder='' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button mr={3}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }