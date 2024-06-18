export default interface OrderItemMessageModel {
  id: number;
  order_id: number;
  product_id: string;
  product_name: string;
  product_description: string;
  product_category: string;
  product_price: number
  quantity: number;
  price: number;
  total: number;
}
