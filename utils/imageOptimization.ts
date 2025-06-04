import { StaticImageData } from 'next/image';

interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  quality?: number;
}

export const getOptimizedImageProps = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  quality = 75,
}: ImageProps) => {
  return {
    src,
    alt,
    width,
    height,
    loading: priority ? 'eager' : 'lazy',
    className,
    quality,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    placeholder: 'blur',
    blurDataURL: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmUyZTIiLz48L3N2Zz4=',
  };
};

export const preloadCriticalImages = (imagePaths: string[]) => {
  if (typeof document === 'undefined') return;
  
  imagePaths.forEach((path) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    link.type = 'image/webp'; // Prefer WebP if available
    document.head.appendChild(link);
  });
}; 