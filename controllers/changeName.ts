import { Request, Response } from "express";
import User from "../models/usuario";

export const changeName = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      res.status(404).json({
        msg: "Usuario no encontrado",
      });
      return;
    }
    
    usuario.name = name;
    await usuario.save();

    res.status(200).json({
      msg: "Nombre actualizado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
