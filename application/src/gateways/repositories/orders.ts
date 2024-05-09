import { Order } from "../../domain/entities/order";
import { OrderStatus } from "../../domain/value_object/orderStatus";
import { IOrderGateway } from "../../interfaces/gateways";
import { DbConnection } from "../../interfaces/dbconnection";
import OrderModelMapper from "../mapper/order.mapper";
import OrderModel from "../model/order.model";

export class OrderGateway implements IOrderGateway {
  private repositoryData: DbConnection;

  constructor(connection: DbConnection) {
    this.repositoryData = connection;
  }

  async getOrderByStatus(status: OrderStatus): Promise<Array<Order>> {
    const dados: OrderModel[] = await this.repositoryData.order.findMany({
      where: { status: status.getStatus() },
      include: {
        payment: true,
        items: {
          include: { product: true },
        },
      },
    });
    return dados.map(OrderModelMapper.map);
  }

  async getOrders(): Promise<Array<Order>> {
    const dados: OrderModel[] = await this.repositoryData.order.findMany({
      include: {
        payment: true,
        items: {
          include: { product: true },
        },
      },
    });
    return dados.map(OrderModelMapper.map);
  }

  async getOrdersOrdered(): Promise<Array<Order>> {
    const orderedIds: { id: number; order_status: number }[] = await this
      .repositoryData.$queryRaw`
      SELECT id, CASE
          WHEN status = 'Pronto' THEN 1
          WHEN status = 'Em preparação' THEN 2
          WHEN status = 'Aguardando Preparo' THEN 3
          ELSE 4
        END as order_status
      FROM orders
      WHERE status IN ('Aguardando Preparo', 'Em preparação', 'Pronto')
      ORDER BY
        CASE
          WHEN status = 'Pronto' THEN 1
          WHEN status = 'Em preparação' THEN 2
          WHEN status = 'Aguardando Preparo' THEN 3
          ELSE 4
        END,
        created_at ASC;`;

    const orders: OrderModel[] = await this.repositoryData.order.findMany({
      where: {
        id: {
          in: orderedIds.map((i) => i.id),
        },
      },
      include: {
        payment: true,
        items: {
          include: { product: true },
        },
      },
    });

    const idStatusOrder: Record<number, number> = orderedIds.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: curr.order_status }),
      {} as Record<number, number>
    );

    return orders
      .map(OrderModelMapper.map)
      .sort((a, b) => idStatusOrder[a.id] - idStatusOrder[b.id]);
  }

  async save(o: Order): Promise<Order> {
    const data = {
      client_cpf: o.clientCPF?.getCPF(),
      payment_id: o.payment?.id,
      status: o.status.getStatus(),
      total: o.valueTotal.getValueMoney(),
      items: {
        create: o.items.map((i) => ({
          product_id: i.product.getId(),
          quantity: i.quantity,
          price: i.value,
          total: i.total,
        })),
      },
    };

    const savedOrder = await this.repositoryData.order.create({
      data: data,
    });

    return this.getOrderByID(savedOrder.id);
  }

  async update(o: Order): Promise<Order> {
    const data = {
      id: o.id,
      client_cpf: o.clientCPF?.getCPF(),
      payment_id: o.payment?.id,
      status: o.status.getStatus(),
      total: o.valueTotal.getValueMoney(),
    };

    const savedOrder = await this.repositoryData.order.update({
      data: data,
      where: {
        id: o.id,
      },
      include: {
        payment: true,
        items: {
          include: { product: true },
        },
      },
    });

    return this.getOrderByID(savedOrder.id);
  }

  async getOrderByID(orderID: number): Promise<Order | null> {
    const order = await this.repositoryData.order.findFirst({
      where: { id: orderID },
      include: {
        payment: true,
        items: {
          include: { product: true },
        },
      },
    });

    return OrderModelMapper.map(order);
  }
}
