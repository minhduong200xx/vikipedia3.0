import { useRef, useEffect } from "react";

function useDocumentTitle(
  title: string,
  prevailOnUnmount: boolean = false
): void {
  const defaultTitle = useRef<string>(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    [prevailOnUnmount]
  );
}

export default useDocumentTitle;
