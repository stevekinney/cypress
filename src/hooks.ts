import { decodeToken } from '$lib/utilities/jwt';
import * as cookie from 'cookie';

export async function handle({ request, resolve }) {
  const cookies = cookie.parse(request.headers.cookie || '');
  const jwt = cookies.jwt && decodeToken(cookies.jwt);
  request.locals.user = jwt ? JSON.parse(jwt) : null;
  return await resolve(request);
}

export function getSession({ locals }) {
  return {
    user: locals.user && {
      id: +locals.user.id,
      email: locals.user.email,
    },
  };
}
