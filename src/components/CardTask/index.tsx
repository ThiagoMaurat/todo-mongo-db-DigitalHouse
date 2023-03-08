import { DateSchema } from "@/pages/api/tasks";
import api from "@/services/axios";
import { Flex, HStack, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { RiDeleteBin5Fill, RiEditBoxLine } from "react-icons/ri";
interface CardTaskProps {
  id: number;
  category: string;
  description: string;
  date: string;
  dataDeletedClick: () => void;
}

export const CardTask = (props: CardTaskProps) => {
  const { category, date, description, id, dataDeletedClick } = props;

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

        <Flex>
          <RiEditBoxLine color="#0FBA3F" size={"20px"} />
          <RiDeleteBin5Fill
            color="#F90000"
            size={"20px"}
            onClick={dataDeletedClick}
          />
        </Flex>
      </HStack>
    </Flex>
  );
};
