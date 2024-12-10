import nodemailer from "nodemailer";
import picocolors from "picocolors";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jonnhyortega@gmail.com", // Tu correo de Gmail
    pass: "vlqx ivdi obgf lxtm",    // Contraseña o App Password de Gmail
  },
});

export const sendEmail = async (to: string, code: string): Promise<void> => {
  try {
    const mailOption = {
      from: "jonnhyortega@gmail.com", 
      to,
      subject: "Codigo de verificación para crear cuenta en ASTROFYCL",
      text: `Su código de autenticación es: ${code}. MUCHAS GRACIAS POR USAR MI APLICACIÓN 😎👌`,
    };

    await transporter.sendMail(mailOption);
    console.log(`Correo electrónico enviado al usuario: ${to}`);
  } catch (error) {
    console.error("Error al enviar el correo", error);
  }
};

// Función para notificar siempre a jonnhyortega@gmail.com
export const giveNotice = async (userEmail: string): Promise<void> => {
  try {
    const AVISAR_AUTH = {
      from: "jonnhyortega@gmail.com",
      to: "jonnhyortega@gmail.com",   
      subject: "JONNHY SE AUTENTICARON EN ASTROFYCL",
      text: `El usuario con el correo ${userEmail} se autenticó en ASTROFYCL.`,
    };

    await transporter.sendMail(AVISAR_AUTH);
    console.log(
      picocolors.bgGreen("Aviso de autenticación enviado a jonnhyortega@gmail.com")
    );
  } catch (error) {
    console.error(
      "Error al enviar el aviso de autenticación por correo: ",
      error
    );
  }
};
