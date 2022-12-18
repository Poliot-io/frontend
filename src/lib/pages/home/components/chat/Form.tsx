// Libraries
import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Input,
  keyframes,
} from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
// Components
import GifPopover from "./gifs/Popover";
// Services
import chatService from "../../services/chat.service";
// Hooks

// Interfaces

// Utils
import { getUserIdFromJWT } from "../../utils";

const bounceAnimationKeyframe = keyframes`
	0% {}
	25% {transform: translateX(5px);}
	50% {transform: translateX(0px);}
	75% {transform: translateX(-5px);}
	100% {}
`;
const animation = `${bounceAnimationKeyframe} .5s ease-in-out`;

const Form = ({ chatId, profilePic }: any) => {
  return (
    <Formik
      initialValues={{
        text: "",
      }}
      validate={(values) => {
        const errors: any = {};
        if (!values.text) {
          errors.message = "Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setValues, setTouched }) => {
        const userId = getUserIdFromJWT();
        let message: any = {};

        message.userId = userId;
        message.text = values.text;

        await chatService.addMessage(chatId, message);

        setValues({ text: "" });
        setTouched({ text: false });
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, handleSubmit, errors, touched }: any) => (
        <Box position="absolute" bottom="20px" left="0" right="0">
          <form onSubmit={handleSubmit}>
            <HStack spacing={4} w="full">
              <Avatar size="md" src={profilePic} />
              <Box w="full" as={motion.div} animation={animation}>
                <Field
                  type="text"
                  name="text"
                  as={Input}
                  placeholder="Type a message"
                  borderColor={
                    errors.message && touched.message ? "red.500" : "blue.500"
                  }
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #90cdf4",
                  }}
                  _hover={{
                    borderColor: "blue.500",
                  }}
                />
              </Box>
              <GifPopover chatId={chatId} />
              <IconButton
                aria-label="send fly paper icon"
                icon={<FaPaperPlane />}
                variant="ghost"
                colorScheme="blue"
                size="md"
                ml={2}
                type="submit"
                disabled={isSubmitting}
              />
            </HStack>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default Form;
