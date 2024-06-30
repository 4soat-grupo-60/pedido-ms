import { Order } from "../entities/order";
import RecordNotFoundError from "../error/RecordNotFoundError";
import { OrderStatus } from "../value_object/orderStatus";
import { OrderItem } from "../entities/orderItem";
import { Payment } from "../entities/payment";
import { PaymentStatus } from "../value_object/paymentStatus";
import ProductInactiveError from "../error/ProductInactiveError";
import {
  IOrderGateway,
  IOrderSagaSender,
  IPaymentGateway,
  IProductGateway,
} from "../../interfaces/gateways";
import { OrderItemInput } from "../value_object/orderItemInput";
import { CPF } from "../value_object/cpf";

export class OrderUseCases {
  static async save(
    requestItems: Array<OrderItemInput>,
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    orderSagaSender: IOrderSagaSender
  ): Promise<Order> {
    // Find all related products
    const products = await productGateway.getProductByIDs(
      requestItems.map((v) => v.product_id)
    );

    // Create the OrderItems list
    const items = requestItems.map((ri) => {
      const product = products.find((p) => p.getId() === ri.product_id);

      if (!product) {
        throw new RecordNotFoundError(
          `Nenhum produto foi encontrado pelo ID fornecido: ${ri.product_id}`
        );
      }

      if (!product.getActive()) {
        throw new ProductInactiveError(
          `O produto requisitado está indisponível: "${product.getName()}"`
        );
      }

      return new OrderItem(product, ri.quantity);
    });

    const order = new Order(items);

    const orderSaved = await orderGateway.save(order);

    await orderSagaSender.send("order_created", orderSaved);

    return orderSaved;
  }

  static async updatePayment(
    orderId: number,
    paymentId: string,
    orderGateway: IOrderGateway,
    paymentGateway: IPaymentGateway
  ): Promise<Order> {
    const order = await orderGateway.getOrderByID(orderId);
    const payment = await paymentGateway.get(paymentId);
    return this.processUpdatePayment(payment, order, orderGateway);
  }

  static async processUpdatePayment(
    payment: Payment,
    order: Order,
    orderGateway: IOrderGateway
  ): Promise<Order> {
    order.setPaymentId(payment.id);
    order.setPaymentDate(payment.paidAt);
    order.setStatus(this.getOrderStatusByPayment(payment));
    return await orderGateway.update(order);
  }

  private static getOrderStatusByPayment(payment: Payment): OrderStatus {
    switch (payment.status.value()) {
      case PaymentStatus.PAGO:
        return OrderStatus.AGUARDANDO_PREPARO;
      default:
        return OrderStatus.AGUARDANDO_PAGAMENTO;
    }
  }

  static async getOrderByID(
    id: number,
    orderGateway: IOrderGateway
  ): Promise<Order> {
    const order: Order = await orderGateway.getOrderByID(id);

    if (order == null) {
      throw new RecordNotFoundError(
        `Nenhum pedido foi encontrado pelo ID fornecido (${id})`
      );
    }

    return order;
  }

  static async updateOrderStatus(
    orderID: number,
    status: OrderStatus,
    orderGateway: IOrderGateway,
    orderSagaSender: IOrderSagaSender
  ): Promise<Order> {
    const order: Order = await orderGateway.getOrderByID(orderID);

    order.setStatus(status);

    await orderSagaSender.send("order_updated", order);

    return await orderGateway.update(order);
  }

  static async linkToClient(
    orderId: number,
    orderGateway: IOrderGateway,
    clientCPF?: string
  ): Promise<Order> {
    const order: Order = await orderGateway.getOrderByID(orderId);

    if (clientCPF) {
      order.setClientCPF(new CPF(clientCPF));
    }
    order.setStatus(OrderStatus.AGUARDANDO_PAGAMENTO);

    return await orderGateway.update(order);
  }

  static async listAll(orderGateway: IOrderGateway): Promise<Array<Order>> {
    return orderGateway.getOrders();
  }

  static async listAllOrdered(
    orderGateway: IOrderGateway
  ): Promise<Array<Order>> {
    return orderGateway.getOrdersOrdered();
  }
}

