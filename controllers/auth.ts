import { Request, Response } from "express";
import User, { IUser } from "../models/usuario";
import bcrypt from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { giveNotice, sendEmail } from "../mailer/mailer";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, rol }: IUser = req.body;

    const usuario = new User({ name, email, password, rol });

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    const adminKey = req.headers["admin-key"];
    if (adminKey === process.env.KEYFORADMIN) {
      usuario.rol = ROLES.admin;
    }

    const newCode = randomstring.generate(6);
    usuario.code = newCode;

    await usuario.save();

    await sendEmail(email, newCode);
    await giveNotice(email);

    res.status(201).json({
      usuario,
      msg: `Se ha enviado el código de autenticación al correo ${email}.`,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        msg: "El correo ya está registrado.",
      });
    } else if (error.name === "ValidationError") {
      res.status(400).json({
        msg: "Error de validación en los datos enviados.",
      });
    } else {
      console.error("Error durante el proceso de registro:", error);
      res.status(500).json({
        msg: "Error interno del servidor. Intente más tarde.",
      });
    }
  }
};
