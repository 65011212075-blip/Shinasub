import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const arrowButtonVariants = cva(
  [
    "group/arrow inline-flex shrink-0 items-center gap-2.5 rounded-full font-medium whitespace-nowrap",
    "transition-[transform,background-color,color,border-color] duration-300 ease-[var(--ease-editorial)]",
    "hover:-translate-y-0.5 active:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ].join(" "),
  {
    variants: {
      variant: {
        /** Primary action anywhere on paper. */
        solid: "bg-ink text-ink-foreground hover:bg-ink-2",
        /** Sits on imagery or on the inverted band. */
        light: "bg-background text-foreground hover:bg-surface-1",
        /** Secondary action on paper. */
        outline: "border border-border bg-background text-foreground hover:bg-surface-1",
      },
      size: {
        sm: "h-9 py-1 ps-4 pe-1",
        md: "h-11 py-1 ps-5 pe-1 text-[0.9375rem]",
        lg: "h-[3.25rem] py-1 ps-6 pe-1.5 text-base",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

const badgeVariants = cva(
  "relative grid aspect-square place-items-center overflow-hidden rounded-full transition-colors duration-300",
  {
    variants: {
      variant: {
        solid: "bg-background text-ink",
        light: "bg-ink text-ink-foreground",
        outline: "bg-ink text-ink-foreground",
      },
      size: {
        sm: "h-7 [&_svg]:size-3.5",
        md: "h-9 [&_svg]:size-4",
        lg: "h-10 [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type ArrowButtonProps = VariantProps<typeof arrowButtonVariants> & {
  children: ReactNode;
  className?: string;
  /** Internal route (locale-prefixed by next-intl) or an absolute/`mailto:` URL. */
  href: string;
};

/**
 * The system's call to action: a pill with the label set against a small
 * circular arrow badge tucked into its end.
 *
 * On hover the arrow leaves the badge to the top-right while a second copy
 * enters from the bottom-left — the badge clips both, so the arrow reads as
 * travelling *through* the button. Two static arrows swapped by transform
 * keeps this on the compositor and needs no JS, which is why this is a
 * server component: CTAs appear above the fold on every page and shouldn't
 * wait on hydration to be interactive or animated.
 */
export function ArrowButton({
  children,
  className,
  href,
  variant,
  size,
}: ArrowButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden className={cn(badgeVariants({ variant, size }))}>
        <ArrowRight className="col-start-1 row-start-1 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover/arrow:translate-x-4 group-hover/arrow:-translate-y-4" />
        <ArrowRight className="col-start-1 row-start-1 -translate-x-4 translate-y-4 transition-transform duration-300 ease-[var(--ease-editorial)] group-hover/arrow:translate-x-0 group-hover/arrow:translate-y-0" />
      </span>
    </>
  );

  const classes = cn(arrowButtonVariants({ variant, size }), className);

  // next-intl's Link handles locale prefixing, which would mangle a
  // `mailto:`/`tel:`/absolute URL — those go out as a plain anchor.
  if (/^(https?:|mailto:|tel:|#)/.test(href)) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export { arrowButtonVariants };
