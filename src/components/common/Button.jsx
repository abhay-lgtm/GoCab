import { clsx } from 'clsx';

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14] disabled:opacity-40 disabled:pointer-events-none select-none';

const variants = {
  primary:
    'bg-[#2563eb] text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] focus-visible:ring-[#2563eb]',
  secondary:
    'bg-[#1f2937] text-[#f9fafb] border border-[#374151] hover:bg-[#374151] focus-visible:ring-[#374151]',
  danger:
    'bg-[#dc2626] text-white hover:bg-[#b91c1c] focus-visible:ring-red-500',
  ghost:
    'text-[#9ca3af] hover:text-[#f9fafb] hover:bg-[#1f2937] focus-visible:ring-[#1f2937]',
  safety:
    'bg-[#16a34a] text-white hover:bg-[#15803d] focus-visible:ring-[#16a34a]',
  outline:
    'border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb]/10 focus-visible:ring-[#2563eb]',
  navy:
    'bg-[#1f2937] text-[#f9fafb] border border-[#374151] hover:bg-[#374151] focus-visible:ring-[#374151]',
};

const sizes = {
  sm: 'h-8 px-3 text-xs rounded',
  md: 'h-10 px-4 text-sm rounded',
  lg: 'h-12 px-6 text-base rounded',
  xl: 'h-14 px-8 text-base rounded',
  icon: 'h-10 w-10 rounded',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  );
}
