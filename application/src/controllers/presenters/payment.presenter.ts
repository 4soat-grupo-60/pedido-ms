import { Payment } from "../../domain/entities/payment";
import { PaymentResponse } from "../model/payment.response.model";

export class PaymentPresenter {
  static mapList(data: Payment[]): PaymentResponse[] {
    return data.map(PaymentPresenter.map);
  }

  static map(data: Payment): PaymentResponse {
    return {
      id: data.id,
      order_id: data.orderId,
      integration_id: data.integrationId,
      qr_code: data.qrCode,
      total: data.total,
      status: data.status.value(),
      paid_at: data.paidAt,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
    };
  }
}
