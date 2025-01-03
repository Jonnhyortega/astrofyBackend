import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import User, { IUser } from "../models/usuario";

const validarJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers["x-token"] as string;

    if (!token) {
        res.status(401).json({
            msg: "No hay token en la petición",
        });
        return;
    }

    try {
        const claveSecreta = process.env.CLAVE_SECRETA as string;
        const payload = jwt.verify(token, claveSecreta) as JwtPayload;
        const { id } = payload;

        const usuarioConfirmado: IUser | null = await User.findById(id);

        if (!usuarioConfirmado) {
            res.status(401).json({
                msg: "Token no válido",
            });
            return;
        }

        req.body.usuarioConfirmado = usuarioConfirmado;
        req.body.id = id;

        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(401).json({
                msg: "Token expirado. Por favor, inicia sesión nuevamente.",
            });
        } else {
            res.status(401).json({
                msg: "Token no válido",
            });
        }
    }
};

export default validarJWT;
