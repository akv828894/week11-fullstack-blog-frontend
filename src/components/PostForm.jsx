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
          placeholder="Write a clear headline"
          value={formValues.title}
          onChange={(event) => onFieldChange('title', event.target.value)}
          aria-invalid={Boolean(fieldErrors.title)}
          aria-describedby="post-title-help"
          required
        />
        <small id="post-title-help" className={fieldErrors.title ? 'field-error' : 'field-help'}>
          {fieldErrors.title || 'Use a short, clear blog headline.'}
        </small>
      </label>

      <label className="field">
        <span>Author Name</span>
        <input
          className={fieldErrors.author ? 'input-error' : ''}
          type="text"
          placeholder="Your name"
          value={formValues.author}
          onChange={(event) => onFieldChange('author', event.target.value)}
          aria-invalid={Boolean(fieldErrors.author)}
          aria-describedby="post-author-help"
          required
        />
        <small id="post-author-help" className={fieldErrors.author ? 'field-error' : 'field-help'}>
          {fieldErrors.author || 'Use the name you want to show in the demo.'}
        </small>
      </label>

      <label className="field">
        <span>Content</span>
        <textarea
          className={fieldErrors.content ? 'input-error' : ''}
          rows="7"
          placeholder="Write the content that should be saved in MongoDB"
          value={formValues.content}
          onChange={(event) => onFieldChange('content', event.target.value)}
          aria-invalid={Boolean(fieldErrors.content)}
          aria-describedby="post-content-help"
          required
        />
        <small id="post-content-help" className={fieldErrors.content ? 'field-error' : 'field-help'}>
          {fieldErrors.content || 'Aim for at least 20 characters so the post feels real.'}
        </small>
      </label>

      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Publishing...' : 'Create Post'}
      </button>

      <p className="form-note">
        Demo tip: create one post, refresh the feed, then delete it to show the full Week 11 flow.
      </p>
    </form>
  );
}
