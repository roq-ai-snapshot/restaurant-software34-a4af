import { OrderItemsInterface } from 'interfaces/order-items';

export interface MenuItemsInterface {
  id?: string;
  menu_id?: string;
  name: string;
  price: number;
  availability: boolean;
  order_items?: OrderItemsInterface[];
}
