import type { RequestHandler } from '@sveltejs/kit';
import data from './pokemon.json';

export const get: RequestHandler = async (request) => {
  const { query } = request;
  const name = query.get('name')?.toLowerCase();

  let pokemon = data.filter((p) => p.name?.toLowerCase()?.startsWith(name));

  return {
    body: {
      pokemon,
    },
  };
};
