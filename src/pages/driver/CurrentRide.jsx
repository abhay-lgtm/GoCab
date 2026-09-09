import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Phone, ShieldCheck, CheckCircle, Play, Flag, Key,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import MapPlaceholder from '../../components/map/MapPlaceholder';
import Button from '../../components/common/Button';
import { useApi, apiPost } from '../../hooks/useApi';

export default function DriverCurrentRide() {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { data: bookings, loading: apiLoading, refetch } = useApi('/api/bookings', { pollInterval: 3000 });
  
  const ride = bookings?.find(r => r.id === rideId) || bookings?.find(b => b.status === 'accepted' || b.status === 'in_progress') || null;
  const [status, setStatus] = useState('accepted');
  const [loading, setLoading] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    if (ride?.status) {
      if (ride.status === 'in_progress') setStatus('started');
      else setStatus(ride.status);
    }
  }, [ride?.status]);

  const handleStart = async () => {
    if (!otpInput || otpInput.trim().length !== 4) {
      setOtpError('Please enter the 4-digit PIN provided by passenger.');
      return;
    }

    setLoading(true);
    setOtpError('');
    try {
      if (ride) {
        await apiPost(`/api/bookings/${ride.id}/start`, { otp: otpInput.trim() });
      }
      setStatus('started');
      refetch();
    } catch (e) {
      console.error(e);
      setOtpError(e.message || 'Invalid OTP. Please check with the passenger.');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      if (ride) {
        await apiPost(`/api/bookings/${ride.id}/complete`, {});
      }
      setStatus('completed');
      refetch();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (apiLoading) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!ride) {
    return <div style={{ color: '#9ca3af', padding: '40px', textAlign: 'center' }}>Ride not found</div>;
  }

  if (status === 'completed') {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16 text-center animate-slide-up">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#111827', border: '1px solid rgba(16,185,129,0.25)', boxShadow: '0 0 40px rgba(16,185,129,0.2)' }}
        >
          <CheckCircle size={40} style={{ color: '#16a34a' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#f9fafb', letterSpacing: '-0.02em' }}>
          Ride Completed!
        </h1>
        <p style={{ color: '#9ca3af' }} className="mb-1">Fare earned</p>
        <p className="text-4xl font-bold mb-6" style={{ color: '#16a34a' }}>
          {formatCurrency(ride?.total || 320)}
        </p>
        <div
          className="flex flex-col rounded p-4 text-left gap-2 mb-6"
          style={{ background: '#111827', border: '1px solid #1f2937' }}
        >
          {[
            { label: 'Passenger', value: ride?.customerName || 'Customer' },
            { label: 'Route', value: `${ride?.pickup} → ${ride?.destination}` },
            { label: 'Distance', value: ride?.distance },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span style={{ color: '#9ca3af' }}>{label}</span>
              <span className="font-medium text-right max-w-[55%]" style={{ color: '#f9fafb' }}>{value}</span>
            </div>
          ))}
        </div>
        <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/driver/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <MapPlaceholder pickup={ride?.pickup} destination={ride?.destination} className="h-56 sm:h-72 rounded-none" />

      <div className="flex flex-col flex-1 overflow-y-auto px-4 sm:px-6 py-5 gap-4" style={{ background: '#0a0d14' }}>
        {/* Status */}
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${status === 'started' ? 'animate-pulse' : ''}`}
            style={{ background: status === 'started' ? '#2563eb' : '#16a34a' }}
          />
          <p className="text-sm font-semibold" style={{ color: '#f9fafb' }}>
            {status === 'accepted' ? 'Heading to pickup' : 'Ride in progress'}
          </p>
        </div>

        {/* Passenger card */}
        <div
          className="flex flex-col rounded p-4 gap-3"
          style={{ background: '#111827', border: '1px solid #1f2937' }}
        >
          {Boolean(ride?.safeRideEnabled) && (
            <div className="flex items-center gap-2 text-xs font-medium mb-1" style={{ color: '#16a34a' }}>
              <ShieldCheck size={14} />
              SafeRide Passenger
            </div>
          )}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
              style={{ background: '#111827' }}
            >
              <span className="text-base font-bold" style={{ color: '#2563eb' }}>
                {(ride?.customerName || 'C').charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold" style={{ color: '#f9fafb' }}>
                {ride?.customerName || 'Customer'}
              </p>
              <p className="text-xs" style={{ color: '#9ca3af' }}>Passenger</p>
            </div>
            <a href={`tel:${ride?.customerPhone || '+91 94470 12345'}`}>
              <Button variant="secondary" size="icon">
                <Phone size={16} />
              </Button>
            </a>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#16a34a]" />
              <p className="text-sm" style={{ color: '#e5e7eb' }}>{ride?.pickup}</p>
            </div>
            <div className="ml-1 border-l-2 border-dashed h-3" style={{ borderColor: '#1f2937' }} />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2563eb]" />
              <p className="text-sm" style={{ color: '#e5e7eb' }}>{ride?.destination}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <span className="text-xs" style={{ color: '#9ca3af' }}>{ride?.distance}</span>
            <span className="text-xs font-semibold" style={{ color: '#f9fafb' }}>
              {formatCurrency(ride?.total)}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        {status === 'accepted' && (
          <div className="flex flex-col rounded p-4 gap-3 bg-[#111827] border border-[#1f2937]">
            <div className="flex items-center gap-2">
              <Key size={16} className="text-[#2563eb]" />
              <p className="text-sm font-semibold text-[#f9fafb]">Enter Passenger PIN</p>
            </div>
            <p className="text-xs text-[#9ca3af]">
              Ask the passenger for their 4-digit ride OTP to start the trip.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="• • • •"
                value={otpInput}
                onChange={e => {
                  setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 4));
                  if (otpError) setOtpError('');
                }}
                className="w-full text-center text-2xl font-bold tracking-[0.5em] py-2.5 px-4 rounded bg-[#0a0d14] border border-[#1f2937] text-white focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] font-mono"
              />
              {otpError && (
                <p className="text-xs text-red-400 font-medium text-center">{otpError}</p>
              )}
            </div>
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={handleStart}
              loading={loading}
              disabled={otpInput.length !== 4}
            >
              <Play size={18} />
              Verify PIN & Start Ride
            </Button>
          </div>
        )}
        {status === 'started' && (
          <Button variant="safety" fullWidth size="lg" onClick={handleComplete} loading={loading}>
            <Flag size={18} />
            Complete Ride
          </Button>
        )}
      </div>
    </div>
  );
}
