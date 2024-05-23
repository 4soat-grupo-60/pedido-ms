import { Payment } from "../../domain/entities/payment";
import { PaymentStatus } from "../../domain/value_object/paymentStatus";
import PaymentModel from "../repositories/model/payment.model";
import PaymentResponseModel from "../services/model/payment.response.model";

export default class PaymentModelMapper {

  static mapResponse(input: PaymentResponseModel): Payment {
    return Payment.New(
      input.id,
      input.order_id,
      input.integration_id,
      input.qr_code,
      input.total,
      new PaymentStatus(input.status),
      input.paid_at,
      input.created_at,
      input.updated_at
    );
  }
}
