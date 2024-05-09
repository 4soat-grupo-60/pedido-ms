import { OrderGateway } from "../gateways/repositories/orders";
import { ProductGateway } from "../gateways/repositories/products";
import { OrderUseCases } from "../domain/usecases/order";
import { OrderItemInput } from "../domain/value_object/orderItemInput";
import { DbConnection } from "../interfaces/dbconnection";
import { OrderStatus } from "../domain/value_object/orderStatus";
import { OrderPresenter } from "./presenters/order.presenter";

export class OrderController {
  static async getAllOrdersOrdered(dbConnection: DbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const orders = await OrderUseCases.listAllOrdered(orderGateway);
    return OrderPresenter.mapList(orders);
  }

  static async getAllOrders(dbConnection: DbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const allOrders = await OrderUseCases.listAll(orderGateway);

    return OrderPresenter.mapList(allOrders);
  }

  static async getOrderById(orderId: number, dbConnection: DbConnection) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.getOrderByID(orderId, orderGateway);

    return OrderPresenter.map(order);
  }

  static async linkClientToOrder(
    orderId: number,
    clientCPF: string,
    dbConnection: DbConnection
  ) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.linkToClient(
      orderId,
      orderGateway,
      clientCPF
    );

    return OrderPresenter.map(order);
  }

  static async createOrder(
    orderItems: OrderItemInput[],
    dbConnection: DbConnection
  ) {
    const orderGateway = new OrderGateway(dbConnection);
    const productGateway = new ProductGateway(dbConnection);

    const newOrder = await OrderUseCases.save(
      orderItems,
      orderGateway,
      productGateway
    );

    return OrderPresenter.map(newOrder);
  }

  static async updateOrder(
    orderId: number,
    status: OrderStatus,
    dbConnection: DbConnection
  ) {
    const orderGateway = new OrderGateway(dbConnection);
    const order = await OrderUseCases.updateOrderStatus(
      orderId,
      status,
      orderGateway
    );

    return OrderPresenter.map(order);
  }
}
