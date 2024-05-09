import { Prisma } from "@prisma/client";

export default interface PaymentModel {
  id: number;
  order_id: number;
  integration_id: string;
  qr_code: string;
  total: Prisma.Decimal;
  status: string;
  paid_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
