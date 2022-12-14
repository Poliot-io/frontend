import { Flex, HStack, Img, Text, VStack } from "@chakra-ui/react";
import { getCurrentDate } from "lib/pages/home/utils";

const Item = () => {
  return (
    <Flex gap={2} w="full">
      <Img
        src="https://source.unsplash.com/random/50x50"
        alt="random image"
        boxSize="50px"
        objectFit="cover"
        borderRadius="md"
      />
      <VStack align="self-start" width="full">
        <Text fontSize="xs" textAlign="start">
          image.jpg
        </Text>
        <HStack width="full">
          <Text fontSize="xs" width="inherit">
            {getCurrentDate()}
          </Text>
          <Text fontSize="xs" width="full" align="end">
            Size: 1.2MB
          </Text>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Item;
