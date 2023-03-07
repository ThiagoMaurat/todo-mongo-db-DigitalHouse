import { FieldInputController } from "@/components/InputText/InputController";
import schema from "@/schema/formTaskSchema";
import { Box, Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/services/axios";
import Swal from "sweetalert2";
import { FieldDateController } from "@/components/InputDatePicker/FieldDateController";
interface Form {
  title: string;
  category: string;
  date: string;
  description: string;
}

export default function Home() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const submit = async (data: Form) => {
    console.log(data.date);
    try {
      await api.post("/api/tasks", {
        date: data.date,
        title: data.title,
        category: data.category,
        description: data.description,
      });

      reset({ category: "", date: "", description: "", title: "" });

      Swal.fire({
        buttonsStyling: false,
        title: "Sucesso",
        html: '<p style="text-align:center">Task cadastrada</p>',
        icon: "success",
      });
    } catch {
      Swal.fire({
        buttonsStyling: false,
        title: "Aviso",
        html: '<p style="text-align:center">Não foi possível efetuar o cadastro</p>',
        icon: "warning",
      });
    }
  };

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
          <Box as="form" w={"100%"} onSubmit={handleSubmit(submit)}>
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
                error={errors.title}
              />
              <FieldInputController
                control={control}
                placeholder="Categoria"
                name="category"
                error={errors.category}
              />
              <FieldDateController
                control={control}
                name="date"
                error={errors.date}
              />
              <FieldInputController
                control={control}
                placeholder="Descrição"
                name="description"
                error={errors.description}
              />

              <Button
                color={"white"}
                cursor={"pointer"}
                border="none"
                isLoading={isSubmitting}
                h="52px"
                background="#E84118"
                borderRadius="8px"
                type="submit"
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
