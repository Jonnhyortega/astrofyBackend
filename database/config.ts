import mongoose from "mongoose";
import pc from "picocolors";

export const dbConnection = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      throw new Error(pc.bgRed("La url no esta correctamente definida en los .env"));
    } else {
      console.log(pc.bgBlackBright("Base de datos conectada correctamente 👌"));
      await mongoose.connect(dbUrl);
    }
  } catch (error) {
    console.log(error);
    throw new Error(pc.bgRedBright("Error al iniciar la base de datos"));
  }
};
