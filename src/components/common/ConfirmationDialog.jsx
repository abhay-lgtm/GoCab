import Button from './Button';

export default function ConfirmationDialog({
  isOpen,
  onCancel,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 animate-fade-in"
        style={{ background: '#111827', backdropFilter: 'blur(8px)' }}
        onClick={onCancel}
      />
      <div
        className="relative rounded shadow-2xl p-6 max-w-sm w-full animate-slide-up"
        style={{
          background: '#111827',
          border: '1px solid #1f2937',
          backdropFilter: 'blur(20px)',
        }}
      >
        <h3 className="text-base font-semibold mb-2" style={{ color: '#f9fafb' }}>{title}</h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: '#9ca3af' }}>{message}</p>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} fullWidth onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
