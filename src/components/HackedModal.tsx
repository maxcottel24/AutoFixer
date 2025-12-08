import React, { useState, useEffect } from 'react';
import { AlertTriangle, Skull } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';

export interface HackedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const HackedModal: React.FC<HackedModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [glitchText, setGlitchText] = useState('SP4C3_P1R4T3');
  const [hackProgress, setHackProgress] = useState(0);
  const [showSkull, setShowSkull] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setHackProgress(0);
      setShowSkull(false);
      
      // Glitch effect on the text
      const glitchInterval = setInterval(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#$%^&*';
        const glitched = 'SP4C3_P1R4T3'.split('').map((char) => {
          if (Math.random() < 0.3) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return char;
        }).join('');
        setGlitchText(glitched);
      }, 100);

      // Hack progress animation
      const progressInterval = setInterval(() => {
        setHackProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            clearInterval(glitchInterval);
            setShowSkull(true);
            setTimeout(() => {
              onSuccess();
              onClose();
            }, 3000);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 200);

      return () => {
        clearInterval(glitchInterval);
        clearInterval(progressInterval);
      };
    } else {
      setIsVisible(false);
    }
  }, [isOpen, onClose, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className={`bg-gray-900 border-2 border-red-500 rounded-lg p-4 sm:p-6 w-full max-w-md mx-2 relative transition-all duration-300 transform ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <div className="absolute inset-0 bg-red-500/10 animate-pulse rounded-lg"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-500 animate-pulse" size={32} />
              <h2 className="text-2xl sm:text-3xl font-bold text-red-500 font-mono tracking-wider">
                {glitchText}
              </h2>
            </div>

            <div className="w-full">
              <Text variant="paymentModalTransferFunds" className="text-center px-2 text-red-400 mb-4">
                {t('hackedModal.intrusionDetected')}
              </Text>
              
              <div className="w-full bg-gray-800 rounded-full h-3 sm:h-4 border border-red-500">
                <div 
                  className="bg-red-500 h-3 sm:h-4 rounded-full transition-all duration-200 ease-out relative overflow-hidden"
                  style={{ width: `${Math.min(hackProgress, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
              
              <Text variant="paymentModalProgress" className="text-red-400 text-center mt-2 font-mono">
                {Math.round(hackProgress)}% {t('hackedModal.compromised')}
              </Text>
            </div>

            {showSkull && (
              <div className="flex flex-col items-center gap-3">
                <Skull className="text-red-500" size={64} />
                <div className="text-center px-2">
                  <Text variant="paymentModalPaymentConfirmed" className="mb-2 text-red-500">
                    {t('hackedModal.hackComplete')}
                  </Text>
                  <Text variant="paymentModalPaymentSuccess" className="text-red-400">
                    {t('hackedModal.fundsStolen')}
                  </Text>
                </div>
              </div>
            )}

            {!showSkull && (
              <div className="text-center px-2">
                <Text variant="carPageClass" className="text-gray-400 text-sm">
                  {t('hackedModal.warning')}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

