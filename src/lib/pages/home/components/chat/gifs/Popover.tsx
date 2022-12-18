import { useRef } from "react";
import {
  useDisclosure,
  PopoverTrigger,
  PopoverContent,
  Popover,
  IconButton,
  PopoverArrow,
  PopoverCloseButton,
  Grid,
  Box,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { getUserIdFromJWT } from "lib/pages/home/utils";
import chatService from "lib/pages/home/services/chat.service";
import useGiphy from "lib/pages/home/hooks/useGiphy";
import useInfiniteScroll from "react-infinite-scroll-hook";

const GifPopover = ({ chatId }: any) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);

  const { error, fetchNextPage, loading, hasNextPage, gifs, data } = useGiphy();
  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: !!error,
    rootMargin: "0px 0px 50px 0px",
  });

  const handleGifClick = async (gif: any) => {
    const userId = getUserIdFromJWT();
    let message: any = {};

    message.userId = userId;
    message.text = gif.images.fixed_height.url;

    await chatService.addMessage(chatId, message);
    onClose();
  };

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur={true}
      placement="top-start"
    >
      <PopoverTrigger>
        <IconButton
          aria-label="three dots"
          icon={<FaEllipsisV />}
          variant="ghost"
          colorScheme="blue"
          size="md"
          ml={2}
        />
      </PopoverTrigger>
      <PopoverContent px={6} pt={9} pb={6} w="400px">
        <PopoverArrow />
        <PopoverCloseButton />
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={6}
          h="400px"
          w="100%"
          overflowY="auto"
          pt={3}
          pr={6}
          ref={rootRef}
        >
          {data.map((gif: any) => (
            <Box
              key={uuidv4()}
              cursor="pointer"
              onClick={() => handleGifClick(gif)}
            >
              <Image src={gif.images.fixed_height.url} alt={gif.title} />
            </Box>
          ))}
          {(loading || hasNextPage) && (
            <Box ref={sentryRef} w="100%">
              <Spinner />
            </Box>
          )}
        </Grid>
      </PopoverContent>
    </Popover>
  );
};

export default GifPopover;
