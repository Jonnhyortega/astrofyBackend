import express, { Express } from "express";
import { dbConnection } from "../database/config";
import cors from "cors";
import authRoutes from "../routes/authRoutes";
import orderRoutes from "../routes/orderRoutes";
import productRoutes from "../routes/productRoutes";

export class Server {
  app: Express;
  port: string | number | undefined;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB(): Promise<void> {
    await dbConnection();
  }

  middlewares(): void {
    this.app.use(express.json());

    this.app.use(
      cors({
        origin: ["http://localhost:3000", "https://astrofy-ashy.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "x-token"],
        credentials: true,
      })
    );
  }

  //  MIDDLEWARE PARA LOCAL
  // middlewares(): void {
  //   this.app.use(express.json());

  //   this.app.use(
  //     cors({
  //       origin: "*",
  //       methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  //       allowedHeaders: ["Content-Type", "Authorization",  "x-token"],
  //     })
  //   );
  // }

  routes(): void {
    this.app.use("/auth", authRoutes);
    this.app.use("/api", productRoutes);
    this.app.use("/orders", orderRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto: ", this.port);
    });
  }
}
