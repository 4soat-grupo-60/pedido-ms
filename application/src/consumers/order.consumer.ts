import {IMessageConsumer} from "../interfaces/gateways";
import {DbConnection} from "../interfaces/dbconnection";
import {OrderGateway} from "../gateways/repositories/orders";

export class OrderConsumer implements IMessageConsumer<any> {
  
  private orderGateway: OrderGateway;

  constructor(dbConnection: DbConnection) {
    this.orderGateway = new OrderGateway(dbConnection);
  }
  
  consume(saga: string, payload: any): Promise<boolean> {

    // TODO: criar consumers para processar as mensagens recebidas
    console.log("processed:", saga, payload)


    return Promise.resolve(true);
  }

}