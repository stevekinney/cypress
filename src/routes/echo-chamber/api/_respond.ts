export function respond(body: any) {
	if (body.errors) {
		return { status: 401, body };
	}

	const { user } = body;
	const json = JSON.stringify(user);
	const value = Buffer.from(json).toString('base64');

	return {
		status: 302,
		headers: {
			'set-cookie': `jwt=${value}; Path=/; HttpOnly`,
			Location: '/echo-chamber/posts'
		},
		body
	};
}
