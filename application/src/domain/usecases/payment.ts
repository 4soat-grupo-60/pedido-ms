import {Payment} from "../entities/payment";
import {PaymentStatus} from "../value_object/paymentStatus";
import {IOrderGateway, IPaymentGateway, IPaymentGatewayService,} from "../../interfaces/gateways";
import {OrderUseCases} from "./order";

export class PaymentUseCases {
  static async getAllPayments(
    paymentGateway: IPaymentGateway
  ): Promise<Array<Payment>> {
    return await paymentGateway.getAll();
  }

  static async getPayment(
    id: number,
    paymentGateway: IPaymentGateway
  ): Promise<Payment> {
    return await paymentGateway.get(id);
  }

  static async save(
    orderId: number,
    orderGateway: IOrderGateway,
    paymentGatewayGateway: IPaymentGatewayService,
    paymentGateway: IPaymentGateway
  ): Promise<Payment> {
    const order = await orderGateway.getOrderByID(orderId);

    const { identifier, QRCode } = await paymentGatewayGateway.create();

    const payment = new Payment(
      orderId,
      identifier,
      QRCode,
      order.valueTotal.getValueMoney()
    );

    const savedPayment = await paymentGateway.save(payment);

    await this._notifyOrderPayment(savedPayment, orderGateway);

    return savedPayment;
  }

  static async processPayment(
    integrationID: string,
    status: string,
    paymentGateway: IPaymentGateway,
    orderGateway: IOrderGateway
  ): Promise<Payment> {
    const payment = await paymentGateway.getByIntegrationID(integrationID);

    const newStatus = this._processStatus(status);

    return await this.updateStatus(
      payment.id,
      newStatus,
      paymentGateway,
      orderGateway
    );
  }

  static async updateStatus(
    id: number,
    status: PaymentStatus,
    paymentGateway: IPaymentGateway,
    orderGateway: IOrderGateway
  ): Promise<Payment> {
    const updatedPayment = await paymentGateway.updateStatus(id, status);

    await this._notifyOrderPayment(updatedPayment, orderGateway);

    return updatedPayment;
  }

  private static _processStatus(status: string): PaymentStatus {
    switch (status) {
      case "paid":
        return new PaymentStatus(PaymentStatus.PAGO);
      case "cancelled":
        return new PaymentStatus(PaymentStatus.CANCELADO);
      case "refused":
        return new PaymentStatus(PaymentStatus.RECUSADO);
      default:
        return new PaymentStatus(PaymentStatus.PENDENTE);
    }
  }

  private static async _notifyOrderPayment(
    payment: Payment,
    orderGateway: IOrderGateway
  ) {
    await OrderUseCases.updatePayment(payment.orderId, payment, orderGateway);
  }
}
