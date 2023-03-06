import mongoose from "mongoose";

const MongoConnect = async () => {
  if (!mongoose.connections[0].readyState) {
    console.log("CONEXAO INICIADA COM SUCESSO");
    mongoose.connect(process.env.MONGODB_URI!);
  } else {
    console.log("JA EXISTE UMA CONEXAO INICIADA");
  }
};

export default MongoConnect;
