import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";

export const newProduct = async (req: Request, res: Response): Promise<void> => {
    
    try {
        const { id, title, price, description, image }: IProduct = req.body;
        const existingProduct = await Product.findOne({ id });
        if (existingProduct) {
                res.status(400).json({ 
                message: `El producto con este ID ya existe: ${existingProduct.id}, Nombre del producto: ${existingProduct.title}`
            });
        }

        const product = new Product({ id, title, price, description, image });
        await product.save();

        res.status(201).json({ 
            message: "Producto agregado correctamente.",
            newProductId: product.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al guardar el producto" });
    }

};
