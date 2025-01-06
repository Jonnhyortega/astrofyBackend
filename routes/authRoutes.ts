import { Router } from "express";
import { check } from "express-validator";
import { emailExists } from "../helpers/validationsDB";
import { register } from "../controllers/auth";
import { searchErrors } from "../middlewares/searchErrors";
import { verifyUser } from "../controllers/verifyUser";
import { login } from "../controllers/login";
import validarJWT from "../middlewares/validateJWT";
import { changePw } from "../controllers/changePassword";
import { changeName } from "../controllers/changeName";

const router = Router();

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Formato incorrecto").isEmail(),
    check(
      "password",
      "El password debe contener 8 caracteres"
    ).isLength({ min: 8, max: 8 }),
    check("email").custom(emailExists),
    searchErrors,
  ],
  register
);

router.post(
	"/login",
	[
		check("email", "El email es obligatorio").isEmail(),
		searchErrors,
	],
	login
);


router.patch(
	"/verify",
	[
		check("email", "El email es requerido").not().isEmpty(),
		check("code", "El código de verificación es requerido").not().isEmpty()
	],
	verifyUser
)

router.get("/verify-token", validarJWT, (req, res) => {
  res.status(200).json({ msg: "Token válido y usuario autenticado" });
  const codigoParaCompilar = req.body
  return codigoParaCompilar
});

router.patch("/change-password", validarJWT, changePw);

router.patch("/change-name", validarJWT, changeName);


export default router;
