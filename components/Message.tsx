import {
  AlertCircleIcon,
  CheckCircle2Icon,
  type LucideIcon,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode } from "react";

interface MessageType {
  title?: string;
  variant: "destructive" | "default";
  icon?: LucideIcon;
  className?: string;
  children?: ReactNode;
}

export function Message({
  title,
  icon: IconCompoenent,
  variant = "default",
  children,
  className,
}: MessageType) {
  const renderedMessage = (
    <Alert variant={variant} className={className}>
      {IconCompoenent && <IconCompoenent />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );

  return (
    <div className="grid w-full max-w-xl items-start gap-4 mt-4">
      {renderedMessage}
    </div>
  );
}
