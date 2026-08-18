import { clsx } from 'clsx';

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05091a] disabled:opacity-40 disabled:pointer-events-none select-none';

const variants = {
  primary:
    'bg-gradient-to-br from-[#4f7eff] to-[#3b5ce4] text-white hover:brightness-110 active:scale-[0.98] focus-visible:ring-[#4f7eff] shadow-lg shadow-[#4f7eff]/25',
  secondary:
    'bg-white/6 text-white/80 border border-white/10 hover:bg-white/10 hover:text-white active:scale-[0.98] focus-visible:ring-white/20',
  danger:
    'bg-[#ef4444] text-white hover:bg-red-500 active:scale-[0.98] focus-visible:ring-red-500 shadow-sm shadow-red-500/20',
  ghost:
    'text-white/55 hover:bg-white/6 hover:text-white active:scale-[0.98] focus-visible:ring-white/20',
  safety:
    'bg-[#10b981] text-white hover:bg-emerald-500 active:scale-[0.98] focus-visible:ring-[#10b981] shadow-sm shadow-[#10b981]/25',
  outline:
    'border border-[#4f7eff]/50 text-[#5b8eff] hover:bg-[#4f7eff]/10 active:scale-[0.98] focus-visible:ring-[#4f7eff]',
  navy:
    'bg-white/8 text-white border border-white/10 hover:bg-white/12 active:scale-[0.98] focus-visible:ring-white/20 shadow-sm',
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
