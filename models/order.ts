import { Model, Schema, model, Types } from "mongoose";

interface IShippingDetails {
  name: string;
  cellphone: string;
  address: string;
  dni:number;
  cardNumber: number;
  cardName: string;
  cardCode: number;
}

export interface IOrder {
  createdAt: Date;
  user: Types.ObjectId;
  price: number;
  shippingCost: number;
  items: { product: Types.ObjectId; quantity: number }[]; 
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
    address: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
      required: true,
    },
    cardNumber:{
      type: Number,
      required: true,
    },
    cardName: {
      type: String,
      required: true
    },
    cardCode:{
      type: Number,
      required: true
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
