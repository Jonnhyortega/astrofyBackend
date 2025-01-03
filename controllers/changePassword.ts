import { Request, Response } from "express";
import User from "../models/usuario";
import bcrypt from "bcryptjs";

export const changePw = async (req: Request, res: Response): Promise<void> => {
  const { email, password, newPassword } = req.body;

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      res.status(404).json({
        msg: "Usuario no encontrado",
      });
      return;
    }

    const passwordValidate = bcrypt.compareSync(password, usuario.password);
    if (!passwordValidate) {
      res.status(400).json({
        msg: "Contraseña incorrecta",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

    usuario.password = hashedNewPassword;
    await usuario.save();

    res.status(200).json({
      msg: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
