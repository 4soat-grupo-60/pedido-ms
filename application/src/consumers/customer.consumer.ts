import {IMessageConsumer} from "../interfaces/gateways";
import {DbConnection} from "../interfaces/dbconnection";
import {SagaMessageModel} from "../interfaces/saga.message.model";
import {OrderController} from "../controllers/order.controller";

export class CustomerConsumer implements IMessageConsumer<any> {

  constructor(private dbConnection: DbConnection) {
  }

  async consume(saga: string, payload: SagaMessageModel<any>): Promise<boolean> {
    console.log("processing:", saga, payload)

    switch (saga) {
      case "customer_deleted":
        return await this.handleDeletedEvent(payload)
      default:
        return false;
    }

  }

  private async handleDeletedEvent(payload: SagaMessageModel<any>): Promise<boolean> {

    try {

      await OrderController.anonymizeCustomer(
        payload.payload.cpf,
        this.dbConnection
      )

      console.log("[SUCCESS] processing: customer_deleted", payload)
      return true;
    } catch (err) {
      console.error("[ERROR] processing: customer_deleted", payload, err)
      return false;
    }
  }
}
