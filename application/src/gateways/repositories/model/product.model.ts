import {Prisma} from "@prisma/client";

export default interface ProductModel {
  id: string;
  name: string;
  description: string;
  category: string;
  price: Prisma.Decimal;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
}
