// Libraries
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
// Components

// Services

// Hooks

// Interfaces

// Utils

const ChatItem = () => {
  return (
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
        <Avatar
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size="md"
          mr={4}
        />
        <Box>
          <Text fontWeight="bold" fontSize="xs">
            Dan Abrahmov
          </Text>
          <Text fontWeight="regular" fontSize="xs">
            Last message
          </Text>
        </Box>
        {/* Timestamp */}
        <Text fontSize="xs" color="gray.500" ml={4}>
          12:00
        </Text>
      </Flex>
    </Flex>
  );
};

export default ChatItem;
