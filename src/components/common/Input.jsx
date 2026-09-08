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
        <label htmlFor={id} className="text-sm font-medium text-[#9ca3af]">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#9ca3af]">
            <Icon size={16} />
          </span>
        )}
        <input
          id={id}
          className={clsx(
            'w-full h-11 rounded text-sm transition-all duration-150',
            'bg-[#111827] text-[#f9fafb] border',
            error ? 'border-[#dc2626]' : 'border-[#1f2937]',
            className
          )}
          style={{
            paddingLeft: Icon ? 40 : 14,
            paddingRight: IconRight ? 40 : 14,
          }}
          {...props}
        />
        {IconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#9ca3af]">
            <IconRight size={16} />
          </span>
        )}
      </div>
      {error && <p className="text-xs text-[#dc2626]">{error}</p>}
      {hint && !error && <p className="text-xs text-[#6b7280]">{hint}</p>}
    </div>
  );
}
