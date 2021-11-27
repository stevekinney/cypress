<script lang="ts">
	import { goto, invalidate } from '$app/navigation';

	const createPost = (event) => {
		const form: HTMLFormElement = event.target;
		const formData = new FormData(form);

		const data = {};
		for (const [key, value] of formData.entries()) {
			data[key] = value;
		}

		fetch('/echo-chamber/hot-takes', {
			method: 'POST',
			headers: {
				accept: 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((response): Promise<{ post: Post }> => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((response) => {
				return response.post;
			})
			.then((post) => {
				return goto(`/echo-chamber/${post.id}`);
			})
			.then(() => {
				return invalidate('/echo-chamber/hot-takes');
			});
	};
</script>

<form
	id="new-post"
	class="my-4 bg-purple-200 p-4 border-2 border-purple-400 w-full"
	action="/echo-chamber/hot-takes"
	method="post"
	required
	on:submit|preventDefault={createPost}
>
	<input
		class="w-full mb-2"
		name="text"
		aria-label="New Post"
		placeholder="What if your hottest take?"
	/>
	<button class="w-full">Post</button>
</form>
