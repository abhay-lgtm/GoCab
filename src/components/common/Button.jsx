import { clsx } from 'clsx';

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

const variants = {
  primary:
    'bg-[#3b6ef8] text-white hover:bg-[#2555d4] active:scale-[0.98] focus-visible:ring-[#3b6ef8] shadow-sm shadow-[#3b6ef8]/20',
  secondary:
    'bg-white text-[#0a0f1e] border border-[#e4e8f0] hover:bg-[#f0f2f8] active:scale-[0.98] focus-visible:ring-[#3b6ef8]',
  danger:
    'bg-[#ef4444] text-white hover:bg-red-600 active:scale-[0.98] focus-visible:ring-red-500 shadow-sm',
  ghost:
    'text-[#4b5563] hover:bg-[#f0f2f8] hover:text-[#0a0f1e] active:scale-[0.98] focus-visible:ring-[#3b6ef8]',
  safety:
    'bg-[#10b981] text-white hover:bg-emerald-600 active:scale-[0.98] focus-visible:ring-[#10b981] shadow-sm shadow-[#10b981]/20',
  outline:
    'border border-[#3b6ef8] text-[#3b6ef8] hover:bg-[#3b6ef8]/5 active:scale-[0.98] focus-visible:ring-[#3b6ef8]',
  navy:
    'bg-[#0a0f1e] text-white hover:bg-[#111827] active:scale-[0.98] focus-visible:ring-[#0a0f1e] shadow-sm',
};

const sizes = {
  sm: 'h-8 px-3 text-xs rounded-lg',
  md: 'h-10 px-4 text-sm rounded-xl',
  lg: 'h-12 px-6 text-base rounded-xl',
  xl: 'h-14 px-8 text-base rounded-2xl',
  icon: 'h-10 w-10 rounded-xl',
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
