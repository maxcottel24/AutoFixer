import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'loading' | 'confirmed'>('loading');
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (status === 'loading' && isOpen) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('confirmed');
            setTimeout(() => {
              onSuccess();
              onClose();
              setStatus('loading');
              setProgress(0);
            }, 2000);
            return 100;
          }
          const newProgress = prev + Math.random() * 8 + 2;
          return Math.min(newProgress, 100); // S'assurer qu'on ne dépasse jamais 100%
        });
      }, 400);

      return () => clearInterval(interval);
    }
  }, [status, onSuccess, onClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className={`bg-gray-900 rounded-lg p-4 sm:p-6 w-full max-w-sm mx-2 relative transition-all duration-300 transform ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {status === 'loading' ? (
            <div className="py-6 sm:py-8 flex flex-col items-center gap-4 sm:gap-6 w-full">
              <Text variant="paymentModalTransferFunds" className="text-center px-2">
                {t('paymentModal.transferFunds')}
              </Text>
              
              <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3">
                <div 
                  className="bg-green-500 h-2 sm:h-3 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <Text variant="paymentModalProgress" className="text-gray-400 text-center">
                {Math.round(progress)}% {t('paymentModal.completed')}
              </Text>
            </div>
          ) : (
            <div className="py-6 sm:py-8 flex flex-col items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={24} className="sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-center px-2">
                <Text variant="paymentModalPaymentConfirmed" className="mb-1 sm:mb-2">
                  {t('paymentModal.paymentConfirmed')}
                </Text>
                <Text variant="paymentModalPaymentSuccess" className="text-green-400">
                  {t('paymentModal.paymentSuccess')}
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 