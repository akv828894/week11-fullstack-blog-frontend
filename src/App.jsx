import { startTransition, useEffect, useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import StatusBanner from './components/StatusBanner';
import { apiBaseUrl, createPost, deletePostById, getPosts } from './services/api';

const initialForm = {
  title: '',
  author: '',
  content: '',
};

const initialFieldErrors = {
  title: '',
  author: '',
  content: '',
};

function normalizeFormValues(formValues) {
  return {
    title: formValues.title.trim(),
    author: formValues.author.trim(),
    content: formValues.content.trim(),
  };
}

function validateFormValues(formValues) {
  const nextErrors = { ...initialFieldErrors };
  const normalizedValues = normalizeFormValues(formValues);

  if (normalizedValues.title.length < 4) {
    nextErrors.title = 'Title should be at least 4 characters long.';
  }

  if (normalizedValues.author.length < 2) {
    nextErrors.author = 'Author name should be at least 2 characters long.';
  }

  if (normalizedValues.content.length < 20) {
    nextErrors.content = 'Content should be at least 20 characters long.';
  }

  return nextErrors;
}

function hasValidationErrors(fieldErrors) {
  return Object.values(fieldErrors).some(Boolean);
}

function formatSyncTime(value) {
  if (!value) {
    return 'Waiting for first sync';
  }

  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(value);
}

export default function App() {
  const [posts, setPosts] = useState([]);
  const [formValues, setFormValues] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState(initialFieldErrors);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState('');
  const [notice, setNotice] = useState(null);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  async function loadPosts({ refresh = false } = {}) {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await getPosts();
      startTransition(() => {
        setPosts(response.data);
      });
      setLastSyncedAt(new Date());
      setNotice((currentNotice) => (currentNotice?.tone === 'error' ? null : currentNotice));
    } catch (loadError) {
      setNotice({
        tone: 'error',
        title: refresh ? 'Refresh failed' : 'Backend connection problem',
        message: loadError.message,
      });
    } finally {
      if (refresh) {
        setIsRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    void loadPosts();
  }, []);

  function handleFieldChange(field, value) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [field]: '',
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextFieldErrors = validateFormValues(formValues);

    setFieldErrors(nextFieldErrors);

    if (hasValidationErrors(nextFieldErrors)) {
      setNotice({
        tone: 'error',
        title: 'Form needs attention',
        message: 'Please fix the highlighted fields before publishing the post.',
      });
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      const response = await createPost(normalizeFormValues(formValues));
      startTransition(() => {
        setPosts((currentPosts) => [response.data, ...currentPosts]);
      });
      setFormValues(initialForm);
      setFieldErrors(initialFieldErrors);
      setLastSyncedAt(new Date());
      setNotice({
        tone: 'success',
        title: 'Post published',
        message: 'The new post was added to your Week 11 feed successfully.',
      });
    } catch (submitError) {
      setNotice({
        tone: 'error',
        title: 'Could not publish post',
        message: submitError.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(postId) {
    setDeletingPostId(postId);
    setNotice(null);

    try {
      await deletePostById(postId);
      startTransition(() => {
        setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
      });
      setLastSyncedAt(new Date());
      setNotice({
        tone: 'success',
        title: 'Post deleted',
        message: 'The selected post was removed from the feed.',
      });
    } catch (deleteError) {
      setNotice({
        tone: 'error',
        title: 'Delete failed',
        message: deleteError.message,
      });
    } finally {
      setDeletingPostId('');
    }
  }

  return (
    <div className="page-shell">
      <div className="backdrop backdrop-one" />
      <div className="backdrop backdrop-two" />

      <main className="app-layout">
        <section className="hero-card">
          <p className="eyebrow">Week 11 | MERN Integration</p>
          <h1>Fullstack Blog Control Room</h1>
          <p className="hero-copy">
            This frontend talks to your API in real time. Create posts, refresh the feed, and manage
            your Week 11 blog flow from one dashboard.
          </p>
          <div className="hero-meta">
            <span>Frontend: React + Vite</span>
            <span>Backend: {apiBaseUrl}</span>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">Create Post</p>
                <h2>Publish from the UI</h2>
              </div>
            </div>

            <p className="panel-note">
              Fill all three fields properly before publishing. Short drafts get blocked so your demo
              looks more professional.
            </p>

            <PostForm
              formValues={formValues}
              fieldErrors={fieldErrors}
              isSubmitting={isSubmitting}
              onFieldChange={handleFieldChange}
              onSubmit={handleSubmit}
            />
          </div>

          <div className="panel">
            <div className="panel-heading posts-heading">
              <div>
                <p className="panel-kicker">Live Feed</p>
                <h2>Posts from your backend</h2>
                <p className="feed-summary">
                  {posts.length} post{posts.length === 1 ? '' : 's'} loaded |{' '}
                  {isLoading ? 'Loading feed...' : isRefreshing ? 'Refreshing feed...' : `Last sync ${formatSyncTime(lastSyncedAt)}`}
                </p>
              </div>
              <button
                className="ghost-button"
                type="button"
                disabled={isLoading || isRefreshing}
                onClick={() => void loadPosts({ refresh: true })}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            {notice ? (
              <StatusBanner
                tone={notice.tone}
                title={notice.title}
                message={notice.message}
              />
            ) : null}

            <PostList
              posts={posts}
              isLoading={isLoading}
              isRefreshing={isRefreshing}
              deletingPostId={deletingPostId}
              onDelete={handleDelete}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
