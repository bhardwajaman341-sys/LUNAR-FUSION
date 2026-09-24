import React, { useState } from 'react';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('REQUEST_OTP'); // 'REQUEST_OTP' | 'VERIFY_OTP'
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Setup invisible reCAPTCHA for phone SMS
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {}
      });
    }
  };

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (identifier.includes('@')) {
        // Option A: Backend Email OTP route call
        const res = await fetch('/api/auth/send-email-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: identifier })
        });
        if (!res.ok) throw new Error('Failed to send email OTP');
        setStep('VERIFY_OTP');
      } else {
        // Option B: Firebase Phone SMS OTP
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        const formattedPhone = identifier.startsWith('+') ? identifier : `+91${identifier}`;
        const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        setConfirmationResult(confirmation);
        setStep('VERIFY_OTP');
      }
    } catch (err) {
      setError(err.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (confirmationResult) {
        // Verify Firebase Phone OTP
        const result = await confirmationResult.confirm(otp);
        const token = await result.user.getIdToken();
        localStorage.setItem('sentinel_token', token);
        onSuccess(result.user);
      } else {
        // Verify Backend Email OTP
        const res = await fetch('/api/auth/verify-email-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: identifier, otp })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Invalid OTP');
        localStorage.setItem('sentinel_token', data.token);
        onSuccess(data.user);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'OTP Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div id="recaptcha-container"></div>
      <div className="w-full max-w-md p-8 bg-[#0B0F19] border border-cyan-500/30 rounded-lg shadow-2xl text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-mono tracking-wider text-cyan-400">
            {step === 'REQUEST_OTP' ? 'SENTINEL ACCESS AUTHENTICATION' : 'ENTER VERIFICATION CODE'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        {error && <div className="mb-4 text-xs text-red-400 bg-red-950/40 p-2 border border-red-500/30 rounded">{error}</div>}

        {step === 'REQUEST_OTP' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2">EMAIL ADDRESS OR PHONE NUMBER</label>
              <input
                type="text"
                placeholder="user@isro.gov.in or +919876543210"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#131B2E] border border-gray-700 rounded text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold tracking-wider text-sm rounded transition-all duration-200"
            >
              {loading ? 'SENDING OTP...' : 'TRANSMIT OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2">6-DIGIT VERIFICATION CODE</label>
              <input
                type="text"
                maxLength="6"
                placeholder="------"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full text-center tracking-widest text-xl px-4 py-3 bg-[#131B2E] border border-gray-700 rounded text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold tracking-wider text-sm rounded transition-all duration-200"
            >
              {loading ? 'VERIFYING...' : 'AUTHENTICATE ACCESS'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;