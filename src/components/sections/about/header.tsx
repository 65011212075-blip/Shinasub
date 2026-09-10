import type { Site } from "@/content";
import { PageHeader } from "@/components/sections/page-header";

export function AboutHeader({ site }: { site: Site }) {
  const { heading, subheading, badge } = site.about.header;

  return <PageHeader eyebrow={badge} heading={heading} subline={subheading} />;
}
