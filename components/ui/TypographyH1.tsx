export interface TypographyHeadingType {
  children: React.ReactNode;
}

export function TypographyH1({ children }: TypographyHeadingType) {
  return (
    <h1 className="scroll-m-20  text-4xl font-medium tracking-tight text-balance">
      {children}
    </h1>
  );
}
