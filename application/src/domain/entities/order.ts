import { Product } from "./product";
import { Money } from "../value_object/money";
import { OrderStatus } from "../value_object/orderStatus";
import { OrderItem } from "./orderItem";
import { CPF } from "../value_object/cpf";

export class Order {
  private _id: number;
  private _items: Array<OrderItem>;
  private _clientCPF?: CPF;
  private _paymentId?: string;
  private _paymentDate?: Date;
  private _valueTotal: Money;
  private _status: OrderStatus;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(products: Array<OrderItem>) {
    this._items = products;
    this._status = OrderStatus.CRIADO;

    this.calculateTotalValue();
  }

  static New(
    id: number,
    items: Array<OrderItem>,
    valueTotal: number,
    status: string,
    clientCPF?: CPF,
    paymentId?: string,
    paymentDate?: Date,
    createdAt?: Date,
    updatedAt?: Date
  ): Order {
    const o = new Order([]);
    o._id = id;
    o._items = items;
    o._clientCPF = clientCPF;
    o._paymentId = paymentId;
    o._paymentDate = paymentDate;
    o._valueTotal = new Money(valueTotal);
    o._status = new OrderStatus(status);
    o._createdAt = createdAt;
    o._updatedAt = updatedAt;
    return o;
  }

  public addProduct(product: Product): void {
    this._items.push(new OrderItem(product, 1));

    this.calculateTotalValue();
  }

  public calculateTotalValue(): void {
    let calcValueTotal: number = 0.0;

    for (let item of this._items) {
      calcValueTotal += item.value;
    }

    this._valueTotal = new Money(calcValueTotal);
  }

  get id(): number {
    return this._id;
  }

  get items(): Array<OrderItem> {
    return this._items;
  }

  get clientCPF(): CPF | null {
    return this._clientCPF;
  }

  get valueTotal(): Money {
    return this._valueTotal;
  }

  get status(): OrderStatus {
    return this._status;
  }

  setClientCPF(cpf: CPF): void {
    this._clientCPF = cpf;
  }

  setStatus(status: OrderStatus): void {
    this._status = status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get paymentId(): string {
    return this._paymentId;
  }

  setPaymentId(value: string) {
    this._paymentId = value;
  }

  get paymentDate(): Date {
    return this._paymentDate;
  }

  setPaymentDate(value: Date) {
    this._paymentDate = value;
  }
}
