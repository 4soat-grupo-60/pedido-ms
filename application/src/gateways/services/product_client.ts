import {IProductGateway} from "../../interfaces/gateways";
import {Product} from "../../domain/entities/product";
import ProductMapper from "../mapper/product.mapper";
import ProductResponseModel from "./model/product.response.model";

export class ProductClient implements IProductGateway {
  apiUrl: string;

  constructor() {
    this.apiUrl = process.env.PRODUCT_API_URL;
  }

  async getProductByIDs(ids: number[]): Promise<Array<Product>> {
    const url = `${this.apiUrl}/api/products?ids=${ids.join(',')}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error fetching products by IDs');
    }

    return this.mapResponse(response)
  }

  private async mapResponse(jsonData: Response) {
    const productResponse = await jsonData.json() as ProductResponseModel[];
    return productResponse.map(ProductMapper.mapResponse);
  }
}