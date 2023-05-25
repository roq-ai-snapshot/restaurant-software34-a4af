import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { inventoryItemsValidationSchema } from 'validationSchema/inventory-items';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getInventoryItems();
    case 'POST':
      return createInventoryItems();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInventoryItems() {
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

    const data = await prisma.inventory_items.findMany(body);
    return res.status(200).json(data);
  }

  async function createInventoryItems() {
    await inventoryItemsValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.inventory_items.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
