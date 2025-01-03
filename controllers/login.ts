import { Response, Request } from "express";
import User, { IUser } from "../models/usuario";
import bcrypt from "bcryptjs";
import generateJWT from "../helpers/tokenGenerator";


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;

  try {
    const usuario = await User.findOne({ email });

    if (usuario) {
      const passwordValidate = bcrypt.compareSync(password, usuario.password);
      if (!passwordValidate) {
        res.status(400).json({
          msg: "Contraseña incorrecta",
        });
        return;
      }

      if (!usuario.verified) {
        res.status(403).json({
          msg: `Por favor verifique la cuenta para poder ingresar. Le hemos enviado nuevamente el código a ${email}`,
        });
        return;
      }

      const token = await generateJWT(usuario.id);
      res.json({
        usuario,
        token,
        msg: "Las contraseñas coincidieron",
      });
      return;
    }

    res.status(400).json({
      msg: "No se encontró el email en la base de datos. ¿Lo escribiste bien?",
    });
  } catch (error) {
    console.error("Error al identificar al usuario", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};
