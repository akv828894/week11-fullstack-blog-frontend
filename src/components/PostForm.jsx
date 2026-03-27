export default function PostForm({
  formValues,
  fieldErrors,
  isSubmitting,
  onFieldChange,
  onSubmit,
}) {
  return (
    <form className="post-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Post Title</span>
        <input
          className={fieldErrors.title ? 'input-error' : ''}
          type="text"
          placeholder="Enter post title"
          value={formValues.title}
          onChange={(event) => onFieldChange('title', event.target.value)}
          aria-invalid={Boolean(fieldErrors.title)}
          aria-describedby="post-title-help"
          required
        />
        <small id="post-title-help" className={fieldErrors.title ? 'field-error' : 'field-help'}>
          {fieldErrors.title || 'Title must be at least 4 characters long.'}
        </small>
      </label>

      <label className="field">
        <span>Author Name</span>
        <input
          className={fieldErrors.author ? 'input-error' : ''}
          type="text"
          placeholder="Enter author name"
          value={formValues.author}
          onChange={(event) => onFieldChange('author', event.target.value)}
          aria-invalid={Boolean(fieldErrors.author)}
          aria-describedby="post-author-help"
          required
        />
        <small id="post-author-help" className={fieldErrors.author ? 'field-error' : 'field-help'}>
          {fieldErrors.author || 'Author name must be at least 2 characters long.'}
        </small>
      </label>

      <label className="field">
        <span>Content</span>
        <textarea
          className={fieldErrors.content ? 'input-error' : ''}
          rows="7"
          placeholder="Write the blog content here"
          value={formValues.content}
          onChange={(event) => onFieldChange('content', event.target.value)}
          aria-invalid={Boolean(fieldErrors.content)}
          aria-describedby="post-content-help"
          required
        />
        <small id="post-content-help" className={fieldErrors.content ? 'field-error' : 'field-help'}>
          {fieldErrors.content || 'Content must be at least 20 characters long.'}
        </small>
      </label>

      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Create Post'}
      </button>
    </form>
  );
}
