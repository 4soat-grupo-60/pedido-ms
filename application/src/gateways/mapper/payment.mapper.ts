import { Payment } from "../../domain/entities/payment";
import { PaymentStatus } from "../../domain/value_object/paymentStatus";
import PaymentModel from "../model/payment.model";

export default class PaymentModelMapper {
  static map(input: PaymentModel): Payment {
    return Payment.New(
      input.id,
      input.order_id,
      input.integration_id,
      input.qr_code,
      input.total.toNumber(),
      new PaymentStatus(input.status),
      input.paid_at,
      input.created_at,
      input.updated_at
    );
  }
}
