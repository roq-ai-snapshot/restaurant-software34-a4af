import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { favoritesValidationSchema } from 'validationSchema/favorites';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getFavorites();
    case 'POST':
      return createFavorites();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFavorites() {
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

    const data = await prisma.favorites.findMany(body);
    return res.status(200).json(data);
  }

  async function createFavorites() {
    await favoritesValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.favorites.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
