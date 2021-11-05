import { useState, useEffect } from "react";

export function useScroll(elRef: React.RefObject<HTMLElement>) {
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const { current } = elRef;

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // if (entry.intersectionRatio < 1) {
        if (entry.intersectionRect.height === 0) {
          setIsOver(true);
        } else {
          setIsOver(false);
        }
      });
    }, options);

    if (current) {
      observer.observe(current);
    }
    return () => observer && observer.disconnect();
  }, [elRef]);

  return { isOver };
}
