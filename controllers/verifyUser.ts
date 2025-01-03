import { Request, Response } from "express";
import User from "../models/usuario";

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        msg: "No se encontró el usuario en la base de datos",
      });
      return;
    }
    if (user.verified) {
      res.status(400).json({
        msg: "El usuario ya ha sido verificado",
      });
      return;
    }
    if (user.code !== code) {
      res.status(400).json({
        msg: "Código incorrecto",
      });
      return;
    }
    const userUpdated = await User.findOneAndUpdate(
      { email },
      { verified: true }
    );
    res.status(200).json({
      msg: "Usuario verificado con éxito",
      userUpdated
    });
  } catch (error) {
    console.error("Error en el servidor:", error); 
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};
