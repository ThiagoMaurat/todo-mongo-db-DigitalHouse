import React from "react";
import { Input as InputChakra, InputProps } from "@chakra-ui/react";

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  return (
    <InputChakra
      type="text"
      width={"100%"}
      placeholder="Digite algo aqui..."
      border="none"
      borderBottom={"1px solid #ccc"}
      background="#FFFF"
      color="#545454"
      ref={ref}
      _focus={{ outline: "none" }}
      {...props}
    />
  );
};

export const FieldInput = React.forwardRef(Input);
