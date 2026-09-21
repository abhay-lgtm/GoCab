import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic, MicOff, RotateCcw, ChevronRight,
  MapPin, Navigation, Car, Zap, Users,
  CheckCircle, Edit3, Loader2, AlertCircle,
} from 'lucide-react';
import { useVoiceBooking } from '../../hooks/useVoiceBooking';
import VoicePulse from '../../components/voice/VoicePulse';
import Button from '../../components/common/Button';

/* ─────────────── ride options ─────────────── */
const RIDE_TYPES = [
  {
    id: 'standard',
    label: 'Standard',
    desc: 'Sedan or Hatchback',
    eta: '5 min',
    fare: '₹115 base · ₹20/km',
    icon: Car,
    badge: null,
    accentColor: '#2563eb',
  },
  {
    id: 'premium',
    label: 'Premium',
    desc: 'SUV or Premium Sedan',
    eta: '8 min',
    fare: '₹122 base · ₹28/km',
    icon: Zap,
    badge: 'Popular',
    accentColor: '#7c3aed',
  },
  {
    id: 'pool',
    label: 'Pool',
    desc: 'Share & save',
    eta: '12 min',
    fare: '₹110 base · ₹13/km',
    icon: Users,
    badge: 'Cheapest',
    accentColor: '#16a34a',
  },
];

/* ─────────────── step meta ─────────────── */
const STEPS = ['idle', 'pickup', 'destination', 'done'];

function stepIndex(step) {
  return STEPS.indexOf(step);
}

/* ─────────────── small sub-components ─────────────── */

function StepDots({ step }) {
  const active = stepIndex(step);
  return (
    <div className="flex items-center gap-2 mb-6">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="rounded-full transition-all duration-300"
          style={{
            width: active >= n ? 20 : 8,
            height: 8,
            background: active >= n ? '#7c3aed' : '#1f2937',
          }}
        />
      ))}
    </div>
  );
}

function MicButton({ onClick, listening, disabled, ariaLabel }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse rings */}
      {listening && (
        <>
          <div
            className="absolute rounded-full animate-ping"
            style={{
              width: 112, height: 112,
              background: 'rgba(124,58,237,0.15)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 96, height: 96,
              background: 'rgba(124,58,237,0.1)',
            }}
          />
        </>
      )}
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        className="relative flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d14] disabled:opacity-50"
        style={{
          width: 80, height: 80,
          background: listening
            ? 'linear-gradient(135deg, #6d28d9, #7c3aed)'
            : 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
          boxShadow: listening
            ? '0 0 0 4px rgba(124,58,237,0.25), 0 8px 24px rgba(124,58,237,0.4)'
            : '0 4px 16px rgba(124,58,237,0.3)',
        }}
        onMouseEnter={(e) => {
          if (!listening && !disabled) {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,58,237,0.5)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = listening
            ? '0 0 0 4px rgba(124,58,237,0.25), 0 8px 24px rgba(124,58,237,0.4)'
            : '0 4px 16px rgba(124,58,237,0.3)';
        }}
      >
        <Mic size={32} className="text-white" />
      </button>
    </div>
  );
}

function LocationRow({ dot, label, value, onEdit, onMic, isActive, isEmpty }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5 rounded transition-all duration-150"
      style={{
        background: isActive ? 'rgba(124,58,237,0.08)' : '#111827',
        border: `1px solid ${isActive ? 'rgba(124,58,237,0.35)' : '#1f2937'}`,
      }}
    >
      <div className="shrink-0">
        {dot}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#6b7280' }}>
          {label}
        </p>
        <p
          className="text-sm font-medium truncate"
          style={{ color: isEmpty ? '#4b5563' : '#f9fafb' }}
        >
          {isEmpty ? 'Say your location…' : value}
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        {!isEmpty && (
          <button
            onClick={onEdit}
            className="p-1.5 rounded hover:bg-[#1f2937] transition-colors"
            aria-label={`Edit ${label}`}
          >
            <Edit3 size={13} style={{ color: '#6b7280' }} />
          </button>
        )}
        <button
          onClick={onMic}
          className="p-1.5 rounded hover:bg-[#1f2937] transition-colors"
          aria-label={`Voice-enter ${label}`}
        >
          <Mic size={13} style={{ color: isActive ? '#7c3aed' : '#6b7280' }} />
        </button>
      </div>
    </div>
  );
}

function RideTypeCard({ rt, selected, onSelect }) {
  const Icon = rt.icon;
  const isSelected = selected === rt.id;
  return (
    <button
      onClick={() => onSelect(rt.id)}
      className="flex items-center gap-4 w-full px-4 py-4 rounded text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
      style={{
        background: isSelected ? `${rt.accentColor}14` : '#111827',
        border: `1px solid ${isSelected ? rt.accentColor : '#1f2937'}`,
        boxShadow: isSelected ? `0 0 0 1px ${rt.accentColor}40` : 'none',
      }}
      aria-pressed={isSelected}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded flex items-center justify-center shrink-0 transition-colors"
        style={{ background: isSelected ? rt.accentColor : '#1f2937' }}
      >
        <Icon size={20} style={{ color: isSelected ? '#fff' : '#9ca3af' }} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-semibold" style={{ color: '#f9fafb' }}>
            {rt.label}
          </p>
          {rt.badge && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded"
              style={{
                background: `${rt.accentColor}22`,
                color: rt.accentColor,
              }}
            >
              {rt.badge}
            </span>
          )}
        </div>
        <p className="text-xs" style={{ color: '#9ca3af' }}>{rt.desc}</p>
      </div>

      {/* Fare / ETA */}
      <div className="text-right shrink-0">
        <p className="text-sm font-semibold" style={{ color: isSelected ? rt.accentColor : '#f9fafb' }}>
          {rt.fare}
        </p>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>ETA {rt.eta}</p>
      </div>
    </button>
  );
}

/* ─────────────── main page ─────────────── */

export default function VoiceBooking() {
  const navigate = useNavigate();
  const {
    step, phase, transcript,
    pickup, destination,
    error, isSupported,
    startPickup, startDestination, confirmLocations,
    reset, setManualPickup, setManualDestination,
  } = useVoiceBooking();

  const [rideType, setRideType]         = useState('standard');
  const [editingPickup, setEditingPickup]         = useState(false);
  const [editingDestination, setEditingDestination] = useState(false);
  const [pickupDraft, setPickupDraft]   = useState('');
  const [destDraft, setDestDraft]       = useState('');

  /* ── helpers ── */
  const isListening  = phase === 'listening'  && step !== 'idle' && step !== 'done' && step !== 'error';
  const isProcessing = phase === 'processing';

  const handleConfirmRide = () => {
    navigate('/customer/confirm', {
      state: { pickup, destination, rideType },
    });
  };

  const handleEditPickup = () => {
    setPickupDraft(pickup);
    setEditingPickup(true);
  };
  const savePickup = () => {
    if (pickupDraft.trim()) setManualPickup(pickupDraft.trim());
    setEditingPickup(false);
  };

  const handleEditDest = () => {
    setDestDraft(destination);
    setEditingDestination(true);
  };
  const saveDest = () => {
    if (destDraft.trim()) setManualDestination(destDraft.trim());
    setEditingDestination(false);
  };

  /* ─── inline edit input style ─── */
  const editInputStyle = {
    width: '100%', height: 36, borderRadius: 4, fontSize: 13,
    padding: '0 10px', background: '#0a0d14',
    border: '1px solid #374151', color: '#f9fafb', outline: 'none',
  };

  /* ─────────── RENDER ─────────── */
  return (
    <div className="flex flex-col w-full max-w-xl mx-auto mt-6 pb-12 gap-6">

      {/* ── Header ── */}
      <div>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
          style={{ background: '#111827', border: '1px solid rgba(124,58,237,0.25)', color: '#7c3aed' }}
        >
          <Mic size={11} /> Voice Booking
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#f9fafb' }}>
          {step === 'idle'        && 'Book a ride with your voice'}
          {step === 'pickup'      && 'Where are you?'}
          {step === 'destination' && 'Where to?'}
          {step === 'done'        && 'Pick your ride'}
          {step === 'error'       && 'Something went wrong'}
        </h1>
        <p className="text-sm mt-1" style={{ color: '#9ca3af' }}>
          {step === 'idle'        && 'Tap the mic and speak naturally — no typing needed.'}
          {step === 'pickup'      && (isListening ? 'Listening for your pickup…' : 'Say your pickup location.')}
          {step === 'destination' && (isListening ? 'Listening for your destination…' : 'Say where you want to go.')}
          {step === 'done'        && 'Choose the best option for your trip.'}
          {step === 'error'       && (error || 'Speech recognition failed.')}
        </p>

        {/* Demo warning */}
        {!isSupported && step === 'idle' && (
          <p
            className="text-xs rounded-lg px-3 py-2 mt-3 inline-block"
            style={{ color: '#fbbf24', background: '#111827', border: '1px solid rgba(245,158,11,0.2)' }}
          >
            Demo mode — Speech API unavailable. A simulated result will be shown.
          </p>
        )}
      </div>

      {/* ── Progress dots ── */}
      {step !== 'idle' && <StepDots step={step} />}

      {/* ══════════ IDLE STATE ══════════ */}
      {step === 'idle' && (
        <div className="flex flex-col items-center gap-8 py-6 animate-fade-in">
          <MicButton
            onClick={startPickup}
            listening={false}
            ariaLabel="Start voice booking"
          />
          <div className="text-center">
            <p className="text-sm font-medium mb-1" style={{ color: '#e5e7eb' }}>
              Tap & speak your pickup and destination
            </p>
            <p className="text-xs" style={{ color: '#6b7280' }}>
              Supports English · Hindi place names understood
            </p>
          </div>

          {/* How to speak hint */}
          <div
            className="w-full rounded p-4"
            style={{ background: '#111827', border: '1px solid #1f2937' }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#6b7280' }}>
              Example phrases
            </p>
            {[
              '"I am at IIIT Kottayam"',
              '"Take me to Kottayam Railway Station"',
              '"From Pala to Kochi Airport"',
            ].map((ex) => (
              <div key={ex} className="flex items-center gap-2 mb-2">
                <Mic size={11} style={{ color: '#7c3aed', flexShrink: 0 }} />
                <p className="text-xs italic" style={{ color: '#9ca3af' }}>{ex}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════ PICKUP / DESTINATION LISTENING STATE ══════════ */}
      {(step === 'pickup' || step === 'destination') && (
        <div className="flex flex-col items-center gap-6 animate-fade-in">

          {/* Mic or processing */}
          {isProcessing ? (
            <div className="flex items-center justify-center" style={{ width: 80, height: 80 }}>
              <Loader2 size={36} className="animate-spin" style={{ color: '#7c3aed' }} />
            </div>
          ) : (
            <MicButton
              listening={isListening}
              onClick={undefined}
              disabled={isListening}
              ariaLabel="Listening…"
            />
          )}

          {/* Waveform */}
          {isListening && (
            <div className="animate-fade-in">
              <VoicePulse active color="#7c3aed" />
            </div>
          )}

          {/* Live transcript */}
          {transcript && (
            <p
              className="text-sm italic text-center max-w-xs animate-fade-in"
              style={{ color: '#9ca3af' }}
            >
              &ldquo;{transcript}&rdquo;
            </p>
          )}

          {/* Confirmed state for pickup — show & move to destination */}
          {phase === 'confirmed' && step === 'pickup' && (
            <div className="w-full animate-slide-up">
              <div
                className="flex items-center gap-3 rounded p-4 mb-4"
                style={{ background: '#111827', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <CheckCircle size={18} style={{ color: '#16a34a', flexShrink: 0 }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#6b7280' }}>Pickup set</p>
                  <p className="text-sm font-semibold" style={{ color: '#f9fafb' }}>{pickup}</p>
                </div>
              </div>
              <Button variant="primary" fullWidth size="lg" onClick={startDestination}>
                Now say your destination
                <ChevronRight size={18} />
              </Button>
              <Button variant="ghost" fullWidth size="md" className="mt-2" onClick={startPickup}>
                <RotateCcw size={14} /> Re-record pickup
              </Button>
            </div>
          )}

          {/* Confirmed state for destination — show summary & proceed */}
          {phase === 'confirmed' && step === 'destination' && (
            <div className="w-full animate-slide-up">
              <div
                className="flex items-center gap-3 rounded p-4 mb-4"
                style={{ background: '#111827', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <CheckCircle size={18} style={{ color: '#16a34a', flexShrink: 0 }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#6b7280' }}>Destination set</p>
                  <p className="text-sm font-semibold" style={{ color: '#f9fafb' }}>{destination}</p>
                </div>
              </div>
              <Button variant="primary" fullWidth size="lg" onClick={confirmLocations}>
                See ride options
                <ChevronRight size={18} />
              </Button>
              <Button variant="ghost" fullWidth size="md" className="mt-2" onClick={startDestination}>
                <RotateCcw size={14} /> Re-record destination
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ══════════ ERROR STATE ══════════ */}
      {step === 'error' && (
        <div className="flex flex-col items-center gap-5 py-4 animate-fade-in">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.25)' }}
          >
            <AlertCircle size={28} style={{ color: '#dc2626' }} />
          </div>
          <p className="text-sm text-center" style={{ color: '#9ca3af' }}>
            {error === 'not-allowed'
              ? 'Microphone access was denied. Please allow mic access in your browser and try again.'
              : error === 'no-speech'
              ? 'No speech was detected. Please try again.'
              : 'Something went wrong with voice recognition.'}
          </p>
          <Button variant="primary" fullWidth size="lg" onClick={reset}>
            <RotateCcw size={16} /> Start Over
          </Button>
        </div>
      )}

      {/* ══════════ DONE STATE — route summary + ride picker ══════════ */}
      {step === 'done' && (
        <div className="flex flex-col gap-5 animate-slide-up">

          {/* Route summary card */}
          <div
            className="rounded p-5 flex flex-col gap-0"
            style={{ background: '#111827', border: '1px solid #1f2937' }}
          >
            {/* Pickup row */}
            {editingPickup ? (
              <div className="mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#6b7280' }}>Pickup</p>
                <div className="flex gap-2">
                  <input
                    style={editInputStyle}
                    value={pickupDraft}
                    autoFocus
                    onChange={(e) => setPickupDraft(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && savePickup()}
                  />
                  <Button variant="primary" size="sm" onClick={savePickup}>Save</Button>
                </div>
              </div>
            ) : (
              <LocationRow
                dot={<div className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />}
                label="Pickup"
                value={pickup}
                isEmpty={!pickup}
                isActive={false}
                onEdit={handleEditPickup}
                onMic={startPickup}
              />
            )}

            {/* Dashed connector */}
            <div className="ml-[22px] border-l-2 border-dashed my-1" style={{ borderColor: '#1f2937', height: 18 }} />

            {/* Destination row */}
            {editingDestination ? (
              <div className="mt-1">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#6b7280' }}>Destination</p>
                <div className="flex gap-2">
                  <input
                    style={editInputStyle}
                    value={destDraft}
                    autoFocus
                    onChange={(e) => setDestDraft(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveDest()}
                  />
                  <Button variant="primary" size="sm" onClick={saveDest}>Save</Button>
                </div>
              </div>
            ) : (
              <LocationRow
                dot={<Navigation size={14} style={{ color: '#2563eb' }} />}
                label="Destination"
                value={destination}
                isEmpty={!destination}
                isActive={false}
                onEdit={handleEditDest}
                onMic={startDestination}
              />
            )}
          </div>

          {/* ── Ride type cards ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>
              Choose your ride
            </p>
            <div className="flex flex-col gap-2">
              {RIDE_TYPES.map((rt) => (
                <RideTypeCard
                  key={rt.id}
                  rt={rt}
                  selected={rideType}
                  onSelect={setRideType}
                />
              ))}
            </div>
          </div>

          {/* ── Actions ── */}
          <div className="flex flex-col gap-2 pt-1">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={handleConfirmRide}
              disabled={!pickup || !destination}
            >
              Confirm{' '}
              {rideType.charAt(0).toUpperCase() + rideType.slice(1)} Ride
              <ChevronRight size={18} />
            </Button>
            <Button variant="ghost" fullWidth size="md" onClick={reset}>
              <RotateCcw size={14} /> Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
