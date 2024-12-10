import { Router } from "express";
import { check } from "express-validator";
import { emailExists } from "../helpers/validationsDB";
import { register } from "../controllers/auth";
import { searchErrors } from "../middlewares/searchErrors";
import { verifyUser } from "../controllers/verifyUser";
import { login } from "../controllers/login";

const router = Router();

router.post(
  "/register",
  [
    check("name", "El nombre es obligatoro").not().isEmpty(),
    check("email", "Formato incorrecto").isEmail(),
    check(
      "password",
      "El password debe contener al menos 8 caracteres"
    ).isLength({ min: 6, max: 8 }),
    check("email").custom(emailExists),
    searchErrors,
  ],
  register
);

router.post(
	"/login",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "El password debe ser de 6 caracteres").isLength({
			min: 6,
		}),
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

export default router;
