import { prisma } from '$lib/utilities/database';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export const post = async (request: ServerRequest<Record<string, any>>) => {
  let user;
  let email: string;
  let password: string;

  if (typeof request.body === 'string') {
    email = JSON.parse(request.body).email;
    password = JSON.parse(request.body).password;
  } else if (request.body instanceof Uint8Array) {
    email = JSON.parse(request.body.toString()).email;
    password = JSON.parse(request.body.toString()).password;
  } else {
    email = request.body.get('email');
    password = request.body.get('password');
  }

  try {
    user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  } catch (error) {
    return {
      headers: { Location: `/echo-chamber/sign-up?error=A+user+already+exists+with+that+email.` },
      status: 303,
    };
  }

  if (!user) {
    return {
      headers: { Location: `/echo-chamber/sign-up?error=No+such+user+exists.` },
      status: 303,
    };
  }

  return {
    status: 302,
    headers: {
      Location: '/echo-chamber',
    },
    body: {
      user: {
        id: user.id,
        email: user.email,
      },
    },
  };
};
