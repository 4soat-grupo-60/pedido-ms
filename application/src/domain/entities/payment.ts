import { PaymentStatus } from "../value_object/paymentStatus";

export class Payment {
  get integrationId(): string {
    return this._integrationId;
  }

  private _id: number;
  private _orderId: number;
  private _integrationId: string;
  private _qrCode: string;
  private _total: number;
  private _status: PaymentStatus;
  private _paidAt?: Date;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(
    orderId: number,
    integrationId: string,
    qrCode: string,
    total: number
  ) {
    this._orderId = orderId;
    this._integrationId = integrationId;
    this._qrCode = qrCode;
    this._total = total;
    this._status = new PaymentStatus(PaymentStatus.PENDENTE);
  }

  static New(
    id: number,
    orderId: number,
    integrationId: string,
    qrCode: string,
    total: number,
    status: PaymentStatus,
    paidAt: Date,
    createdAt: Date,
    updatedAt: Date
  ): Payment {
    const py = new Payment(orderId, integrationId, qrCode, total);

    py._id = id;
    py._status = status;
    py._paidAt = paidAt;
    py._createdAt = createdAt;
    py._updatedAt = updatedAt;

    return py;
  }

  get id(): number {
    return this._id;
  }

  get orderId(): number {
    return this._orderId;
  }

  get qrCode(): string {
    return this._qrCode;
  }

  get total(): number {
    return this._total;
  }

  get status(): PaymentStatus {
    return this._status;
  }

  get paidAt(): Date {
    return this._paidAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
