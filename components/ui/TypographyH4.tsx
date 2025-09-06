import { TypographyHeadingType } from "./TypographyH1";

export function TypographyH4({ children }: TypographyHeadingType) {
  return (
    <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
      {children}
    </h4>
  );
}
