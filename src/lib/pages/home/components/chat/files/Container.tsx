import { Box, Text, VStack } from "@chakra-ui/react";
import FileItem from "././Item";

const Container = () => {
  return (
    <Box>
      <Box overflowY="auto">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Shared Files
        </Text>
        <VStack spacing={4} maxH="220px" overflowY="auto" pr={6}>
          {...Array(5).fill(<FileItem />)}
        </VStack>
      </Box>
    </Box>
  );
};

export default Container;
