import { type RefObject } from 'react'
import { useState,useEffect } from 'react'

const useIntersectionObserver = (
    ref:RefObject<Element | null>,
    options?: IntersectionObserverInit
):boolean  => {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    if(!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
        setIntersecting(entry.isIntersecting);
    }, options)

    observer.observe(ref.current);

    return () => {
        if(ref.current) {
            observer.unobserve(ref.current!);
        }
        observer.disconnect();
    }
  }, [ref, options]);

  return isIntersecting;
}

export default useIntersectionObserver