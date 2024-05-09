import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import IAppRoute from "../interfaces/IAppRoute";
import OrderRoute from "./routes/OrderRoute";
import ProductRoute from "./routes/ProductRoute";
import OrderQueueRoute from "./routes/OrderQueueRoute";
import PaymentRoute from "./routes/PaymentRoute";
import { DbConnection } from "../interfaces/dbconnection";
import "dotenv/config";

export default class StartUp {
  private dbConnection: DbConnection;

  public app: express.Application;

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
    this.app = express();

    this.middler();
    this.initRoutes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "GET,OPTIONS,PUT,POST,DELETE",
      origin: "*",
    };

    this.app.use(cors(options));
  }

  middler() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  initRoutes() {
    let routes: IAppRoute[] = [
      new OrderRoute(this.dbConnection),
      new ProductRoute(this.dbConnection),
      new OrderQueueRoute(this.dbConnection),
      new PaymentRoute(this.dbConnection),
    ];

    let port = process.env.PORT || 8080;

    for (let route of routes) {
      route.setup(this.app);
    }

    this.app.route("/ping").get((req, res) => {
      res.send("pong");
    });

    // this.app.use(
    //   "/api/docs",
    //   swaggerUi.serve,
    //   swaggerUi.setup(this.swaggerDocument, null, null)
    // );

    this.app.listen(port, () => {
      console.log(`App está executando na porta ${port}`);
    });
  }
}
