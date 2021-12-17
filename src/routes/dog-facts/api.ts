import type { RequestHandler } from '@sveltejs/kit';
import data from './dog-facts.json';

const shuffle = <T>(data: T[]): T[] => {
  return data.sort(() => {
    if (Math.round(Math.random())) return 1;
    return -1;
  });
};

export const get: RequestHandler = async (request) => {
  const { query } = request;
  const amount = query.get('amount')?.toLowerCase();

  const facts: DogFact[] = shuffle(data).slice(0, +amount);

  return {
    body: {
      facts,
    },
  };
};
