import { useChannel } from "@/lib/useChannel";
import { sizeChannel } from "@/lib/windowControls";
import { ReactNode, useEffect, useRef } from "react";

export default function WindowFrame({ children }: { children: ReactNode }) {
  const isMaximized = useChannel<boolean>(sizeChannel);
  const frameRef = useRef<HTMLElement | null>(null);

  const reshape = (isMaximized: boolean) =>
    frameRef.current
      ? isMaximized
        ? frameRef.current.classList.remove("rounded-xl")
        : frameRef.current.classList.add("rounded-xl")
      : null;

  useEffect(() => {
    if (!frameRef.current) return;
    reshape(isMaximized!);
  }, [isMaximized]);

  return (
    <main ref={frameRef} className="window-frame">
      {children}
    </main>
  );
}
