import { ReactNode } from "react";
import { TracingBeam } from '@/components/tracing-beam';

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 lg:px-20 pt-4 md:pt-10">
      <TracingBeam className="px-6 md:px-0">
        {children}
      </TracingBeam>
    </div>
  );
}
