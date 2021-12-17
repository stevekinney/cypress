export const post = (endpoint: string, data?: Parameters<typeof JSON.stringify>[0]) => {
  return fetch(endpoint, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data || {}),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json());
};
