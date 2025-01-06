'use client';

/* eslint-disable */
import { type RefObject, useEffect } from 'react';
export function addScrollingClass<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  topOffset = 80
) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const element = ref?.current;
    const listener = () => {
      if (window.scrollY > topOffset) {
        element?.classList.add('is-scrolling');
      } else {
        element?.classList.remove('is-scrolling');
      }
    };
    listener();
    document.addEventListener('scroll', listener);
    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, []);
}
