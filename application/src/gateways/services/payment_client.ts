import {IPaymentGateway} from "../../interfaces/gateways";
import {Payment} from "../../domain/entities/payment";
import PaymentModelMapper from "../mapper/payment.mapper";
import PaymentResponseModel from "./model/payment.response.model";

export class PaymentClient implements IPaymentGateway {

  apiUrl: string;

  constructor() {
    this.apiUrl = process.env.PAYMENT_API_URL;
  }

  async get(id: string): Promise<Payment> {
    const url = `${this.apiUrl}/api/payments/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error fetching payment by ID');
    }
    const paymentResponse = await response.json() as PaymentResponseModel;
    return PaymentModelMapper.mapResponse(paymentResponse);
  }
}