import * as express from "express";
import axios from "axios";
import "dotenv/config";

import IAppRoute from "../../interfaces/IAppRoute";
import { handleAPIError } from "../error/APIErrorHandler";
import { OrderStatus } from "../../domain/value_object/orderStatus";
import { DbConnection } from "../../interfaces/dbconnection";
import { OrderItemInput } from "../../domain/value_object/orderItemInput";
import { OrderController } from "../../controllers/order.controller";

export default class OrderRoute implements IAppRoute {
  private dbConnection: DbConnection;

  constructor(dbConnection: DbConnection) {
    this.dbConnection = dbConnection;
  }

  private ROUTE_BASE_PATH = "/api/orders";

  setup(app: express.Application): void {
    app.route(this.ROUTE_BASE_PATH).get(async (req, res) => {
      try {
        const orders = await OrderController.getAllOrders(this.dbConnection);

        res.status(200).send(orders);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(this.ROUTE_BASE_PATH + "/ordered").get(async (req, res) => {
      try {
        const orders = await OrderController.getAllOrdersOrdered(
          this.dbConnection
        );

        res.status(200).send(orders);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app.route(`${this.ROUTE_BASE_PATH}/:id`).get(async (req, res) => {
      try {
        const orderId = Number(req.params.id);

        const order = await OrderController.getOrderById(
          orderId,
          this.dbConnection
        );

        res.status(200).send(order);
      } catch (e) {
        handleAPIError(res, e);
      }
    });

    app
      .route(`${this.ROUTE_BASE_PATH}/link/:orderId/client/:clientCpf`)
      .put(async (req, res) => {
        try {
          const orderId = Number(req.params.orderId);
          const clientCpf = String(req.params.clientCpf);

          const clientCpfFormatted = clientCpf
            ?.replace(".", "")
            .replace(".", "")
            .replace(".", "")
            .replace("-", "");

          await axios
            .post(process.env.API_GATEWAY_LAMBDA_COGNITO + "/login", {
              cpf: clientCpfFormatted,
            })
            .then((response) => {
              console.log("Autenticado");
            })
            .catch((error) => {
              throw new Error("Cliente não encontrado");
            });

          const order = await OrderController.linkClientToOrder(
            orderId,
            clientCpfFormatted,
            this.dbConnection
          );

          res.status(200).send(order);
        } catch (e) {
          handleAPIError(res, e);
        }
      });

    app
      .route(`${this.ROUTE_BASE_PATH}/:orderId/status`)
      .put(async (req, res) => {
        try {
          const orderId = Number(req.params.orderId);
          const orderStatus = new OrderStatus(req.body.status);

          const order = await OrderController.updateOrder(
            orderId,
            orderStatus,
            this.dbConnection
          );

          res.status(200).send(order);
        } catch (e) {
          handleAPIError(res, e);
        }
      });

    app.route(this.ROUTE_BASE_PATH).post(async (req, res) => {
      try {
        const items: Array<OrderItemInput> = req.body;
        const order = await OrderController.createOrder(
          items,
          this.dbConnection
        );

        res.status(200).send(order);
      } catch (e) {
        handleAPIError(res, e);
      }
    });
  }
}
