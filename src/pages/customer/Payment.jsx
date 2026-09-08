import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, CreditCard, Smartphone, Banknote, ChevronRight, Receipt } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../../components/common/Button';

const methods = [
  { id: 'upi',  label: 'UPI',  icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Card', icon: CreditCard,  desc: 'Credit or Debit card' },
  { id: 'cash', label: 'Cash', icon: Banknote,    desc: 'Pay to driver directly' },
];

const glass = {
  background: '#111827',
  border: '1px solid #1f2937',
  borderRadius: 4,
  padding: 20,
};

export default function Payment() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { data: bookings, loading: apiLoading } = useApi('/api/bookings');
  
  const ride = (bookings || []).find(b => b.id === rideId) || (bookings || [])[0] || null;
  const [method, setMethod] = useState('upi');
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setPaid(true);
  };

  if (apiLoading && !bookings) return <div style={{color:'#9ca3af',padding:'40px',textAlign:'center'}}>Loading...</div>;
  if (!ride) return <div style={{color:'#9ca3af',padding:'40px',textAlign:'center'}}>Ride not found.</div>;

  if (paid) {
    return (
      <div
        className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center animate-slide-up"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#111827', border: '1px solid rgba(16,185,129,0.25)' }}
        >
          <CheckCircle size={40} style={{ color: '#16a34a' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Payment Successful
        </h1>
        <p style={{ color: '#9ca3af' }} className="mb-2">
          {formatCurrency(ride.total)} paid via {methods.find(m => m.id === method)?.label}
        </p>
        <p className="text-sm mb-8" style={{ color: '#6b7280' }}>
          Thank you for riding with RideSphere.
        </p>
        <div className="flex flex-col gap-2">
          <Button
            variant="secondary"
            fullWidth
            size="lg"
            onClick={() => alert('Receipt functionality — connect to backend for real receipts.')}
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

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto mt-6 gap-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Ride Completed
        </h1>
        <p className="text-sm mt-0.5" style={{ color: '#9ca3af' }}>Complete your payment to finish.</p>
      </div>

      {/* Fare summary */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-4" style={{ color: '#f9fafb' }}>Trip Summary</h2>
        <div className="flex flex-col gap-2 text-sm mb-4">
          {[
            { label: 'From', value: ride.pickup },
            { label: 'To', value: ride.destination },
            { label: 'Distance', value: ride.distance },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span style={{ color: '#9ca3af' }}>{label}</span>
              <span className="font-medium text-right max-w-[60%]" style={{ color: '#e5e7eb' }}>
                {value}
              </span>
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

      {/* Payment method */}
      <div style={glass}>
        <h2 className="text-sm font-semibold mb-3" style={{ color: '#f9fafb' }}>Payment Method</h2>
        <div className="flex flex-col gap-2">
          {methods.map(({ id, label, icon: Icon, desc }) => {
            const active = method === id;
            return (
              <button
                key={id}
                onClick={() => setMethod(id)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded transition-all duration-150"
                style={{
                  background: active ? 'rgba(79,126,255,0.1)' : 'transparent',
                  border: active ? '1px solid rgba(79,126,255,0.3)' : '1px solid #1f2937',
                }}
              >
                <div
                  className="w-9 h-9 rounded flex items-center justify-center"
                  style={{ background: active ? '#2563eb' : '#1f2937' }}
                >
                  <Icon size={17} style={{ color: active ? '#fff' : '#9ca3af' }} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium" style={{ color: '#f9fafb' }}>{label}</p>
                  <p className="text-xs" style={{ color: '#9ca3af' }}>{desc}</p>
                </div>
                <div
                  className="w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center"
                  style={{
                    borderColor: active ? '#2563eb' : '#4b5563',
                    background: active ? '#2563eb' : 'transparent',
                  }}
                >
                  {active && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Button variant="primary" fullWidth size="xl" onClick={handlePay} loading={loading}>
        Pay {formatCurrency(ride.total)}
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}
