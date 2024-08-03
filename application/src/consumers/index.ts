import {SagaSQSConsumer} from "../gateways/services/saga_sqs_consumer";
import {PaymentConsumer} from "./payment.consumer";
import {DbConnection} from "../interfaces/dbconnection";
import {CustomerConsumer} from "./customer.consumer";

export function setupConsumers(db: DbConnection) {
  new SagaSQSConsumer(process.env.AWS_PAYMENT_QUEUE, new PaymentConsumer(db)).receiveMessages();
  new SagaSQSConsumer(process.env.AWS_CUSTOMER_DELETED_QUEUE, new CustomerConsumer(db)).receiveMessages();
}