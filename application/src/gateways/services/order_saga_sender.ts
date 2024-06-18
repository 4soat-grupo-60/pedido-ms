import {IOrderSagaSender, ISagaQueue} from "../../interfaces/gateways";
import {Order} from "../../domain/entities/order";
import OrderMessageModel from "./model/order.message.model";
import OrderModelMapper from "../mapper/order.mapper";
import {SagaMessageModel} from "./model/saga.message.model";
import * as crypto from "crypto";

export type OrderSaga = "order_created" | "order_updated" | "order_client_link";

export class OrderSagaSender implements IOrderSagaSender {

  constructor(private sender: ISagaQueue<OrderMessageModel>) {
  }

  async send(saga: OrderSaga, payload: Order): Promise<String> {

    const message: SagaMessageModel<OrderMessageModel> = {
      id: crypto.randomUUID(),
      payload: OrderModelMapper.toMessage(payload),
      saga: saga,
      time: new Date(),
    }

    console.log("Sending message: ", message);

    return await this.sender.send(message);
  }

}