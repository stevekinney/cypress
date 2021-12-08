import { prisma } from '$lib/utilities/database';
import { respond } from './_respond';
import type { RequestHandler } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export const post = async (request) => {
	console.log('hi');
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
			email
		}
	});

	console.log({ user, email, password });

	return respond({ user });
};
