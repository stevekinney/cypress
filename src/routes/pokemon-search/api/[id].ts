import type { RequestHandler } from '@sveltejs/kit';
import data from './pokemon.json';

export const get: RequestHandler = async (request) => {
  const { params } = request;

  for (const pokemon of data) {
    if (pokemon.id === +params.id) return { body: { pokemon } };
  }

  return {
    status: 404,
  };
};
