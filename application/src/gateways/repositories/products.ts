import { Product } from "../../domain/entities/product";
import { Category } from "../../domain/value_object/category";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import RecordNotFoundError from "../../domain/error/RecordNotFoundError";
import { IProductGateway } from "../../interfaces/gateways";
import { DbConnection } from "../../interfaces/dbconnection";
import ProductMapper from "../mapper/product.mapper";
import ProductModel from "../model/product.model";

const prismaErrorRecordNotFound = "P2025";

export class ProductGateway implements IProductGateway {
  private repositoryData: DbConnection;

  constructor(connection: DbConnection) {
    this.repositoryData = connection;
  }

  async getProductsByCategory(category: Category): Promise<Product[]> {
    const products: ProductModel[] = await this.repositoryData.product.findMany(
      {
        where: {
          category: category.getCategory(),
        },
      }
    );
    return products.map(ProductMapper.map);
  }

  async getProductByIDs(ids: number[]): Promise<Product[]> {
    const products: ProductModel[] = await this.repositoryData.product.findMany(
      {
        where: {
          id: {
            in: ids,
          },
        },
      }
    );
    return products.map(ProductMapper.map);
  }

  async getProducts(): Promise<Product[]> {
    const products: ProductModel[] = await this.repositoryData.product.findMany(
      {
        where: {
          active: true,
        },
      }
    );
    return products.map(ProductMapper.map);
  }

  async saveProduct(product: Product): Promise<Product> {
    const save: ProductModel = await this.repositoryData.product.create({
      data: {
        name: product.getName(),
        price: product.getValueProduct(),
        description: product.getDescription(),
        category: product.getCategory(),
        active: product.getActive(),
      },
    });

    return ProductMapper.map(save);
  }

  async updateProduct(product: Product): Promise<Product> {
    const update: ProductModel = await this.repositoryData.product.update({
      data: {
        name: product.getName(),
        price: product.getValueProduct(),
        description: product.getDescription(),
        category: product.getCategory(),
        active: product.getActive(),
      },
      where: {
        id: product.getId(),
      },
    });

    return ProductMapper.map(update);
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await this.repositoryData.product.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == prismaErrorRecordNotFound) {
          throw new RecordNotFoundError("No product found for the given id");
        }
      }
      throw e;
    }
  }
}
