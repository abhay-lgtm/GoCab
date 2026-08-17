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

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold mb-4">
          <Mic size={12} />
          Voice Booking
        </div>
        <h1 className="text-2xl font-bold text-[#0a0f1e]">
          {state === 'idle' && 'Where would you like to go?'}
          {state === 'listening' && 'Listening...'}
          {state === 'recognized' && 'Got it!'}
          {state === 'error' && 'Try again'}
        </h1>
        {!isSupported && state === 'idle' && (
          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-3 inline-block">
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
                <div className="absolute inset-0 rounded-full bg-indigo-400/20 animate-ping scale-150" />
                <div className="absolute inset-0 rounded-full bg-indigo-400/10 scale-125" />
              </>
            )}
            <button
              onClick={state === 'idle' ? startListening : undefined}
              disabled={state === 'listening'}
              aria-label="Start listening"
              className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300
                ${state === 'idle'
                  ? 'bg-[#0a0f1e] hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-indigo-600 cursor-default animate-voice-pulse'
                }`}
            >
              <Mic size={36} className="text-white" />
            </button>
          </div>

          {/* Waveform */}
          {state === 'listening' && (
            <div className="animate-fade-in">
              <VoicePulse active />
              {transcript && (
                <p className="text-center text-sm text-[#4b5563] mt-4 italic">"{transcript}"</p>
              )}
            </div>
          )}

          {state === 'idle' && (
            <p className="text-sm text-[#9ca3af]">
              {isSupported ? 'Tap the mic and speak your destination' : 'Tap the mic for a demo'}
            </p>
          )}
        </div>
      )}

      {/* State: recognized */}
      {state === 'recognized' && (
        <div className="space-y-4 animate-slide-up">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 mb-2">
            <CheckCircle size={20} className="text-[#10b981] shrink-0" />
            <p className="text-sm text-emerald-800 font-medium">Destination recognized successfully</p>
          </div>

          {!editing ? (
            <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5 space-y-4">
              <div>
                <p className="text-xs text-[#9ca3af] font-medium uppercase tracking-wide mb-1">Pickup</p>
                <p className="text-base font-semibold text-[#0a0f1e]">{recognizedData?.pickup}</p>
              </div>
              <div className="border-t border-[#f0f2f8] pt-4">
                <p className="text-xs text-[#9ca3af] font-medium uppercase tracking-wide mb-1">Destination</p>
                <p className="text-base font-semibold text-[#0a0f1e]">{recognizedData?.destination}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#e4e8f0] p-5 space-y-3">
              <div>
                <label className="text-xs text-[#9ca3af] font-medium uppercase tracking-wide">Pickup</label>
                <input
                  className="mt-1 w-full h-10 rounded-xl border border-[#e4e8f0] text-sm px-3 focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10"
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-[#9ca3af] font-medium uppercase tracking-wide">Destination</label>
                <input
                  className="mt-1 w-full h-10 rounded-xl border border-[#e4e8f0] text-sm px-3 focus:outline-none focus:border-[#3b6ef8] focus:ring-2 focus:ring-[#3b6ef8]/10"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                />
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
