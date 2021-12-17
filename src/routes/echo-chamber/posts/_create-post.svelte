<script lang="ts">
  import { goto, invalidate } from '$app/navigation';
  const endpoint = '/echo-chamber/api';

  export let user: User;

  const createPost = (event) => {
    const form: HTMLFormElement = event.target;
    const formData = new FormData(form);

    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: JSON.stringify(data),
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
        return goto(`/echo-chamber/posts/${post.id}`);
      })
      .then(() => {
        return invalidate(endpoint);
      });
  };
</script>

<form
  id="new-post"
  class="bg-purple-200 p-4 border-2 border-purple-400 w-full h-36 flex flex-col justify-around"
  action={endpoint}
  method="post"
  data-test="post-create-form"
  on:submit|preventDefault={createPost}
>
  <input type="hidden" id="user" name="authorId" value={user.id} />
  <input
    id="content"
    class="w-full mb-2"
    name="content"
    aria-label="New Post"
    required
    data-test="post-create-content-input"
    placeholder="What if your hottest take?"
  />
  <button type="submit" class="w-full" data-test="post-create-submit">Post</button>
</form>
