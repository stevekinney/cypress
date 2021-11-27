import { prisma } from '$lib/utilities/database';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const post = await prisma.post.findUnique({
		where: {
			id: +params.id
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
