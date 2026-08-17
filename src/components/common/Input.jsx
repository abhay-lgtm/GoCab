import { clsx } from 'clsx';

export default function Input({
  label,
  id,
  icon: Icon,
  iconRight: IconRight,
  error,
  hint,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  return (
    <div className={clsx('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[#0a0f1e]">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none">
            <Icon size={16} />
          </span>
        )}
        <input
          id={id}
          className={clsx(
            'w-full h-11 rounded-xl border border-[#e4e8f0] bg-white text-sm text-[#0a0f1e] placeholder:text-[#9ca3af] transition-all duration-150',
            'focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10',
            'hover:border-[#cbd5e1]',
            Icon ? 'pl-9' : 'pl-3.5',
            IconRight ? 'pr-9' : 'pr-3.5',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-100',
            className
          )}
          {...props}
        />
        {IconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none">
            <IconRight size={16} />
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-[#9ca3af]">{hint}</p>}
    </div>
  );
}
