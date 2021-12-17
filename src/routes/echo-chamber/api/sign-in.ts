import { prisma } from '$lib/utilities/database';
import { respond } from './_respond';

export const post = async (request) => {
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

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      headers: { Location: `/echo-chamber/sign-in?error=No+such+user+exists` },
      status: 303,
    };
  }

  if (user.password !== password) {
    return {
      headers: { Location: `/echo-chamber/sign-in?error=Incorrect+password` },
      status: 303,
    };
  }

  return respond({ user });
};
