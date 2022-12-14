import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

// interfaces
import { IAuthLoginErrors } from "lib/@auth/interfaces/Auth";

// utils
import { getAuthLoginErrors } from "../../@auth/utils/authUtils";
import { toast } from "react-hot-toast";
import { loginJWT, loginLocal } from "lib/@feathers/utils";

const notify = (message: string) => toast(message);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "patrick@hotmail.com",
    password: "adminadmin",
  });
  const [errorValues, setErrorValues] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });
  const navigate = useNavigate();

  const { email: emailValue, password: passwordValue } = inputValues;
  const { email: emailError, password: passwordError } = errorValues;

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleLogin = async () => {
    const loginErrors: IAuthLoginErrors = getAuthLoginErrors(
      emailValue,
      passwordValue
    );
    setErrorValues(loginErrors);
    if (loginErrors.email.error || loginErrors.password.error) return;

    try {
      const res = await loginJWT(emailValue, passwordValue);

      navigate("/");
    } catch (error: any) {
      notify(error.message);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Ingresa a tu cuenta</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            y disfruta nuestras <Link color={"blue.400"}>funcionalidades</Link>{" "}
            ??????
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl isInvalid={emailError.error} isRequired>
              <FormLabel htmlFor="email">Correo</FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                value={emailValue}
                onChange={handleInputChange}
              />
              {emailError.error && (
                <FormErrorMessage>{emailError.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={passwordError.error} isRequired>
              <FormLabel htmlFor="passowrd">Contrase??a</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={passwordValue}
                  onChange={handleInputChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordError.error && (
                <FormErrorMessage>{passwordError.message}</FormErrorMessage>
              )}
            </FormControl>

            <Stack spacing={10}>
              <Link
                color={"blue.400"}
                as={ReactRouterLink}
                to="/signup"
                textAlign="end"
              >
                Registrate ahora!
              </Link>
              <Button
                aria-label="login button"
                bg={"blue.400"}
                style={{ color: "white" }}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
              >
                Iniciar Sesi??n
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
