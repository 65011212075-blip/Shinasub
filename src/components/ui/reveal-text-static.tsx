import { Fragment } from "react";

type RevealTextStaticProps = {
  text: string;
  className?: string;
};

/**
 * Word-reveal for the Hero H1 specifically. A plain server component driven
 * by CSS `animation` (see the `.word-reveal` keyframes in globals.css)
 * rather than `motion`, so the LCP-critical headline paints on its own —
 * it never sits at opacity:0 waiting for JS to hydrate the way a
 * `motion`-driven reveal would.
 */
export function RevealTextStatic({ text, className }: RevealTextStaticProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className="inline-block overflow-hidden pb-1 align-bottom">
            <span className="word-reveal" style={{ animationDelay: `${index * 60}ms` }}>
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
