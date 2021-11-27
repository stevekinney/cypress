import { prisma } from '$lib/utilities/database';
import type { RequestHandler } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';
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

export const post = async (request: ServerRequest<Record<string, any>>) => {
	let text: string;

	if (typeof request.body === 'string') {
		text = JSON.parse(request.body).text;
	} else if (request.body instanceof Uint8Array) {
		text = JSON.parse(request.body.toString()).text;
	} else {
		text = request.body.get('text');
	}

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
		status: 201,
		body: { post }
	};
};
