import { Box } from "@chakra-ui/react";

const SectionContainer = ({ children, ...rest }: any) => {
  return (
    <Box as="section" bg="" h="full" px={6} pt={6} pb={0} {...rest}>
      {children}
    </Box>
  );
};

export default SectionContainer;
