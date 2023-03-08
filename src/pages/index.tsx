import { FieldInputController } from "@/components/InputText/InputController";
import schema from "@/schema/formTaskSchema";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/services/axios";
import Swal from "sweetalert2";
import { FieldDateController } from "@/components/InputDatePicker/FieldDateController";
import { GetStaticProps } from "next";
import { CardTask } from "@/components/CardTask";
import { format } from "date-fns";
import { useCallback } from "react";
interface Form {
  title: string;
  category: string;
  date: string;
  description: string;
}

export default function Home(data: { data: ResponseListTasks[] }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const submit = async (data: Form) => {
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
        didClose() {
          window.location.reload();
        },
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

  const deleteTask = useCallback(async (id: string) => {
    try {
      await api.delete<{ _id: string }>("/api/tasks", { data: { _id: id } });
      Swal.fire({
        buttonsStyling: false,
        title: "Sucesso",
        html: '<p style="text-align:center">Task removida</p>',
        icon: "success",
        didClose() {
          window.location.reload();
        },
      });
    } catch {
      Swal.fire({
        buttonsStyling: false,
        title: "Aviso",
        html: '<p style="text-align:center">Não foi possível efetuar a deleção</p>',
        icon: "warning",
      });
    }
  }, []);

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

      <GridItem mx="22px" backgroundColor={"#FFFF"}>
        <HStack mt="70px" justify={"space-between"}>
          <Text
            fontFamily="Poppins"
            fontWeight="600"
            fontSize="20px"
            lineHeight="30px"
            color="#343434"
          >
            Minhas Tarefas
          </Text>

          <Text>{`Total: ${data.data.length} tarefas`}</Text>
        </HStack>

        <Flex gap={"22px"} mt="22px" flexDir={"column"}>
          {data.data.map((item, index) => {
            return (
              <CardTask
                key={`CardTask-${index}`}
                id={index + 1}
                category={item.category}
                description={item.description}
                date={format(new Date(item.date), "dd-MM-yyyy")}
                dataDeletedClick={() => deleteTask(item._id)}
              />
            );
          })}
        </Flex>
      </GridItem>
    </Grid>
  );
}

interface ResponseListTasks {
  _id: string;
  title: string;
  category: string;
  date: string;
  description: string;
}
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<ResponseListTasks[]>("/api/tasks");
  return {
    props: {
      data,
    },
  };
};
