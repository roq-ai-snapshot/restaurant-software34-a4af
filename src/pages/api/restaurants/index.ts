import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getRestaurants();
    case 'POST':
      return createRestaurants();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRestaurants() {
    let body: any = {};
    if (req.query) {
      if (req.query.relations) {
        body = { ...body, include: {} };
        if (Array.isArray(req.query.relations)) {
          req.query.relations.forEach((relation) => {
            body.include[relation] = true;
          });
        } else {
          body.include[req.query.relations] = true;
        }
      }
    }

    const data = await prisma.restaurants.findMany(body);
    return res.status(200).json(data);
  }

  async function createRestaurants() {
    await restaurantsValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.favorites?.length > 0) {
      const create_favorites = body.favorites;
      body.favorites = {
        create: create_favorites,
      };
    } else {
      delete body.favorites;
    }
    if (body?.inventory_items?.length > 0) {
      const create_inventory_items = body.inventory_items;
      body.inventory_items = {
        create: create_inventory_items,
      };
    } else {
      delete body.inventory_items;
    }
    if (body?.menus?.length > 0) {
      const create_menus = body.menus;
      body.menus = {
        create: create_menus,
      };
    } else {
      delete body.menus;
    }
    if (body?.orders?.length > 0) {
      const create_orders = body.orders;
      body.orders = {
        create: create_orders,
      };
    } else {
      delete body.orders;
    }
    if (body?.staff_members?.length > 0) {
      const create_staff_members = body.staff_members;
      body.staff_members = {
        create: create_staff_members,
      };
    } else {
      delete body.staff_members;
    }
    const data = await prisma.restaurants.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
