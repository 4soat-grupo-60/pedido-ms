import { Order } from "../domain/entities/order";
import { Payment } from "../domain/entities/payment";
import { Product } from "../domain/entities/product";
import { Category } from "../domain/value_object/category";
import { OrderStatus } from "../domain/value_object/orderStatus";
import { PaymentGatewayResponse } from "../domain/value_object/paymentGatewayResponse";
import { PaymentStatus } from "../domain/value_object/paymentStatus";
import {SagaMessageModel} from "../gateways/services/model/saga.message.model";
import {OrderSaga} from "../gateways/services/order_saga_sender";

export interface IOrderGateway {
  getOrdersOrdered(): Promise<Array<Order>>;
  getOrders(): Promise<Array<Order>>;
  save(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  getOrderByID(orderID: number): Promise<Order | null>;
  getOrderByStatus(order: OrderStatus): Promise<Array<Order>>;
}

export interface IPaymentGateway {
  get(id: string): Promise<Payment>;
}

export interface IOrderSagaSender {
  send(saga: OrderSaga, order: Order): Promise<String>;
}

export interface ISagaQueue<T> {
  send(payload: SagaMessageModel<T>): Promise<String>;
}

export interface IMessageConsumer<T extends SagaMessageModel<any>> {
  consume(saga: string, payload: T): Promise<boolean>;
}

export interface IProductGateway {
  getProductByIDs(ids: string[]): Promise<Array<Product>>;
}
