import { FieldInputController } from "@/components/InputText/InputController";
import { Box, Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
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
          boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
          borderRadius="12px"
          justifyContent={"center"}
        >
          <Box as="form" w={"100%"}>
            <Heading
              fontFamily="Poppins"
              fontWeight="600"
              fontSize="16px"
              lineHeight="24px"
              color="#343434"
              mt="46px"
              textAlign={"center"}
            >
              Cadastrar Tarefa
            </Heading>

            <Flex
              w="100%"
              px="2rem"
              mt="34px"
              gap={"60px"}
              flexDirection="column"
              justifyContent={"center"}
            >
              <FieldInputController
                control={control}
                placeholder="Título"
                name="title"
                w={"100%"}
                maxW={"286px"}
              />
              <FieldInputController
                control={control}
                placeholder="Categoria"
                name="category"
              />
              <FieldInputController
                control={control}
                placeholder="Data"
                name="date"
              />
              <FieldInputController
                control={control}
                placeholder="Descrição"
                name="description"
              />

              <Button
                color={"white"}
                cursor={"pointer"}
                border="none"
                h="52px"
                background="#E84118"
                borderRadius="8px"
              >
                Salvar
              </Button>
            </Flex>
          </Box>
        </Flex>
      </GridItem>

      <GridItem backgroundColor={"#FFFF"}></GridItem>
    </Grid>
  );
}
