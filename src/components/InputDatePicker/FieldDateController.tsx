import React from "react";

import { FormLabel, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Control, Controller, FieldError } from "react-hook-form";
import { FieldDate, FieldDateProps } from "./index";

interface FieldDateControllerProps extends Omit<FieldDateProps, "onChange"> {
  name: string;
  label?: string;
  control: Control<any>;
  error?: FieldError;
}

export function FieldDateController({
  name,
  label,
  error,
  control,
  ...rest
}: FieldDateControllerProps) {
  return (
    <FormControl
      isInvalid={!!error}
      sx={{ ".react-datepicker-wrapper": { width: "100%" } }}
    >
      {label && (
        <FormLabel
          mb="8px"
          fontWeight={"600"}
          fontSize="16px"
          lineHeight={"20px"}
          color="#FFFFFF"
          htmlFor={name}
        >
          {label}
        </FormLabel>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FieldDate
            dropdownMode="select"
            dateFormat="dd/MM/yyyy"
            name={field.name}
            selected={field.value}
            onChange={field.onChange}
            {...rest}
          />
        )}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}
