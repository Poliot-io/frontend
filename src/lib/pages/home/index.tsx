// Libraries
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  Flex,
  Grid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useScroll } from "react-scroll-hooks";

// Components
import SectionContainer from "./components/SectionContainer";
import ChatForm from "./components/chat/Form";
import ChatContainer from "./components/chat/Container";
import ChatProfile from "./components/chat/Profile";
import Searchbar from "./components/chat/Searchbar";
import FilesContainer from "./components/chat/files/Container";
import LinksContainer from "./components/chat/links/Container";
import GlobalChat from "./components/GlobalChat";

// Services
import userService from "./services/user.service";
import chatService from "./services/chat.service";

// Hooks
import useProfile from "./hooks/useProfile";

// Interfaces
import {
  ChatProps,
  MessageProps,
  PaginableProps,
  ProfileProps,
} from "./interfaces";

// Utils
import { getCurrentDate, getUserIdFromJWT } from "./utils";

import "./index.css";

const Home = () => {
  const containerRef: any = useRef();
  const elementRef: any = useRef();
  const scrollSpeed = 100000;
  const { scrollToElement, scrollToY } = useScroll({
    scrollSpeed,
    containerRef,
  });
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatType, setChatType] = useState<string | null>("global");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [lastMessageDate, setLastMessageDate] = useState<string | null>(null);
  const [users, setUsers] = useState<ProfileProps[]>([]);
  const profile: any = useProfile();

  const scrollTo = () => scrollToElement(elementRef);

  const setStartupUsers = async () => {
    const users: PaginableProps = await userService.find({
      query: {
        _id: {
          $ne: getUserIdFromJWT(),
        },
        online: true,
      },
    });
    setUsers(users.data);
  };

  useEffect(() => {
    setStartupUsers();

    userService.service.on("patched", (_: any) => setStartupUsers());

    chatService.service.on("patched", (chat: ChatProps) => {
      setMessages((_) => chat.messages);
      scrollTo();
    });

    chatService.findByType("global").then((paginable: PaginableProps) => {
      const { total, limit, skip, data } = paginable;
      const chat: ChatProps = data[0];
      setMessages((_) => chat.messages);
      setChatId(chat._id);
      setChatType(chat.type);
      setLastMessageDate(chat.updatedAt);
    });
  }, []);

  return (
    <Grid
      as="main"
      gap={4}
      templateColumns="repeat(4, 1fr)"
      h="100vh"
      overflow="clip"
    >
      <SectionContainer>
        <ChatProfile profile={profile} />
        <OnlineFriends users={users} />
        <ChatContainer lastMessageDate={lastMessageDate} />
      </SectionContainer>

      <SectionContainer
        gridColumn={`span ${chatType === "global" ? 3 : 2}`}
        borderX="1px solid #e2e8f0"
        position="relative"
      >
        <Searchbar />
        <GlobalChat
          messages={messages}
          containerRef={containerRef}
          elementRef={elementRef}
          scrollTo={scrollTo}
        />
        <ChatForm chatId={chatId} />
      </SectionContainer>

      {chatType !== "global" && (
        <SectionContainer>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {getCurrentDate()}
          </Text>
          {/* <Profile /> */}
          <Divider maxW="180px" />
          <FilesContainer />
          <Divider maxW="180px" />
          <LinksContainer />
        </SectionContainer>
      )}
    </Grid>
  );
};

const OnlineFriends = ({ users }: any) => {
  return (
    <Box w="full" overflowX="auto">
      <Text fontWeight="semibold" mb={2}>
        Online Friends
      </Text>
      <Flex direction="column" alignItems="center" my={6} gap={6}>
        <AvatarGroup size="md" max={6}>
          {users.map((user: any) => {
            return (
              <Tooltip key={uuidv4()} label={user.nickname}>
                <Avatar name={user.name} src={user.profilePic} />
              </Tooltip>
            );
          })}
        </AvatarGroup>
        <Divider maxW="180px" />
      </Flex>
    </Box>
  );
};

export default Home;
