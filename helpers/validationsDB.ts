import { sendEmail } from "../mailer/mailer";
import User, { IUser } from "../models/usuario";

export const emailExists = async (email: string): Promise<void> => {
  const emailUser: IUser | null = await User.findOne({ email });
  
  if (emailUser && emailUser.verified) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
  
  if (emailUser && !emailUser.verified) {
    await sendEmail(email, emailUser.code as string);
    const error = new Error(
      `El correo ${email} ya está registrado pero no ha verificado la cuenta. Se ha reenviado nuevamente el código para que pueda hacerlo`
    );
    (error as any).statusCode = 403; 
    throw error;
  }
};
