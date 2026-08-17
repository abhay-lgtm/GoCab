import { useState, useRef, useCallback } from 'react';

/**
 * useVoiceBooking
 *
 * Wraps the browser's Web Speech API for voice-based booking.
 * Falls back to a timed demo interaction when the API is not available.
 *
 * States: 'idle' | 'listening' | 'recognized' | 'error'
 */
export function useVoiceBooking() {
  const [state, setState] = useState('idle');
  const [transcript, setTranscript] = useState('');
  const [recognizedData, setRecognizedData] = useState(null);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const demoTimerRef = useRef(null);

  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Parse a transcript into pickup / destination
  const parseTranscript = useCallback((text) => {
    const lower = text.toLowerCase();

    // Very simple heuristic: look for "from X to Y" or "going to Y"
    const fromToMatch = lower.match(/from (.+?) to (.+)/);
    if (fromToMatch) {
      return {
        pickup: capitalize(fromToMatch[1].trim()),
        destination: capitalize(fromToMatch[2].trim()),
      };
    }

    const toMatch = lower.match(/(?:to|go to|going to|drop me?(?:\s+(?:at|to))?) (.+)/);
    if (toMatch) {
      return {
        pickup: 'IIIT Kottayam',   // default pickup
        destination: capitalize(toMatch[1].trim()),
      };
    }

    // Fallback: treat entire transcript as destination
    return {
      pickup: 'IIIT Kottayam',
      destination: capitalize(text.trim()),
    };
  }, []);

  const startListening = useCallback(() => {
    setError(null);
    setState('listening');
    setTranscript('');
    setRecognizedData(null);

    if (isSupported) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        const text = result[0].transcript;
        setTranscript(text);

        if (result.isFinal) {
          const parsed = parseTranscript(text);
          setRecognizedData(parsed);
          setState('recognized');
        }
      };

      recognition.onerror = (event) => {
        setError(event.error);
        setState('error');
      };

      recognition.onend = () => {
        if (state === 'listening') {
          setState('idle');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } else {
      // Demo mode: simulate recognition after 2.5 seconds
      demoTimerRef.current = setTimeout(() => {
        const demoText = 'Kottayam Railway Station';
        setTranscript(demoText);
        const parsed = {
          pickup: 'IIIT Kottayam',
          destination: 'Kottayam Railway Station',
        };
        setRecognizedData(parsed);
        setState('recognized');
      }, 2500);
    }
  }, [isSupported, parseTranscript, state]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (demoTimerRef.current) {
      clearTimeout(demoTimerRef.current);
    }
    setState('idle');
  }, []);

  const reset = useCallback(() => {
    stopListening();
    setTranscript('');
    setRecognizedData(null);
    setError(null);
    setState('idle');
  }, [stopListening]);

  return {
    state,
    transcript,
    recognizedData,
    error,
    isSupported,
    startListening,
    stopListening,
    reset,
  };
}

function capitalize(str) {
  if (!str) return '';
  return str
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
