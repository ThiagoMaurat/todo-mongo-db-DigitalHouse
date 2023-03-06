import MongoConnect from "@/services/mongoConnection";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

MongoConnect();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
