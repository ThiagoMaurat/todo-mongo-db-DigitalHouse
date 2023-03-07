import React from "react";
import { Input as InputChakra, InputProps } from "@chakra-ui/react";

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  return (
    <InputChakra
      type="text"
      placeholder="Digite algo aqui..."
      border="none"
      borderBottom={"1px solid #ccc"}
      background="#FFFF"
      ref={ref}
      {...props}
    />
  );
};

export const FieldInput = React.forwardRef(Input);
