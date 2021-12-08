<script context="module">
	export async function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {};
	}
</script>

<h2>Sign In</h2>

<form on:submit action="/echo-chamber/api/sign-in" method="post">
	<label for="email">Email Address</label><input type="email" name="email" id="email" required />
	<label for="password">Password</label><input
		type="password"
		name="password"
		id="password"
		required
	/>
	<button type="submit">Sign In</button>
</form>

<style lang="postcss">
	form {
		@apply flex flex-col gap-2;
	}

	label {
		@apply block;
	}

	button {
		@apply block;
	}
</style>
