import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import IAppRoute from "../interfaces/IAppRoute";
import OrderRoute from "./routes/OrderRoute";
import OrderQueueRoute from "./routes/OrderQueueRoute";
import {DbConnection} from "../interfaces/dbconnection";
import "dotenv/config";
import * as AWS from 'aws-sdk';
import {setupConsumers} from "../consumers";

import axios from "axios";
export default class StartUp {
  private dbConnection: DbConnection;

  public app: express.Application;

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
    this.app = express();

    this.initAWS();
    this.middler();
    this.initRoutes();
    setupConsumers(this.dbConnection);
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
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(compression());
  }

  initAWS() {
    const credentials = new AWS.Credentials({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    AWS.config.update({region: process.env.AWS_REGION || "us-east-1", credentials: credentials});
  }

  initRoutes() {
    let routes: IAppRoute[] = [
      new OrderRoute(this.dbConnection),
      new OrderQueueRoute(this.dbConnection),
    ];

    let port = process.env.PORT || 3000;

    for (let route of routes) {
      route.setup(this.app);
    }

    this.app.route("/ping").get((req, res) => {
      res.send("pedidos");
    });


    this.app.route("/ping-produtos").get(async (req, res) => {
      try {
        const response = await axios.get(`${process.env.PRODUCT_API_URL}/ping`);
        res.send(`Response from produtos-ms: ${response.data}`);
      } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
      }
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
