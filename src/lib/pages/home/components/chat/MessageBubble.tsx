// Libraries
import { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
// Components

// Services
import userService from "../../services/user.service";

// Hooks

// Interfaces
import { MessageProps } from "../../interfaces";

// Utils
import { itsMyDoc, parseDate } from "../../utils";

const MessageBubble = ({ message }: { message: MessageProps }) => {
  const [username, setUsername] = useState<any>(null);
  const { text, createdAt, userId } = message;

  useEffect(() => {
    (async () => {
      const { nickname } = await userService.service.get(userId);
      setUsername(nickname);
    })();
  }, []);

  const isMe = itsMyDoc(userId);

  return (
    <Flex direction="column">
      <Box
        p={4}
        borderRadius={isMe ? "20px 20px 0 20px" : "20px 20px 20px 0"}
        alignSelf={isMe ? "flex-end" : "flex-start"}
        bg={isMe ? "#f7f7f7" : "#ebecf5"}
        shadow="md"
        mb={4}
        maxW="300px"
      >
        <Text>{text}</Text>
      </Box>
      <Text
        fontSize="xs"
        color="gray.500"
        textAlign="right"
        alignSelf={isMe ? "flex-end" : "flex-start"}
      >
        {!isMe && username + " - "}
        {parseDate(createdAt)}
      </Text>
    </Flex>
  );
};

export default MessageBubble;
