import {Prisma} from "@prisma/client";

export default interface ProductResponseModel {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
}
