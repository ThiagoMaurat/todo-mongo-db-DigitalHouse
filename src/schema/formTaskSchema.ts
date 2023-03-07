import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().max(40).required("Campo é obrigatório"),

  category: yup.string().max(40).required("Campo é obrigatório"),

  date: yup.string().required("Campo é obrigatório"),

  description: yup.string().max(40).required("Campo é obrigatório"),
});

export default schema;
