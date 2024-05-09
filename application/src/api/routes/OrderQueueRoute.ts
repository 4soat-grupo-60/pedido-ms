import * as express from "express";

import IAppRoute from "../../interfaces/IAppRoute";
import { DbConnection } from "../../interfaces/dbconnection";
import { handleAPIError } from "../error/APIErrorHandler";
import { OrderQueueController } from "../../controllers/queue.controller";

export default class OrderQueueRoute implements IAppRoute {
  private dbConnection: DbConnection;

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
  }

  private ROUTE_BASE_PATH = "/api/orders/queue";

  setup(app: express.Application): void {
    app.route(`${this.ROUTE_BASE_PATH}/pending`).get(async (req, res) => {
      try {
        const orders = await OrderQueueController.getOrdersWithStatusPending(
          this.dbConnection
        );

        res.status(200).send(orders);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(`${this.ROUTE_BASE_PATH}/preparing`).get(async (req, res) => {
      try {
        const orders = await OrderQueueController.getOrdersWithStatusPreparing(
          this.dbConnection
        );

        res.status(200).send(orders);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(`${this.ROUTE_BASE_PATH}/prepared`).get(async (req, res) => {
      try {
        const orders = await OrderQueueController.getOrdersWithStatusPrepared(
          this.dbConnection
        );

        res.status(200).send(orders);
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }
}
