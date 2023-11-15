import { useState, useEffect, useRef, MutableRefObject } from "react";

interface UseClickOutsideResult {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  nodeRef: MutableRefObject<HTMLElement | null>;
}

export default function useClickOutside(dom = "button"): UseClickOutsideResult {
  const [show, setShow] = useState(false);
  const nodeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (
        nodeRef.current &&
        !nodeRef.current.contains(target) &&
        !(target instanceof Element && target.matches(dom))
      ) {
        setShow(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dom]);

  return {
    show,
    setShow,
    nodeRef,
  };
}
