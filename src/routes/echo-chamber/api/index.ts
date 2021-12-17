import { prisma } from '$lib/utilities/database';
import type { RequestHandler } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export const get: RequestHandler = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  if (posts) {
    return {
      body: {
        posts,
      },
    };
  }
};

export const post = async (request: ServerRequest<Record<string, any>>) => {
  let content: string;
  let authorId: number;

  if (typeof request.body === 'string') {
    content = JSON.parse(request.body).content;
    authorId = +JSON.parse(request.body).authorId;
  } else if (request.body instanceof Uint8Array) {
    content = JSON.parse(request.body.toString()).content;
    authorId = +JSON.parse(request.body.toString()).authorId;
  } else {
    content = request.body.get('content');
    authorId = +request.body.get('authorId');
  }

  const post = await prisma.post.create({
    data: {
      authorId,
      content,
    },
  });

  if (request.headers.accept !== 'application/json') {
    return {
      headers: { Location: `/echo-chamber/posts/${post.id}` },
      status: 303,
    };
  }

  return {
    status: 201,
    body: { post },
  };
};
