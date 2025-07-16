"use client";

import React, { useRef } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  onUploadStart?: () => void;
  index?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onUploadStart, index }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Call onUploadStart to show loading state
      if (onUploadStart) {
        onUploadStart();
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={handleUploadClick}
        className="px-6 py-3 rounded-md font-retro-bold text-xl flex items-center justify-center gap-2 btn-retro relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center gap-2">
          <div className="w-5 h-5 relative">
            <Image src="/sparkle.svg" alt="" width={20} height={20} className="animate-twinkle" priority />
          </div>
          Upload {index !== undefined ? `Photo ${index + 1}` : 'Memory'}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </button>
    </div>
  );
};

export default ImageUploader;
