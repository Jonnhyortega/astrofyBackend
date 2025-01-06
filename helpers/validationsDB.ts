import { sendEmail } from "../mailer/mailer";
import User from "../models/usuario";

export const emailExists = async (email: string): Promise<void> => {
  const emailUser = await User.findOne({ email });

  if (emailUser) {
    if (emailUser.verified) {
      const error = new Error(`El correo ${email} ya está registrado.`);
      throw error;
    } else {
      await sendEmail(email, emailUser.code as string);
      const error = new Error(
        `El correo ${email} no ha sido verificado. Se ha enviado nuevamente el código.`
      );
      throw error;
    }
  }
};
