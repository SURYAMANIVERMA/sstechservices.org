import { ReactNode } from "react";

export const PageHero = ({ eyebrow, title, subtitle, children }: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) => (
  <section className="relative gradient-hero text-primary-foreground overflow-hidden">
    <div className="absolute inset-0 cyber-grid opacity-60" />
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-glow/70 to-transparent" />
    <div className="container relative py-20 md:py-28 text-center">
      {eyebrow && <p className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/5 border border-primary-foreground/15 backdrop-blur text-xs uppercase tracking-widest font-semibold mb-5 animate-fade-in">{eyebrow}</p>}
      <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-5 animate-fade-up">{title}</h1>
      {subtitle && <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up">{subtitle}</p>}
      {children && <div className="mt-8 animate-fade-up">{children}</div>}
    </div>
  </section>
);
