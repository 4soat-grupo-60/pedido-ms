import {SagaSQSConsumer} from "../gateways/services/saga_sqs_consumer";
import {OrderConsumer} from "./order.consumer";
import {DbConnection} from "../interfaces/dbconnection";

export function setupConsumers(db: DbConnection) {
  new SagaSQSConsumer(process.env.AWS_PAYMENT_QUEUE, new OrderConsumer(db)).receiveMessages();
  
  // TODO: adicionar outros consumidores
  // new SagaSQSConsumer(process.env.AWS_CUSTOMER_DELETED_QUEUE, new OrderConsumer()).receiveMessages(); 
}