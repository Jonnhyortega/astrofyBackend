import { Response, Request } from "express";
import Order, { IOrder } from "../models/order";
import { Types } from "mongoose";
import Product from "../models/product";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const usuarioId = req.query.userId as string;
  if (!usuarioId) {
    res.status(400).json({ msg: "El userId es requerido" });
    return;
  }

  try {
    const consulta = { user: usuarioId };

    const orders = await Order.find(consulta).populate(
      "items.product",
      "title image price"
    );

    res.json({ orders });
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    res.status(500).json({ msg: "Error al obtener órdenes" });
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuario: Types.ObjectId = req.body.usuarioConfirmado._id;
    const { items, shippingDetails, shippingCost } = req.body;

    if (!items || items.length === 0) {
      res
        .status(400)
        .json({ message: "La orden debe contener al menos un producto." });
      return;
    }

    let totalProductPrice = 0;
    const updatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        res
          .status(404)
          .json({ message: `Producto con ID ${item.product} no encontrado.` });
        return;
      }

      totalProductPrice += product.price * item.quantity;

      updatedItems.push({
        product: product._id,
        quantity: item.quantity,
      });
    }

    const total = totalProductPrice + shippingCost;

    const orderData: IOrder = {
      createdAt: new Date(),
      user: usuario,
      price: totalProductPrice,
      shippingCost,
      items: updatedItems,
      shippingDetails,
      status: "pending",
      total,
    };

    const order = new Order(orderData);
    await order.save();

    res.status(201).json({
      message: "Orden creada exitosamente.",
      order,
    });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ message: "Hubo un error al procesar la orden." });
  }
};
