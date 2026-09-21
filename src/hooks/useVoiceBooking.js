import { useState, useRef, useCallback } from 'react';

/**
 * useVoiceBooking
 *
 * Multi-step voice booking hook.
 * Step 1 → ask pickup,  Step 2 → ask destination
 * Falls back to demo mode when Web Speech API is unavailable.
 *
 * step:   'idle' | 'pickup' | 'destination' | 'done' | 'error'
 * phase:  'listening' | 'processing' | 'confirmed'   (within each step)
 */
export function useVoiceBooking() {
  const [step, setStep]                 = useState('idle');
  const [phase, setPhase]               = useState('listening');
  const [transcript, setTranscript]     = useState('');
  const [pickup, setPickup]             = useState('');
  const [destination, setDestination]   = useState('');
  const [error, setError]               = useState(null);

  const recognitionRef = useRef(null);
  const demoTimerRef   = useRef(null);

  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  /* ── helpers ── */
  const capitalize = (str) =>
    str
      .trim()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  /**
   * Strip filler / trigger words and return the clean location string.
   * e.g. "I want to go to Kottayam Railway Station" → "Kottayam Railway Station"
   */
  const parseLocation = useCallback((text) => {
    const lower = text.toLowerCase().trim();

    // Destination patterns
    const destPatterns = [
      /(?:going to|go to|i want to go to|take me to|drop me (?:at|to)|i need to go to|my destination is|navigate to|head to) (.+)/,
      /(?:to|towards) (.+)/,
    ];
    for (const re of destPatterns) {
      const m = lower.match(re);
      if (m) return capitalize(m[1]);
    }

    // Pickup patterns
    const pickupPatterns = [
      /(?:from|pickup from|pick me up (?:from|at)|i am at|i'm at|starting from|my location is|my pickup is) (.+)/,
    ];
    for (const re of pickupPatterns) {
      const m = lower.match(re);
      if (m) return capitalize(m[1]);
    }

    // Fallback: return the whole thing capitalised
    return capitalize(text);
  }, []);

  /* ── stop active recognition safely ── */
  const stopRecognition = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) { /* ignore */ }
      recognitionRef.current = null;
    }
    if (demoTimerRef.current) {
      clearTimeout(demoTimerRef.current);
      demoTimerRef.current = null;
    }
  }, []);

  /* ── core: start one recognition session, call onFinal(text) when done ── */
  const startSession = useCallback((onFinal, demoSample) => {
    setTranscript('');
    setError(null);

    if (isSupported) {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SR();
      rec.lang             = 'en-IN';
      rec.continuous       = false;
      rec.interimResults   = true;
      rec.maxAlternatives  = 1;

      rec.onresult = (ev) => {
        const result = ev.results[ev.results.length - 1];
        const text   = result[0].transcript;
        setTranscript(text);
        if (result.isFinal) {
          recognitionRef.current = null;
          setPhase('processing');
          // small delay so "processing" flash is visible
          setTimeout(() => onFinal(text), 400);
        }
      };

      rec.onerror = (ev) => {
        recognitionRef.current = null;
        setError(ev.error);
        setStep('error');
        setPhase('listening');
      };

      rec.onend = () => {
        // If we end without a final result (e.g. silence timeout), go back to idle
        if (recognitionRef.current) {
          recognitionRef.current = null;
          setStep('idle');
          setPhase('listening');
        }
      };

      recognitionRef.current = rec;
      rec.start();
    } else {
      // Demo mode
      demoTimerRef.current = setTimeout(() => {
        const sample = demoSample;
        setTranscript(sample);
        setPhase('processing');
        setTimeout(() => onFinal(sample), 400);
      }, 2500);
    }
  }, [isSupported]);

  /* ── public API ── */

  /** Begin the pickup step */
  const startPickup = useCallback(() => {
    stopRecognition();
    setStep('pickup');
    setPhase('listening');
    setPickup('');
    setDestination('');

    startSession(
      (text) => {
        const loc = parseLocation(text);
        setPickup(loc);
        setPhase('confirmed');
      },
      'IIIT Kottayam',        // demo sample for pickup
    );
  }, [stopRecognition, startSession, parseLocation]);

  /** Begin the destination step (called after pickup is confirmed) */
  const startDestination = useCallback(() => {
    stopRecognition();
    setStep('destination');
    setPhase('listening');
    setDestination('');

    startSession(
      (text) => {
        const loc = parseLocation(text);
        setDestination(loc);
        setPhase('confirmed');
      },
      'Kottayam Railway Station', // demo sample for destination
    );
  }, [stopRecognition, startSession, parseLocation]);

  /** Confirm both locations → move to ride selection */
  const confirmLocations = useCallback(() => {
    setStep('done');
    setPhase('listening');
  }, []);

  /** Full reset */
  const reset = useCallback(() => {
    stopRecognition();
    setStep('idle');
    setPhase('listening');
    setTranscript('');
    setPickup('');
    setDestination('');
    setError(null);
  }, [stopRecognition]);

  /** Manually override pickup text */
  const setManualPickup = useCallback((v) => setPickup(v), []);

  /** Manually override destination text */
  const setManualDestination = useCallback((v) => setDestination(v), []);

  return {
    step,
    phase,
    transcript,
    pickup,
    destination,
    error,
    isSupported,
    startPickup,
    startDestination,
    confirmLocations,
    reset,
    setManualPickup,
    setManualDestination,
  };
}
