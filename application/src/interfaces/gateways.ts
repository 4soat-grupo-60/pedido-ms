import { Order } from "../domain/entities/order";
import { Payment } from "../domain/entities/payment";
import { Product } from "../domain/entities/product";
import { Category } from "../domain/value_object/category";
import { OrderStatus } from "../domain/value_object/orderStatus";
import { PaymentGatewayResponse } from "../domain/value_object/paymentGatewayResponse";
import { PaymentStatus } from "../domain/value_object/paymentStatus";

export interface IOrderGateway {
  getOrdersOrdered(): Promise<Array<Order>>;
  getOrders(): Promise<Array<Order>>;
  save(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  getOrderByID(orderID: number): Promise<Order | null>;
  getOrderByStatus(order: OrderStatus): Promise<Array<Order>>;
}

export interface IPaymentGatewayService {
  create(): Promise<PaymentGatewayResponse>;
}

export interface IPaymentGateway {
  getAll(): Promise<Array<Payment>>;
  get(id: number): Promise<Payment>;
  save(payment: Payment): Promise<Payment>;
  getByIntegrationID(integrationID: string): Promise<Payment>;
  updateStatus(id: number, paymentStatus: PaymentStatus): Promise<Payment>;
}

export interface IProductGateway {
  getProductsByCategory(category: Category): Promise<Array<Product>>;
  getProductByIDs(ids: number[]): Promise<Array<Product>>;
  getProducts(): Promise<Array<Product>>;
  saveProduct(product: Product): Promise<Product>;
  updateProduct(product: Product): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
}
