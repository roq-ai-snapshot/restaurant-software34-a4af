import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { inventoryItemsValidationSchema } from 'validationSchema/inventory-items';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getInventoryItemsById();
    case 'PUT':
      return updateInventoryItemsById();
    case 'DELETE':
      return deleteInventoryItemsById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getInventoryItemsById() {
    const data = await prisma.inventory_items.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updateInventoryItemsById() {
    await inventoryItemsValidationSchema.validate(req.body);
    const data = await prisma.inventory_items.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteInventoryItemsById() {
    const data = await prisma.inventory_items.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
