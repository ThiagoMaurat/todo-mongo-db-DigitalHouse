import TaskModel from "@/model/task";
import MongoConnect from "@/services/mongoConnection";
import { FilterQuery } from "mongoose";
import { NextApiHandler } from "next";
import { z } from "zod";

MongoConnect();

async function getAllTasks() {
  const tasks = await TaskModel.find();
  return tasks;
}

const FormData = z.object({
  title: z.string().min(1).max(40).nonempty("Campo obrigatório"),
  category: z.string().min(1).max(30).nonempty("Campo obrigatório"),
  date: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date()),
  description: z.string().min(1).max(40).nonempty("Campo obrigatório"),
});

export type DateSchema = z.infer<typeof FormData>;

async function addTask(body: DateSchema) {
  try {
    const data = FormData.parse(body);

    if (data) {
      const response = await TaskModel.create(body);
      return response;
    }
  } catch (error) {
    throw new Error("Error");
  }
}

async function deleteTask(id: string) {
  const query: FilterQuery<any> = { _id: id };

  try {
    if (query) {
      const response = await TaskModel.deleteOne(query);
      return response;
    }
  } catch (error) {
    throw new Error("Error");
  }
}

async function patchTask(id: string, body: DateSchema) {
  const query: FilterQuery<any> = { _id: id };
  try {
    const data = FormData.parse(body);
    if (data) {
      const response = await TaskModel.updateOne(query, data);
      return response;
    }
  } catch (error) {
    throw new Error("Error");
  }
}

const handler: NextApiHandler = async (request, response) => {
  const method = request.method;
  const body = request.body as DateSchema;
  const { _id } = request.body;

  let status = 200;

  let result;

  try {
    switch (method) {
      case "GET":
        result = await getAllTasks();
        break;

      case "POST":
        result = await addTask(body);
        status = 201;
        break;

      case "DELETE":
        result = await deleteTask(_id);
        status = 201;
        break;

      case "PATCH":
        result = await patchTask(_id, body);
        status = 200;
        break;

      default:
        result = { message: "Method not Allowed" };
        status = 405;
    }

    return response.status(status).json(result);
  } catch (error) {
    response.status(500).json("Erro");
  }
};

export default handler;
