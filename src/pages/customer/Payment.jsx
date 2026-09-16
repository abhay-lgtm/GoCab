import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Receipt, Clock, Loader2 } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { formatCurrency } from '../../utils/formatCurrency';
import { generateReceipt } from '../../utils/generateReceipt';
import Button from '../../components/common/Button';

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
  padding: 20,
};

export default function Payment() {
  const { rideId } = useParams();
  const navigate   = useNavigate();

  // Poll every 3 s so the page updates as soon as the driver taps "Payment Collected"
  const { data: bookings, loading: apiLoading } = useApi('/api/bookings', { pollInterval: 3000 });

  const ride = (bookings || []).find(b => b.id === rideId) || (bookings || [])[0] || null;
  const isPaid = ride?.status === 'payment_collected';

  // ── Loading / not found ─────────────────────────────────────────────────
  if (apiLoading && !bookings)
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  if (!ride)
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Ride not found.</div>;

  // ── SUCCESS SCREEN ──────────────────────────────────────────────────────
  if (isPaid) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center animate-slide-up">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#111827', border: '1px solid rgba(16,185,129,0.25)', boxShadow: '0 0 40px rgba(16,185,129,0.15)' }}
        >
          <CheckCircle size={40} style={{ color: '#16a34a' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Payment Successful
        </h1>
        <p style={{ color: '#9ca3af' }} className="mb-2">
          {formatCurrency(ride.total)} collected by your driver
        </p>
        <p className="text-sm mb-8" style={{ color: '#6b7280' }}>
          Thank you for riding with GoCab.
        </p>
        <div className="flex flex-col gap-2">
          <Button
            variant="secondary"
            fullWidth
            size="lg"
            onClick={() => generateReceipt(ride, 'cash')}
          >
            <Receipt size={16} />
            View Receipt
          </Button>
          <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/customer/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // ── AWAITING PAYMENT SCREEN ─────────────────────────────────────────────
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto mt-6 gap-8 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Awaiting Payment
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>
          Your driver will confirm once payment is collected.
        </p>
      </div>

      {/* Amount */}
      <div
        style={{
          ...glass,
          textAlign: 'center',
          padding: 32,
          border: '1px solid rgba(79,126,255,0.2)',
          background: 'rgba(37,99,235,0.05)',
        }}
      >
        <p className="text-sm mb-1" style={{ color: '#9ca3af' }}>Amount Due</p>
        <p
          className="text-4xl font-bold"
          style={{ color: '#f9fafb', letterSpacing: '-0.04em' }}
        >
          {formatCurrency(ride.total)}
        </p>
      </div>

      {/* Trip Summary */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: '#f9fafb' }}>Trip Summary</h2>
        <div className="flex flex-col gap-2 text-sm mb-4">
          {[
            { label: 'From',     value: ride.pickup      },
            { label: 'To',       value: ride.destination },
            { label: 'Distance', value: ride.distance    },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span style={{ color: '#9ca3af' }}>{label}</span>
              <span className="font-medium text-right max-w-[60%]" style={{ color: '#e5e7eb' }}>{value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2" style={{ borderTop: '1px solid #1f2937', paddingTop: 12 }}>
          {[
            { label: 'Base fare', value: ride.baseFare },
            { label: 'Ride fare', value: ride.rideFare },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span style={{ color: '#9ca3af' }}>{label}</span>
              <span style={{ color: '#e5e7eb' }}>{formatCurrency(value)}</span>
            </div>
          ))}
          <div
            className="flex justify-between font-bold text-base pt-1"
            style={{ borderTop: '1px solid #1f2937' }}
          >
            <span style={{ color: '#f9fafb' }}>Total</span>
            <span style={{ color: '#f9fafb' }}>{formatCurrency(ride.total)}</span>
          </div>
        </div>
      </div>

      {/* Waiting indicator */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded"
        style={{ background: '#111827', border: '1px solid #1f2937' }}
      >
        <Loader2 size={16} className="animate-spin" style={{ color: '#f59e0b', flexShrink: 0 }} />
        <p className="text-sm" style={{ color: '#9ca3af' }}>
          Waiting for driver to confirm collection…
        </p>
      </div>
    </div>
  );
}
