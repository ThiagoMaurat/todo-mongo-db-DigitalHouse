// Vendors
import React, { useMemo } from "react";
import { addMinutes } from "date-fns";
import { FieldError } from "react-hook-form";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

// Components

// Styles
import { Input, InputProps, FormControlProps } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FieldInput } from "../InputText";

// Interfaces
export type FieldDateProps = ReactDatePickerProps & {
  name: string;
  containerProps?: FormControlProps;
  inputProps?: InputProps;
  isRequired?: boolean;
};

export const FieldDate: React.FC<FieldDateProps> = (
  props: FieldDateProps
): JSX.Element => {
  /*
  |-----------------------------------------------------------------------------
  | Constants
  |-----------------------------------------------------------------------------
  |
  |
  */
  const {
    name,
    placeholderText,
    selected,
    containerProps,
    inputProps,
    ...rest
  } = props;

  /*
  |-----------------------------------------------------------------------------
  | Memos
  |-----------------------------------------------------------------------------
  |
  |
  */

  const selectedFormatted = useMemo(() => {
    if (!selected) return;

    return addMinutes(
      new Date(selected),
      new Date(selected).getTimezoneOffset()
    );
  }, [selected]);

  /*
  |-----------------------------------------------------------------------------
  | Functions
  |-----------------------------------------------------------------------------
  |
  |
  */

  /*
  |-----------------------------------------------------------------------------
  | Renders
  |-----------------------------------------------------------------------------
  |
  |
  */
  return (
    <DatePicker
      id={name}
      name={name}
      dateFormat="dd/MM/yyyy"
      customInput={<FieldInput {...inputProps} />}
      selected={selectedFormatted}
      placeholderText={placeholderText || "Selecione a data..."}
      {...rest}
    />
  );
};
