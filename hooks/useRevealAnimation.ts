import { useEffect, useState, useRef } from 'react';

export function useRevealAnimation(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        } else if (!entry.isIntersecting && hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, hasAnimated]);

  return { elementRef, isVisible };
}

export function getRevealClass(isVisible: boolean, isMobile: boolean, type: 'up' | 'scale' = 'up') {
  if (type === 'scale') {
    return isVisible ? 'reveal-scale' : hasAnimatedOnce(isVisible) ? 'reveal-scale-out' : 'reveal-hidden';
  }
  
  const baseClass = isMobile ? 'reveal-up-mobile' : 'reveal-up';
  const exitClass = isMobile ? 'reveal-down-mobile' : 'reveal-down';
  
  if (!isVisible && hasAnimatedOnce(isVisible)) {
    return exitClass;
  }
  
  return isVisible ? baseClass : 'reveal-hidden';
}

function hasAnimatedOnce(isVisible: boolean): boolean {
  // Track if element has been visible at least once
  return !isVisible;
}
