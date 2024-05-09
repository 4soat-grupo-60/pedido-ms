import { OrderGateway } from "../gateways/repositories/orders";
import { DbConnection } from "../interfaces/dbconnection";
import { OrderQueueUseCases } from "../domain/usecases/queue";
import { OrderPresenter } from "./presenters/order.presenter";

export class OrderQueueController {
  static async getOrdersWithStatusPending(dbConnection: DbConnection) {
    const orderQueueGateway = new OrderGateway(dbConnection);
    const orders = await OrderQueueUseCases.getPendingOrders(orderQueueGateway);

    return OrderPresenter.mapList(orders);
  }

  static async getOrdersWithStatusPreparing(dbConnection: DbConnection) {
    const orderQueueGateway = new OrderGateway(dbConnection);
    const orders = await OrderQueueUseCases.getPreparingOrders(
      orderQueueGateway
    );

    return OrderPresenter.mapList(orders);
  }

  static async getOrdersWithStatusPrepared(dbConnection: DbConnection) {
    const orderQueueGateway = new OrderGateway(dbConnection);
    const orders = await OrderQueueUseCases.getPreparedOrders(
      orderQueueGateway
    );

    return OrderPresenter.mapList(orders);
  }
}
