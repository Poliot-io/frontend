import { v4 as uuidv4 } from "uuid";
import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "lib/@feathers/utils";

interface LinkItemProps {
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { icon: FiHome },
  { icon: FiTrendingUp },
  { icon: FiCompass },
  { icon: FiStar },
  { icon: FiSettings },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      h="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      transition="0.5s ease-out"
      overflow="auto"
    >
      <SidebarContent onClose={() => onClose} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 20 }} px="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <Flex
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 20 }}
      direction="column"
      justifyContent="space-between"
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex gap={4} wrap="wrap">
        <Flex h="20" alignItems="center" mx="8">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            L
          </Text>
        </Flex>
        <Box>
          {LinkItems.map((link) => (
            <NavItem key={uuidv4()} icon={link.icon} />
          ))}
        </Box>
      </Flex>
      <IconButton
        aria-label="Sign Out"
        icon={<FaSignOutAlt />}
        size="lg"
        variant="ghost"
        colorScheme="cyan"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      />
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
}
const NavItem = ({ icon, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
      </Flex>
    </Link>
  );
};
