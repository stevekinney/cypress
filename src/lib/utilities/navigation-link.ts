import { page } from '$app/stores';

export const navigationLink = (node: HTMLLinkElement) => {
  const unsubscribe = page.subscribe(({ path }) => {
    if (path.startsWith(node.getAttribute('href'))) {
      node.dispatchEvent(new CustomEvent('routeChange', { detail: true }));
    } else {
      node.dispatchEvent(new CustomEvent('routeChange', { detail: false }));
    }
  });

  return {
    destroy() {
      unsubscribe();
    },
  };
};
