/**
 * Format a date string to a human-readable form.
 * @param {string} dateStr  e.g. "2024-07-20"
 * @returns {string}  e.g. "Jul 20, 2024"
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Return a greeting based on current hour.
 * @returns {string}  "Good morning" | "Good afternoon" | "Good evening"
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Return relative time string.
 * @param {string} dateStr
 * @param {string} timeStr
 * @returns {string}
 */
export function formatRelativeDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(dateStr);
}
