import { prisma } from '$lib/utilities/database';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
    },
  });

  if (users) {
    return {
      body: {
        users,
      },
    };
  }
};
