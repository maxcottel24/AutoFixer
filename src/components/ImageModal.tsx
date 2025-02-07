import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasMultipleImages: boolean;
}

export const ImageModal: React.FC<ImageModalProps> = ({ 
  imageUrl, 
  onClose, 
  onNext, 
  onPrevious,
  hasMultipleImages 
}) => {
  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        onClick={onClose}
      >
        <X size={32} />
      </button>

      {hasMultipleImages && (
        <>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition-colors"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </>
      )}

      <img 
        src={imageUrl} 
        alt="Full size"
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}; 