import type { Site } from "@/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ScrollHighlight } from "@/components/motion/scroll-highlight";

/**
 * Full-bleed pause between the service deck and the closing call to
 * action: one sentence, set large and centred, that inks in word by word
 * as the reader scrolls through it.
 *
 * The only place on the site where motion is bound to scroll *position*
 * rather than fired once on entry — the point is to slow the reader down
 * to the pace of the sentence, which only works if the ink tracks the
 * scrollbar.
 */
export function Statement({ site }: { site: Site }) {
  const { body } = site.home.profileBand;

  return (
    <section className="bg-surface-1 py-28 sm:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12">
        <Reveal className="flex justify-center">
          <Eyebrow>{site.services.header.badge}</Eyebrow>
        </Reveal>
        <ScrollHighlight text={body} className="mt-10 font-bold tracking-[-0.03em]" />
      </div>
    </section>
  );
}
