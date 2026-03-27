function formatDate(isoDate) {
  if (!isoDate) {
    return 'Just now';
  }

  const parsedDate = new Date(isoDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Recently updated';
  }

  return parsedDate.toLocaleString();
}

export default function PostCard({ post, isDeleting, onDelete }) {
  return (
    <article className="post-card">
      <div className="post-card-header">
        <div>
          <p className="post-author">{post.author || 'Anonymous'}</p>
          <h3>{post.title}</h3>
        </div>
        <button
          className="danger-button"
          type="button"
          disabled={isDeleting}
          onClick={() => onDelete(post.id)}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-footer">
        <span>Created: {formatDate(post.createdAt)}</span>
      </div>
    </article>
  );
}
