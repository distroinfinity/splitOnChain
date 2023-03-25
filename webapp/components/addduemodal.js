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
  } from '@chakra-ui/react'

  export default function AddDue() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    // const initialRef = React.useRef(null)
    // const finalRef = React.useRef(null)
  
    return (
      <>
        <Button onClick={onOpen}
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
        >ADD DUE</Button>
    
  
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a Due</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
            <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
              <Stack spacing={[1, 5]} direction={['row', 'column']}>
                <Checkbox value='hash'>Hash</Checkbox>
                <Checkbox value='charu'>Charu</Checkbox>
                <Checkbox value='apoorva'>Apoorva</Checkbox>
              </Stack>
            </CheckboxGroup>
            </FormControl>

              <FormControl>
                <FormLabel>Value</FormLabel>
                <Input placeholder='' />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input placeholder='' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button mr={3}>
                Add Due!
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }