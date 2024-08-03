import {IMessageConsumer} from "../interfaces/gateways";
import {DbConnection} from "../interfaces/dbconnection";
import {SagaMessageModel} from "../interfaces/saga.message.model";
import {OrderController} from "../controllers/order.controller";

export class PaymentConsumer implements IMessageConsumer<any> {

  constructor(private dbConnection: DbConnection) {
  }

  async consume(saga: string, payload: SagaMessageModel<any>): Promise<boolean> {
    console.log("processing:", saga, payload)

    try {
      
      await OrderController.updatePayment(
        payload.payload.orderId,
        payload.payload.paymentId,
        this.dbConnection
      )

      console.log("[SUCCESS] processing:", saga, payload)

      return true;
    } catch (err) {
      console.error("[ERROR] processing:", saga, payload, err)
      return false;
    }
  }

}