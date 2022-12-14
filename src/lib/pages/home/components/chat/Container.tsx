// Libraries
import {
  Avatar,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
// Components

// Services

// Hooks

// Interfaces

// Utils
import { parseDate } from "../../utils";

const Container = ({ lastMessageDate }: any) => {
  return (
    <Box>
      <Text fontWeight="semibold" mb={2}>
        Chats
      </Text>
      <InputGroup mb={6} textAlign="center">
        <InputLeftElement
          className="InputLeft"
          pointerEvents="none"
          children={<FaSearch className="SearchIcon" color="gray" />}
        />
        <Input
          className="Input"
          variant="filled"
          size="md"
          boxShadow="lg"
          placeholder="Search Chat"
          rounded="full"
          _focus={{ boxShadow: "none" }}
          fontSize="sm"
          maxW="250px"
        />
      </InputGroup>
      <VStack overflowY="auto" maxH="300px" spacing={4} w="full">
        <Flex
          alignItems="center"
          alignSelf="flex-start"
          justifyContent="space-between"
          py={4}
          borderRadius="md"
          _hover={{ bg: "blackAlpha.200" }}
          transition="all 0.5s"
          cursor="pointer"
          w="full"
          pr={6}
        >
          <Flex alignItems="center" gap={2}>
            <Avatar name="Global Chat" size="md" mr={4} />
            <Box>
              <Text fontWeight="bold" fontSize="xs">
                Global chat
              </Text>
              <Text fontWeight="regular" fontSize="xs">
                Last message
              </Text>
            </Box>
            <Text fontSize="xs" color="gray.500" ml={4}>
              {parseDate(lastMessageDate)}
            </Text>
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Container;
