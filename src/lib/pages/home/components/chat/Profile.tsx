// Libraries
import {
  Box,
  Flex,
  HStack,
  Img,
  Icon,
  Divider,
  Editable,
  EditablePreview,
  Input,
  EditableInput,
  useEditableControls,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

// Components

// Services
import userService from "../../services/user.service";

// Hooks

// Interfaces

// Utils
import { getUserIdFromJWT } from "../../utils";

const Profile = ({
  profile,
}: {
  profile: {
    online: string;
    nickname: string;
    profilePic: string;
    handleChangeNickname: (value: string) => void;
  };
}) => {
  const { online, nickname, handleChangeNickname, profilePic } = profile;

  return (
    <Flex direction="column" alignItems="center" my={3} gap={6}>
      <Box position="relative">
        <Img src={profilePic} borderRadius="full" boxSize="150px" />
        <Box
          position="absolute"
          bottom="0"
          right="20px"
          bg={`${online ? "green" : "red"}.300`}
          w="19px"
          h="19px"
          borderRadius="full"
          border="2px solid white"
        />
      </Box>

      <Editable
        textAlign="center"
        value={nickname}
        fontSize="lg"
        isPreviewFocusable={false}
        onChange={handleChangeNickname}
        onSubmit={(value) => {
          const userId = getUserIdFromJWT();
          const payload = {
            nickname: value,
          };
          userService.service.patch(userId, payload);
        }}
      >
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>

      <HStack spacing={4}>
        <Icon as={FaTwitter} color="gray.500" />
        <Icon as={FaFacebook} color="gray.500" />
        <Icon as={FaLinkedin} color="gray.500" />
      </HStack>

      <Divider maxW="180px" />
    </Flex>
  );
};

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="Send email"
        icon={<CheckIcon />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="Send email"
        icon={<CloseIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="Send email"
        size="sm"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
}

export default Profile;
