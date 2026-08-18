export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' };
  return (
    <span
      className={`inline-block ${sizes[size]} border-2 rounded-full animate-spin ${className}`}
      style={{ borderColor: 'rgba(255,255,255,0.12)', borderTopColor: '#4f7eff' }}
      role="status"
      aria-label="Loading"
    />
  );
}
