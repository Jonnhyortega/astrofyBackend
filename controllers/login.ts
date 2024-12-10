import { Response, Request } from "express";
import User, { IUser } from "../models/usuario";
import bcrypt from "bcryptjs";
import generateJWT from "../helpers/tokenGenerator";
import picocolors from "picocolors";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;

  try {
    // search email in DB
    const usuario = await User.findOne({ email });
    if (usuario) {
    // COMPARE PASSWORD USER WITH PASSWORD ENCRIPTED
      const passwordValidate = bcrypt.compareSync(password, usuario.password);
      if (!passwordValidate) {
        res.status(400).json({
          msg: "Contraseña incorrecta",
        });
        return;
      }
      const token = await generateJWT(usuario.id);
      res.json({
        usuario,
        token,
        msg: "Las contraseñas coincidieron"
      })
      console.log(picocolors.bgRed("Credenciales correctas 😎"))
      return
    }

    res.status(400).json({
      msg: "No se encontro el email en la base de datos",
    });
    return;
  } catch (error) {
    console.log(error);
    console.log(picocolors.bgRed("Error al identificar al usuario"));
  }
};
