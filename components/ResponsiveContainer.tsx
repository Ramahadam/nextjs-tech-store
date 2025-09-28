import { ReactNode } from "react";

function ResponsiveContainer({ children }: { children: ReactNode }) {
  return (
    <article className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
      {children}
    </article>
  );
}

export default ResponsiveContainer;
