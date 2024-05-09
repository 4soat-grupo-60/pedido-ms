import { Product } from "../../domain/entities/product";
import ProductModel from "../model/product.model";

export default class ProductMapper {
  static map(d: ProductModel): Product {
    return Product.New(
      d.id,
      d.name,
      d.description,
      d.category,
      d.price.toNumber(),
      d.active,
      d.created_at,
      d.updated_at
    );
  }
}
