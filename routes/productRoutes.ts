import { Router } from "express";
import { check } from "express-validator";
import { searchErrors } from "../middlewares/searchErrors";
import { getProducts, newProduct } from "../controllers/product";
import cors from "cors";

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

router.get("/products", cors({
  origin: "*", 
}), getProducts);

export default router;
