import PostCard from './PostCard';

export default function PostList({
  posts,
  isLoading,
  isRefreshing,
  deletingPostId,
  onDelete,
}) {
  if (isLoading) {
    return <p className="empty-state">Loading posts from the backend...</p>;
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <p>No posts yet.</p>
        <p>Create the first post from the form and it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="post-list-wrap">
      {isRefreshing ? <p className="refresh-indicator">Refreshing posts from the server...</p> : null}

      <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isDeleting={deletingPostId === post.id}
          onDelete={onDelete}
        />
      ))}
      </div>
    </div>
  );
}
