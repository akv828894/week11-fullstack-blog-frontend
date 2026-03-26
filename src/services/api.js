const fallbackUrl = 'http://localhost:5000';
const baseUrl = (import.meta.env.VITE_API_URL || fallbackUrl).replace(/\/$/, '');

async function apiRequest(path, options = {}) {
  let response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch (networkError) {
    throw new Error(
      'Unable to reach the Week 11 backend. Check that the API server is running and the URL is correct.',
    );
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detailMessage =
      Array.isArray(payload.details) && payload.details.length > 0
        ? ` ${payload.details.join(' ')}`
        : '';

    throw new Error(
      payload.message
        ? `${payload.message}${detailMessage}`
        : 'Request failed. Check whether the backend is running.',
    );
  }

  return payload;
}

export function getPosts() {
  return apiRequest('/posts');
}

export function createPost(postData) {
  return apiRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
}

export function deletePostById(postId) {
  return apiRequest(`/posts/${postId}`, {
    method: 'DELETE',
  });
}
