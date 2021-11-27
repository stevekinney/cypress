import { prisma } from '$lib/utilities/database';
import type { RequestHandler } from '@sveltejs/kit';
import type { ReadOnlyFormData } from '@sveltejs/kit/types/helper';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export const get: RequestHandler = async (request) => {
	const post = await prisma.post.findUnique({
		where: {
			id: +request.params.id
		}
	});

	if (post) {
		return {
			body: {
				post
			}
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
	const text = request.body.get('text');

	const post = await prisma.post.update({
		data: {
			text
		},
		where: {
			id: +request.params.id
		}
	});

	if (request.headers.accept !== 'application/json') {
		return {
			headers: { Location: `/echo-chamber/${post.id}` },
			status: 303
		};
	}

	return {
		status: 200,
		body: { post }
	};
};

export const del: RequestHandler = async (request) => {
	const id = +request.params.id;

	await prisma.post.delete({
		where: {
			id
		}
	});

	if (request.method.toLowerCase() === 'post') {
		return {
			headers: { Location: '/echo-chamber' },
			status: 303
		};
	}

	return {
		status: 200
	};
};
