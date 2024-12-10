import { Request, Response } from "express";
import User, { IUser } from "../models/usuario";
import bcrypt from "bcryptjs";
import { ROLES } from "../helpers/constants";
import randomstring from "randomstring";
import { giveNotice, sendEmail } from "../mailer/mailer";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract user details from the request body
    const { name, email, password, rol }: IUser = req.body;

    // Create a new user instance with the provided details
    const usuario = new User({ name, email, password, rol });

    // Hash the password before saving it to the database
    const salt = bcrypt.genSaltSync(); // Generate a salt for hashing
    usuario.password = bcrypt.hashSync(password, salt); // Encrypt the password

    // Check if the user is an admin based on the provided admin key
    const adminKey = req.headers["admin-key"]; // Retrieve the admin key from request headers
    if (adminKey === process.env.KEYFORADMIN) {
      usuario.rol = ROLES.admin;
    }

    // Generate a verification code for the user
    const newCode = randomstring.generate(6); 
    usuario.code = newCode; 

    // Save the user to the database
    await usuario.save();

    // Send a verification email to the user
    await sendEmail(email, newCode);
    //  SEND VERIFICATION EMAIL TO CREATOR OF APLICATION (ME:D) 
    await giveNotice(email)
    // Respond with a success status and the saved user details
    res.status(201).json({ usuario });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error durante el proceso de registro:", error);
    // Respond with a 500 status and a generic error message
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};
