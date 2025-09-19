import {useState, useEffect, type  RefObject} from 'react';

const useResizeObserver = (
    ref: RefObject<Element | null>,
    options?: ResizeObserverOptions
): {width:number;height:number} => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current){
        console.warn("ResizeObserver: ref.current is null");
        return;
    }

    const observer = new ResizeObserver((entries) => {
      if (entries.length === 0) return;
      const entry = entries[0];
        setSize({ 
            width: entry.contentRect.width,
            height: entry.contentRect.height
        });
    });

    observer.observe(ref.current, options);

    return () => {
      if(ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, [ref, options]);

  return size;
};

export default useResizeObserver;