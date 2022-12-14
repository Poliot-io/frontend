// Libraries
import { Box, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
// Components
import MessageBubble from "./chat/MessageBubble";
// Services

// Hooks

// Interfaces
import { MessageProps } from "../interfaces";
// Utils

const GlobalChat = ({ messages }: { messages: MessageProps[] }) => {
  return (
    <>
      <Stat>
        <StatLabel>Chat with</StatLabel>
        <StatNumber>Everyone</StatNumber>
      </Stat>
      <Box maxH="680px" overflowY="auto" mt={2}>
        <Flex direction="column" h="full" pr={6} pt={3}>
          {messages.map((message: MessageProps) => {
            return <MessageBubble key={uuidv4()} message={message} />;
          })}
          <Box h="0px" as="span" id="chat" />
        </Flex>
      </Box>
    </>
  );
};

export default GlobalChat;
