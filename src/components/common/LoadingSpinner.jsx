export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-10 w-10' };
  return (
    <span
      className={`inline-block ${sizes[size]} border-2 border-[#e4e8f0] border-t-[#3b6ef8] rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
