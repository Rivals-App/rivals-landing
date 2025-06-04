import React, { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  quality?: number;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  quality = 75,
  fallbackSrc,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the image is from the media directory and use optimized version if available
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.includes('/static/media/') && !originalSrc.includes('/optimized/')) {
      // Replace with optimized version
      const srcParts = originalSrc.split('/');
      const fileName = srcParts[srcParts.length - 1];
      const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
      
      // Choose appropriate size based on width
      let sizeVariant = '';
      if (width && width < 640) sizeVariant = '-640';
      else if (width && width < 960) sizeVariant = '-960';
      else if (width && width < 1280) sizeVariant = '-1280';
      else if (width && width < 1920) sizeVariant = '-1920';
      
      return `/static/media/optimized/${baseName}${sizeVariant}.webp`;
    }
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(imgSrc);
  const effectiveClassName = `${className} ${isLoading ? 'opacity-0 transition-opacity duration-500' : 'opacity-100 transition-opacity duration-500'}`;

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={effectiveClassName}
      quality={quality}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmUyZTIiLz48L3N2Zz4="
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onLoad={() => setIsLoading(false)}
      onError={() => {
        if (fallbackSrc && imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
} 