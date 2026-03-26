export default function StatusBanner({ tone, title, message }) {
  return (
    <div
      className={`status-banner ${tone}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}
