/**
 * Utility functions to help reduce inline styles and optimize CSS
 */

/**
 * Common animation classes that can replace inline styles
 */
export const animationClasses = {
  fadeIn: 'opacity-0 animate-fadeIn',
  slideInFromLeft: 'translate-x-[-100%] animate-slideInLeft',
  slideInFromRight: 'translate-x-[100%] animate-slideInRight',
  slideInFromTop: 'translate-y-[-100%] animate-slideInTop',
  slideInFromBottom: 'translate-y-[100%] animate-slideInBottom',
  scaleIn: 'scale-0 animate-scaleIn',
  rotateIn: 'rotate-[-180deg] animate-rotateIn',
};

/**
 * Combines multiple class strings and removes duplicates
 */
export function cn(...classes: (string | undefined)[]): string {
  const uniqueClasses = new Set<string>();
  
  classes
    .filter(Boolean)
    .map(cls => cls!.trim().split(/\s+/))
    .flat()
    .forEach(cls => uniqueClasses.add(cls));
  
  return Array.from(uniqueClasses).join(' ');
}

/**
 * Replaces common inline styles with Tailwind classes
 */
export function inlineStyleToTailwind(style: React.CSSProperties): {
  tailwindClasses: string;
  remainingStyles: React.CSSProperties;
} {
  const tailwindClasses: string[] = [];
  const remainingStyles: React.CSSProperties = {};
  
  // Map common inline styles to Tailwind classes
  if (style.display === 'flex') tailwindClasses.push('flex');
  else if (style.display === 'grid') tailwindClasses.push('grid');
  else if (style.display === 'none') tailwindClasses.push('hidden');
  
  if (style.flexDirection === 'column') tailwindClasses.push('flex-col');
  if (style.justifyContent === 'center') tailwindClasses.push('justify-center');
  if (style.alignItems === 'center') tailwindClasses.push('items-center');
  
  // Process margin and padding
  if (style.margin === 'auto') tailwindClasses.push('mx-auto');
  if (style.padding === '1rem') tailwindClasses.push('p-4');
  
  // Add more mappings as needed
  
  // Remove processed properties from the original style
  const processedProps = ['display', 'flexDirection', 'justifyContent', 'alignItems', 'margin', 'padding'];
  
  Object.keys(style).forEach(key => {
    if (!processedProps.includes(key)) {
      (remainingStyles as any)[key] = style[key as keyof React.CSSProperties];
    }
  });
  
  return {
    tailwindClasses: tailwindClasses.join(' '),
    remainingStyles
  };
} 