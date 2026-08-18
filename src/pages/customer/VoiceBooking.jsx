import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, RotateCcw, CheckCircle, Edit3, ChevronRight } from 'lucide-react';
import { useVoiceBooking } from '../../hooks/useVoiceBooking';
import VoicePulse from '../../components/voice/VoicePulse';
import Button from '../../components/common/Button';

export default function VoiceBooking() {
  const navigate = useNavigate();
  const { state, transcript, recognizedData, isSupported, startListening, reset } = useVoiceBooking();
  const [editing, setEditing] = useState(false);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const handleConfirm = () => {
    const p = editing ? pickup : recognizedData?.pickup;
    const d = editing ? destination : recognizedData?.destination;
    navigate('/customer/confirm', { state: { pickup: p, destination: d, rideType: 'standard' } });
  };

  const handleEdit = () => {
    setPickup(recognizedData?.pickup || '');
    setDestination(recognizedData?.destination || '');
    setEditing(true);
  };

  const handleTryAgain = () => {
    reset();
    setEditing(false);
  };

  const inputStyle = {
    width: '100%', height: 40, borderRadius: 12, fontSize: 14, padding: '0 12px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.85)',
    outline: 'none',
    marginTop: 4,
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto mt-6 gap-8">
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)', color: '#a78bfa' }}
        >
          <Mic size={12} />
          Voice Booking
        </div>
        <h1 className="text-2xl font-bold" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.02em' }}>
          {state === 'idle' && 'Where would you like to go?'}
          {state === 'listening' && 'Listening...'}
          {state === 'recognized' && 'Got it!'}
          {state === 'error' && 'Try again'}
        </h1>
        {!isSupported && state === 'idle' && (
          <p
            className="text-xs rounded-lg px-3 py-2 mt-3 inline-block"
            style={{
              color: '#fbbf24',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.2)',
            }}
          >
            Demo mode — Speech API not supported in this browser. A simulated result will be shown.
          </p>
        )}
      </div>

      {/* State: idle or listening */}
      {(state === 'idle' || state === 'listening') && (
        <div className="flex flex-col items-center gap-8">
          {/* Mic button */}
          <div className="relative">
            {state === 'listening' && (
              <>
                <div className="absolute inset-0 rounded-full animate-ping scale-150" style={{ background: 'rgba(167,139,250,0.15)' }} />
                <div className="absolute inset-0 rounded-full scale-125" style={{ background: 'rgba(167,139,250,0.08)' }} />
              </>
            )}
            <button
              onClick={state === 'idle' ? startListening : undefined}
              disabled={state === 'listening'}
              aria-label="Start listening"
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 focus-visible:outline-none`}
              style={{
                background: state === 'idle'
                  ? 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)'
                  : 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
                boxShadow: state === 'listening'
                  ? '0 0 50px rgba(167,139,250,0.4)'
                  : '0 8px 32px rgba(167,139,250,0.3)',
                cursor: state === 'idle' ? 'pointer' : 'default',
                animation: state === 'listening' ? 'voicePulse 2s ease-in-out infinite' : 'none',
              }}
              onMouseEnter={e => {
                if (state === 'idle') {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(167,139,250,0.45)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(167,139,250,0.3)';
              }}
            >
              <Mic size={36} className="text-white" />
            </button>
          </div>

          {/* Waveform */}
          {state === 'listening' && (
            <div className="animate-fade-in">
              <VoicePulse active />
              {transcript && (
                <p className="text-center text-sm italic mt-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  &ldquo;{transcript}&rdquo;
                </p>
              )}
            </div>
          )}

          {state === 'idle' && (
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {isSupported ? 'Tap the mic and speak your destination' : 'Tap the mic for a demo'}
            </p>
          )}
        </div>
      )}

      {/* State: recognized */}
      {state === 'recognized' && (
        <div className="flex flex-col gap-4 animate-slide-up">
          <div
            className="rounded-2xl p-4 flex items-center gap-3 mb-2"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <CheckCircle size={20} className="shrink-0" style={{ color: '#10b981' }} />
            <p className="text-sm font-medium" style={{ color: '#6ee7b7' }}>Destination recognized successfully</p>
          </div>

          {!editing ? (
            <div
              className="flex flex-col rounded-2xl p-5 gap-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Pickup</p>
                <p className="text-base font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{recognizedData?.pickup}</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
                <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Destination</p>
                <p className="text-base font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>{recognizedData?.destination}</p>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col rounded-2xl p-5 gap-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div>
                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>Pickup</label>
                <input style={inputStyle} value={pickup} onChange={e => setPickup(e.target.value)} />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>Destination</label>
                <input style={inputStyle} value={destination} onChange={e => setDestination(e.target.value)} />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button variant="primary" fullWidth size="lg" onClick={handleConfirm}>
              Confirm Ride
              <ChevronRight size={18} />
            </Button>
            {!editing && (
              <Button variant="secondary" fullWidth size="md" onClick={handleEdit}>
                <Edit3 size={15} />
                Edit
              </Button>
            )}
            <Button variant="ghost" fullWidth size="md" onClick={handleTryAgain}>
              <RotateCcw size={15} />
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
