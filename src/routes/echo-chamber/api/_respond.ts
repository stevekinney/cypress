export function respond(body: any) {
	if (body.errors) {
		return { status: 401, body };
	}

	const { id, email } = body.user;
	const json = JSON.stringify({ id, email });
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
