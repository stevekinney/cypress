import { prisma } from '$lib/utilities/database';
import type { RequestHandler } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export const get: RequestHandler = async (request) => {
  if (request.query.get('_method')?.toLowerCase() === 'delete') return del(request);

  const post = await prisma.post.findUnique({
    where: {
      id: +request.params.id,
    },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  if (post) {
    return {
      body: {
        post,
      },
    };
  }
};

export const post = async (request: ServerRequest<Record<string, any>, ReadOnlyFormData>) => {
  const { query } = request;

  if (query.get('_method')?.toLowerCase() === 'patch') return patch(request);
  if (query.get('_method')?.toLowerCase() === 'delete') return del(request);

  return { status: 404 };
};

export const patch = async (request: ServerRequest<Record<string, any>, ReadOnlyFormData>) => {
  const content = request.body.get('content');

  const post = await prisma.post.update({
    data: {
      content,
    },
    where: {
      id: +request.params.id,
    },
  });

  if (request.headers.accept !== 'application/json') {
    return {
      headers: { Location: `/echo-chamber/posts/${post.id}` },
      status: 303,
    };
  }

  return {
    status: 200,
    body: { post },
  };
};

export const del: RequestHandler = async (request) => {
  const id = +request.params.id;

  console.log('Delete');

  await prisma.post.delete({
    where: {
      id,
    },
  });

  if (request.method.toLowerCase() === 'post') {
    return {
      headers: { Location: '/echo-chamber/posts' },
      status: 303,
    };
  }

  return {
    status: 200,
  };
};
