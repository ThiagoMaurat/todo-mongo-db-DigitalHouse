import { FieldInputController } from "@/components/InputText/InputController";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface Form {
  title: string;
  category: string;
  date: Date;
  description: string;
}

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    /* resolver: yupResolver(schema), */
  });

  return (
    <Grid h="100vh" templateColumns={"482px 1fr"}>
      <GridItem
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        backgroundColor={"#102766"}
        px="28px"
      >
        <Flex
          maxH="568px"
          h="100%"
          maxW={"343px"}
          w="100%"
          background="#FFFFFF"
          border-radius="12px"
        >
          <form>
            <FieldInputController control={control} name="title" />
          </form>
        </Flex>
      </GridItem>

      <GridItem backgroundColor={"#FFFF"}></GridItem>
    </Grid>
  );
}
