import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export const ErrorScreen = ({ children }: { children: ReactNode }) => {
  return <Text textAlign="center">{children}</Text>;
};
