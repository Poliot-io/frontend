// Libraries
import {
  Box,
  Flex,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
// Components
import MessageBubble from "./chat/MessageBubble";
// Services

// Hooks

// Interfaces
import { MessageProps } from "../interfaces";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
// Utils

const GlobalChat = ({
  messages,
  containerRef,
  elementRef,
  scrollTo,
}: {
  messages: MessageProps[];
  containerRef: any;
  elementRef: any;
  scrollTo: any;
}) => {
  const [showScrollDown, setShowScrollDown] = useState<boolean>(false);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
    isBottom ? setShowScrollDown(false) : setShowScrollDown(true);
  };

  return (
    <>
      <Stat>
        <StatLabel>Chat with</StatLabel>
        <StatNumber>Everyone</StatNumber>
      </Stat>
      <Box
        h="680px"
        overflow="scroll"
        position="relative"
        mt={2}
        ref={containerRef}
        onScroll={handleScroll}
        style={{ scrollbarWidth: "thin" }}
      >
        <Flex direction="column" h="full" pr="80px" pt={3} position="relative">
          {messages.map((message: MessageProps) => {
            return <MessageBubble key={uuidv4()} message={message} />;
          })}
          <Box h="0px" as="span" ref={elementRef} />
        </Flex>
        {showScrollDown && (
          <IconButton
            position="fixed"
            bottom="90px"
            right="60px"
            aria-label="Scroll to bottom"
            icon={<ChevronDownIcon fontSize="24px" borderRadius="3xl" />}
            onClick={() => scrollTo()}
            colorScheme="blue"
          />
        )}
      </Box>
    </>
  );
};

export default GlobalChat;
