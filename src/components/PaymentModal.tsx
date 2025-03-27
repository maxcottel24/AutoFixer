import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess, amount }) => {
  const [status, setStatus] = useState<'pending' | 'confirmed'>('pending');

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setStatus('confirmed');
    setTimeout(() => {
      onSuccess();
      onClose();
      setStatus('pending');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center gap-6">
          {status === 'pending' ? (
            <>
              <h2 className="text-xl font-bold text-white text-center">
                Scannez pour payer
                <span className="block text-green-400 mt-1">
                  {amount.toLocaleString()} ¥
                </span>
              </h2>
              
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG
                  value={`AutoFixer Payment Request: ${amount} ¥`}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>
              
              <p className="text-gray-400 text-center text-sm mb-4">
                Veuillez scanner le QR code avec votre application bancaire
              </p>

              <button
                onClick={handleSimulateScan}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors text-sm"
              >
                Simuler le scan du QR code
              </button>
            </>
          ) : (
            <div className="py-8 flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={32} className="text-white" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-xl mb-2">
                  Identité confirmée
                </p>
                <p className="text-green-400">
                  Fonds en cours de transfert
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 