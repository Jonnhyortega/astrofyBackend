import { sendEmail } from "../mailer/mailer";
import User, { IUser } from "../models/usuario";

export const emailExists = async (email: string): Promise<void> => {
  const emailUser: IUser | null = await User.findOne({ email });
  if (emailUser && emailUser.verified) {
    throw new Error(`El correo ${email} ya esta registrado`);
  }
  if (emailUser && !emailUser.verified) {
    await sendEmail(email, emailUser.code as string);
    throw new Error(
      `El correo ${email} ya esta registrado pero no ha verificado la cuenta, 
      se ha reenviado nuevamente el codigo para que pueda hacerlo`
    );
  }
};
