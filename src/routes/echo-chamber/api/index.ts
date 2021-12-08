import { prisma } from '$lib/utilities/database';
import type { RequestHandler } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export const get: RequestHandler = async () => {
	const posts = await prisma.post.findMany({});

	if (posts) {
		return {
			body: {
				posts
			}
		};
	}
};

export const post = async (request: ServerRequest<Record<string, any>>) => {
	let content: string;

	if (typeof request.body === 'string') {
		content = JSON.parse(request.body).text;
	} else if (request.body instanceof Uint8Array) {
		content = JSON.parse(request.body.toString()).text;
	} else {
		content = request.body.get('text');
	}

	const post = await prisma.post.create({
		data: {
			content
		}
	});

	if (request.headers.accept !== 'application/json') {
		return {
			headers: { Location: `/echo-chamber/${post.id}` },
			status: 303
		};
	}

	return {
		status: 201,
		body: { post }
	};
};
