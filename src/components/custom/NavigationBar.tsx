import { Button, HStack, Image } from "@chakra-ui/react";
import { Avatar } from "@components/ui/avatar";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from "@components/ui/popover";
import { ColorModeButton } from "@components/ui/color-mode";
import { useNavigate } from "react-router-dom";

export const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <HStack display="flex" justifyContent="space-between">
      <HStack spaceX={0}>
        <Image
          src="/src/assets/controller_logo.png"
          width={10}
          height="auto"
          paddingRight={3}
        />
        <Button variant="ghost" paddingX={3} onClick={() => navigate("/")}>
          Home
        </Button>
        <Button variant="ghost" paddingX={3} disabled>
          My Favorites
        </Button>
        <Button variant="ghost" paddingX={3} disabled>
          Other Favorites
        </Button>
      </HStack>
      <HStack spaceX={0}>
        <ColorModeButton />
        <PopoverRoot>
          <PopoverTrigger>
            <Avatar variant="subtle" />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>username</PopoverHeader>
            <PopoverBody>Login stuff</PopoverBody>
            <PopoverFooter>
              <Button disabled>Log Out</Button>
            </PopoverFooter>
          </PopoverContent>
        </PopoverRoot>
      </HStack>
    </HStack>
  );
};
