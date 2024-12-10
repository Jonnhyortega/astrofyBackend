import { Model, Schema, model, Types } from "mongoose";
import { IProduct } from "./product";

interface IShippingDetails {
  name: string;
  cellphone: string;
  location: string;
  address: string;
}

export interface IOrder {
  createdAt: Date;
  user: Types.ObjectId;
  price: number;
  shippingCost: number;
  items: IProduct[];
  shippingDetails: IShippingDetails;
  status: string;
  total: number;
}

const OrderSchema = new Schema<IOrder>({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      price: {
        type: Number,
        require: true
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingDetails: {
    name: {
      type: String,
      required: true,
    },
    cellphone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },    
  status: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;
