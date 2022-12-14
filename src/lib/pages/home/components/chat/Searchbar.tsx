// Libraries
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
// Components
// Services
// Hooks
// Interfaces
// Utils

const Searchbar = () => {
  return (
    <InputGroup mb={3} textAlign="center">
      <InputLeftElement
        className="InputLeft"
        pointerEvents="none"
        height="100%"
        children={<FaSearch className="SearchIcon" color="gray" />}
      />
      <Input
        className="Input"
        variant="filled"
        size="lg"
        boxShadow="md"
        placeholder="Search Friends"
        rounded="full"
        _focus={{ boxShadow: "none" }}
        fontSize="sm"
      />
    </InputGroup>
  );
};

export default Searchbar;
