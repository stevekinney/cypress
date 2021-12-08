<h2>Sign Up</h2>

<form on:submit action="/echo-chamber/api/sign-up" method="post">
	<label for="email">Email Address</label><input type="email" name="email" id="email" required />
	<label for="password">Password</label><input
		type="password"
		name="password"
		id="password"
		required
	/>
	<button type="submit">Sign Up</button>
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
