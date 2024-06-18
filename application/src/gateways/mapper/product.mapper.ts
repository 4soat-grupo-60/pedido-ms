import {Product} from "../../domain/entities/product";
import ProductModel from "../repositories/model/product.model";
import ProductResponseModel from "../services/model/product.response.model";
import OrderItemModel from "../repositories/model/order_item.model";

export default class ProductMapper {
  static map(d: OrderItemModel): Product {
    return Product.New(
      d.product_id,
      d.product_name,
      d.product_description,
      d.product_category,
      d.product_price.toNumber(),
      true
    );
  }

  static mapResponse(d: ProductResponseModel): Product {
    return Product.New(
      d.id,
      d.name,
      d.description,
      d.category,
      d.price,
      d.active
    );
  }
}
