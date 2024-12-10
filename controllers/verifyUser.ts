import { Request, Response } from "express";
import User from "../models/usuario";
import picocolors from "picocolors";

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        msg: "No se encontro el usuario en la base de datos",
      });
      return;
    }
    if (user.verified) {
      res.status(400).json({
        msg: "Usuario verificado",
      });
      return;
    }
    if (user.code !== code) {
      res.status(400).json({
        msg: "Codigo incorrecto",
      });
      return;
    }
    const userUpdated = await User.findOneAndUpdate(
      { email },
      { verified: true }
    );
    res.status(200).json({
      msg: "Usuario verificado con exito",
    });
    console.log(picocolors.bgGreen("Usuario verificado con exito, agunante el backend che 😎👌 "))
  } catch (error) {
    console.log(error);
    console.log(picocolors.bgRed("Error en el servidor"));
    res.status(400).json({
      msg: "Error en el servidor",
    });
  }
};
