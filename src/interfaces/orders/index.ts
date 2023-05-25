import { OrderItemsInterface } from 'interfaces/order-items';

export interface OrdersInterface {
  id?: string;
  customer_id?: string;
  restaurant_id?: string;
  status: string;
  order_type: string;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  order_items?: OrderItemsInterface[];
}
