import PostCard from './PostCard';

export default function PostList({
  posts,
  isLoading,
  isRefreshing,
  deletingPostId,
  onDelete,
}) {
  if (isLoading) {
    return <p className="empty-state">Loading posts...</p>;
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <p>No posts found.</p>
        <p>Create a post using the form.</p>
      </div>
    );
  }

  return (
    <div className="post-list-wrap">
      {isRefreshing ? <p className="refresh-indicator">Refreshing posts...</p> : null}

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
