import { getId } from './id';

export const createItem = (title: string, packed = false): Item => ({
  id: getId(),
  title,
  packed,
});
