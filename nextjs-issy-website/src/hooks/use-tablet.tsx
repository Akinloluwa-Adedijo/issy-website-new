import * as React from "react";

const TABLET_BREAKPOINT = 1024;

export function useTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`);
    const onChange = () => {
      setIsTablet(window.innerWidth <= TABLET_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsTablet(window.innerWidth <= TABLET_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isTablet;
}
