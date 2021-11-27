import { prisma } from '$lib/utilities/database';
import type { RequestHandler } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export const get: RequestHandler = async () => {
	const posts = await prisma.post.findMany();

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

	await prisma.post.create({
		data: {
			text
		}
	});

	return {
		headers: { Location: '/echo-chamber' },
		status: 302
	};
};
