import { Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

interface CardTaskProps {
  id: number;
  category: string;
  description: string;
  date: string;
}

export const CardTask = (props: CardTaskProps) => {
  const { category, date, description, id } = props;
  return (
    <Flex
      w="100%"
      background="#FFFFFF"
      border="1px solid #C7C4C4"
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
      borderRadius="12px"
      p="15px"
      flexDir={"column"}
    >
      <HStack justify={"space-between"}>
        <Text
          fontFamily="Poppins"
          fontWeight="600"
          fontSize="20px"
          lineHeight="30px"
        >
          {`Tarefa ${id}`}
        </Text>

        <Text
          fontFamily="Poppins"
          fontWeight="600"
          fontSize="20px"
          lineHeight="30px"
        >
          {date}
        </Text>
      </HStack>

      <Text
        fontFamily="Poppins"
        fontWeight="300"
        fontSize="14px"
        lineHeight="21px"
        color="#343434"
      >
        {category}
      </Text>

      <HStack justify={"space-between"}>
        <Text
          fontFamily="Poppins"
          fontWeight="600"
          fontSize="20px"
          lineHeight="30px"
        >
          {description}
        </Text>

        <Flex></Flex>
      </HStack>
    </Flex>
  );
};
