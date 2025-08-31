import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a brief delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-4 md:right-auto md:max-w-md">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 transform transition-all duration-300 ease-in-out">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-flame flex items-center justify-center">
                <span className="text-lavender-blush text-xs">🍪</span>
              </div>
              <h3 className="font-semibold text-black text-sm">Cookie Notice</h3>
            </div>
            <p className="text-gray text-xs leading-relaxed mb-3">
              Good news! This app doesn't use cookies or track you. We only store your settings locally on your device for a better experience.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="bg-flame text-lavender-blush px-3 py-1.5 rounded-md text-xs font-medium hover:bg-flame transition-colors"
              >
                Got it!
              </button>
              <button
                onClick={handleDismiss}
                className="text-gray hover:text-black text-xs font-medium transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray hover:text-black transition-colors p-1"
            aria-label="Dismiss cookie notice"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
