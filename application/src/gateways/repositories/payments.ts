import { PaymentStatus } from "../../domain/value_object/paymentStatus";
import { Payment } from "../../domain/entities/payment";
import RecordNotFoundError from "../../domain/error/RecordNotFoundError";
import { IPaymentGateway } from "../../interfaces/gateways";
import { DbConnection } from "../../interfaces/dbconnection";
import PaymentModel from "../model/payment.model";
import PaymentModelMapper from "../mapper/payment.mapper";

export class PaymentGateway implements IPaymentGateway {
  private repositoryData: DbConnection;

  constructor(connection: DbConnection) {
    this.repositoryData = connection;
  }

  async getAll(): Promise<Array<Payment>> {
    const payments = await this.repositoryData.payment.findMany({});

    return payments.map(PaymentModelMapper.map);
  }

  async get(id: number): Promise<Payment> {
    const payment = await this.repositoryData.payment.findFirst({
      where: { id: id },
    });

    if (!payment)
      throw new RecordNotFoundError("Nenhum pagamento foi encontrado");

    return PaymentModelMapper.map(payment);
  }

  async save(payment: Payment): Promise<Payment> {
    const savedPayment: PaymentModel = await this.repositoryData.payment.create(
      {
        data: {
          order_id: payment.orderId,
          integration_id: payment.integrationId,
          status: payment.status.value(),
          qr_code: payment.qrCode,
          total: payment.total,
        },
      }
    );

    return PaymentModelMapper.map(savedPayment);
  }

  async updateStatus(
    id: number,
    paymentStatus: PaymentStatus
  ): Promise<Payment> {
    const paymentCount = await this.repositoryData.payment.count({
      where: { id: id },
    });

    if (paymentCount <= 0) {
      throw new RecordNotFoundError("No payment found for the given id");
    }

    const updatedPayment: PaymentModel =
      await this.repositoryData.payment.update({
        where: {
          id: id,
        },
        data: {
          status: paymentStatus.value(),
          paid_at: paymentStatus.isPaid() ? new Date() : null,
        },
      });

    return PaymentModelMapper.map(updatedPayment);
  }

  async getByIntegrationID(integrationID: string): Promise<Payment> {
    const payment: PaymentModel | undefined =
      await this.repositoryData.payment.findFirst({
        where: { integration_id: integrationID },
      });

    if (!payment) {
      throw new RecordNotFoundError(
        "No payment found for the given integration ID"
      );
    }

    return PaymentModelMapper.map(payment);
  }
}
