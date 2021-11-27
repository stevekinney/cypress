import { prisma } from '$lib/utilities/database';
import type { RequestHandler } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export const get: RequestHandler = async () => {
	const posts = await prisma.post.findMany({
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	});

	if (posts) {
		return {
			body: {
				posts
			}
		};
	}
};

export const post: RequestHandler = async (request: ServerRequest<any, FormData>) => {
	const text = request.body.get('text');

	const post = await prisma.post.create({
		data: {
			text
		}
	});

	if (request.headers.accept !== 'application/json') {
		return {
			headers: { Location: `/echo-chamber/${post.id}` },
			status: 303
		};
	}

	return {
		status: 201
	};
};
