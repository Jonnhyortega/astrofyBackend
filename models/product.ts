import { Model, Schema, model } from "mongoose";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}


const ProductSchema = new Schema<IProduct>({
  id: {
    type: Number,
    required: [true, "El id es obligatorio"]
  },
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripción del producto es obligatoria"], 
  },
  category:{
    type: String,
    required: [true, "La categoria es obligatoria"],
  },
  image: {
    type: String,
    required: [true, "La imagen del producto es obligatoria"], 
  },
});

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;
