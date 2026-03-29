import Image from "next/image";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface SceneStageProps extends PropsWithChildren {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function SceneStage({
  src,
  alt,
  className,
  priority = false,
  children
}: SceneStageProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[16/9] w-full max-w-[1400px] overflow-hidden rounded-[28px] border border-[#d7b26e]/30 bg-[#140f0a] shadow-panel",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 1400px"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.1))]" />
      {children}
    </div>
  );
}
