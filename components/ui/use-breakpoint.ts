import { useEffect, useState } from 'react';

/**
 * @param breakpoint - The breakpoint to use for the mobile detection
 * @returns true if the screen width is below the breakpoint, false otherwise
 */
export function useBreakpoint(breakpoint: number = 1060) {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsBelowBreakpoint(window.innerWidth < breakpoint);
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, [breakpoint]);

  return isBelowBreakpoint;
}
