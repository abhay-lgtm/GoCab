export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' };
  return (
    <span
      className={`inline-block ${sizes[size]} border-2 rounded-full animate-spin ${className}`}
      style={{ borderColor: '#374151', borderTopColor: '#2563eb' }}
      role="status"
      aria-label="Loading"
    />
  );
}
