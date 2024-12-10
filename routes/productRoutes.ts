import { Router } from "express";
import { check } from "express-validator";
// import { existingProduct } from "../helpers/validationsDB";
import { searchErrors } from "../middlewares/searchErrors";
import { newProduct } from "../controllers/product";

const router = Router();

router.post(
  "/register-product",
  [
    check("id", "Por favor ingrese un id"),
    check("title", "Por favor ingrese un título").not().isEmpty(),
    check("price", "Por favor  ingrese un precio").not().isEmpty(),
    check("description", "Ingrese una descripción por favor").not().isEmpty(),
    check("image", "Formato de imagen incorrecto").not().isEmpty(),
    searchErrors,
  ],
  newProduct
);

export default router;
