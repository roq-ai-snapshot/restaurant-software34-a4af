import { FavoritesInterface } from 'interfaces/favorites';
import { NotificationsInterface } from 'interfaces/notifications';
import { OrdersInterface } from 'interfaces/orders';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { StaffMembersInterface } from 'interfaces/staff-members';

export interface UsersInterface {
  id?: string;
  role: string;
  name: string;
  email: string;
  password: string;
  favorites?: FavoritesInterface[];
  notifications?: NotificationsInterface[];
  orders?: OrdersInterface[];
  restaurants?: RestaurantsInterface[];
  staff_members?: StaffMembersInterface[];
}
