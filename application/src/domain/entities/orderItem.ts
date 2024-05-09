import { Product } from "./product";
import { Order } from "./order";
import { Money } from "../value_object/money";

export class OrderItem {
  private _id: number;
  private _orderId: number;
  private _product: Product;
  private _quantity: number;
  private _value: Money;
  private _total: Money;

  constructor(product: Product, quantity: number) {
    this._product = product;
    this._quantity = quantity;
    this._value = new Money(product.getValueProduct());
    this._total = new Money(this._quantity * this._value.getValueMoney());
  }

  static New(
    id: number,
    orderId: number,
    product: Product,
    quantity: number,
    value: number,
    total: number
  ): OrderItem {
    const i = new OrderItem(product, quantity);
    i._id = id;
    i._orderId = orderId;
    i._product = product;
    i._quantity = quantity;
    i._value = new Money(value);
    i._total = new Money(total);
    return i;
  }

  get id(): number {
    return this._id;
  }

  get orderId(): number {
    return this._orderId;
  }

  get product(): Product {
    return this._product;
  }

  get quantity(): number {
    return this._quantity;
  }

  get value(): number {
    return this._value.getValueMoney();
  }

  get total(): number {
    return this._total.getValueMoney();
  }
}
