import { FavoritesInterface } from 'interfaces/favorites';
import { InventoryItemsInterface } from 'interfaces/inventory-items';
import { MenusInterface } from 'interfaces/menus';
import { OrdersInterface } from 'interfaces/orders';
import { StaffMembersInterface } from 'interfaces/staff-members';

export interface RestaurantsInterface {
  id?: string;
  owner_id?: string;
  name: string;
  location: string;
  contact_information: string;
  operating_hours: string;
  favorites?: FavoritesInterface[];
  inventory_items?: InventoryItemsInterface[];
  menus?: MenusInterface[];
  orders?: OrdersInterface[];
  staff_members?: StaffMembersInterface[];
}
