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
        <label htmlFor={id} className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <Icon size={16} />
          </span>
        )}
        <input
          id={id}
          className={clsx(
            'w-full h-11 rounded-xl text-sm transition-all duration-150',
            'focus:outline-none focus:ring-2',
            error && 'ring-1 ring-red-500/60',
            className
          )}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.9)',
            paddingLeft: Icon ? 40 : 14,
            paddingRight: IconRight ? 40 : 14,
          }}
          {...props}
        />
        {IconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <IconRight size={16} />
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{hint}</p>}
    </div>
  );
}
