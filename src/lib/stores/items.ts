import { createItem } from '$lib/utilities/create-item';
import { derived, writable } from 'svelte/store';

const store = writable<Item[]>([
  createItem('Tooth Brush'),
  createItem('Tooth Paste'),
  createItem('Deoderant'),
  createItem('iPhone Charger'),
  createItem('Hoodie', true),
]);

export const add = (title: string) => {
  store.update((items) => items.concat(createItem(title)));
};

export const remove = (id: number) => {
  store.update((items) => items.filter((item) => item.id !== id));
};

export const toggle = (id: number) =>
  store.update((items) =>
    items.map((item) => {
      if (item.id !== id) return item;
      return { ...item, packed: !item.packed };
    }),
  );

export const markAllAsUnpacked = () => {
  store.update((items) => items.map((item) => ({ ...item, packed: false })));
};

export const removeAll = () => {
  store.set([]);
};

export const filter = writable('');

export const items = derived([store, filter], ([$store, $filter]) => {
  if (!filter) return $store;
  return $store.filter((item) => item.title.toLowerCase().startsWith($filter.toLowerCase()));
});

export const packed = derived(items, ($items) => $items.filter((item) => !!item.packed));
export const unpacked = derived(items, ($items) => $items.filter((item) => !item.packed));
