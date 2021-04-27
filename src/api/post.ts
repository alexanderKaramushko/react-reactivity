export async function fetchPost(id: number): Promise<unknown> {
  const response = await window.fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  // eslint-disable-next-line no-return-await
  return await response.json();
}

export async function fetchPostComments(postId: number): Promise<unknown> {
  const response = await window.fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  // eslint-disable-next-line no-return-await
  return await response.json();
}
