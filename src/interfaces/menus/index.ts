import { MenuItemsInterface } from 'interfaces/menu-items';

export interface MenusInterface {
  id?: string;
  restaurant_id?: string;
  menu_items?: MenuItemsInterface[];
}
