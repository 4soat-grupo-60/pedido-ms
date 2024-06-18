import { Payment } from "../../domain/entities/payment";
import { PaymentResponse } from "../model/payment.response.model";

export class PaymentPresenter {
  static mapList(data: Payment[]): PaymentResponse[] {
    return data.map(PaymentPresenter.map);
  }

  static map(data: Payment): PaymentResponse {
    return {
      id: data.id,
      paid_at: data.paidAt,
    };
  }
}
