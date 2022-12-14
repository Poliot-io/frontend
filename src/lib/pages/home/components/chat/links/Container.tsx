import { Box, Text, VStack } from "@chakra-ui/react";
import Item from "./Item";

const Container = () => {
  return (
    <Box mt={3}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Shared Links
      </Text>
      <VStack spacing={4} maxH="220px" overflowY="auto" pr={6}>
        {...Array(5).fill(<Item />)}
      </VStack>
    </Box>
  );
};

export default Container;
