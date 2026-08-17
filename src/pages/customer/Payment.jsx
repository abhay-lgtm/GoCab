import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, CreditCard, Smartphone, Banknote, ChevronRight, Receipt } from 'lucide-react';
import { mockRides } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatCurrency';
import Button from '../../components/common/Button';

const methods = [
  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Card', icon: CreditCard, desc: 'Credit or Debit card' },
  { id: 'cash', label: 'Cash', icon: Banknote, desc: 'Pay to driver directly' },
];

export default function Payment() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const ride = mockRides.find(r => r.id === rideId) || mockRides[0];
  const [method, setMethod] = useState('upi');
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setPaid(true);
  };

  if (paid) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center animate-slide-up">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#10b981]" />
        </div>
        <h1 className="text-2xl font-bold text-[#0a0f1e] mb-2">Payment Successful</h1>
        <p className="text-[#4b5563] mb-2">
          {formatCurrency(ride.total)} paid via {methods.find(m => m.id === method)?.label}
        </p>
        <p className="text-sm text-[#9ca3af] mb-8">Thank you for riding with RideSphere.</p>
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
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">Ride Completed</h1>
        <p className="text-sm text-[#9ca3af] mt-0.5">Complete your payment to finish.</p>
      </div>

      {/* Fare summary */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5">
        <h2 className="text-sm font-semibold text-[#0a0f1e] mb-4">Trip Summary</h2>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-[#4b5563]">From</span>
            <span className="text-[#0a0f1e] font-medium text-right max-w-[60%]">{ride.pickup}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4b5563]">To</span>
            <span className="text-[#0a0f1e] font-medium text-right max-w-[60%]">{ride.destination}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#4b5563]">Distance</span>
            <span className="text-[#0a0f1e]">{ride.distance}</span>
          </div>
        </div>
        <div className="space-y-2 border-t border-[#f0f2f8] pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#4b5563]">Base fare</span>
            <span>{formatCurrency(ride.baseFare)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#4b5563]">Ride fare</span>
            <span>{formatCurrency(ride.rideFare)}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-1 border-t border-[#f0f2f8]">
            <span>Total</span>
            <span>{formatCurrency(ride.total)}</span>
          </div>
        </div>
      </div>

      {/* Payment method */}
      <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5">
        <h2 className="text-sm font-semibold text-[#0a0f1e] mb-3">Payment Method</h2>
        <div className="space-y-2">
          {methods.map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => setMethod(id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border transition-all duration-150
                ${method === id ? 'border-[#3b6ef8] bg-[#3b6ef8]/5' : 'border-[#e4e8f0] hover:border-[#3b6ef8]/30'}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${method === id ? 'bg-[#3b6ef8]' : 'bg-[#f0f2f8]'}`}>
                <Icon size={17} className={method === id ? 'text-white' : 'text-[#9ca3af]'} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-[#0a0f1e]">{label}</p>
                <p className="text-xs text-[#9ca3af]">{desc}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 transition-all ${method === id ? 'border-[#3b6ef8] bg-[#3b6ef8]' : 'border-[#e4e8f0]'}`} />
            </button>
          ))}
        </div>
      </div>

      <Button variant="primary" fullWidth size="xl" onClick={handlePay} loading={loading}>
        Pay {formatCurrency(ride.total)}
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}
