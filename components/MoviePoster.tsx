"use client";

import Image from "next/image";
import { useState } from "react";

interface MoviePosterProps {
  src: string;
  alt: string;
  fallbackLetter: string;
  priority?: boolean;
  className?: string;
}

export default function MoviePoster({
  src,
  alt,
  fallbackLetter,
  priority = false,
  className = "",
}: MoviePosterProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          priority={priority}
          onError={() => setHasError(true)}
        />
      )}
      {/* Fallback gradient - always present as background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900 to-amber-900 -z-10 flex items-center justify-center">
        <span className="font-display text-8xl font-bold text-white/10">
          {fallbackLetter}
        </span>
      </div>
    </div>
  );
}

