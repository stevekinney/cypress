import type { RequestHandler } from '@sveltejs/kit';
import data from './secret-menu.json';

export const get: RequestHandler = async () => {
  return {
    body: {
      data,
    },
  };
};
