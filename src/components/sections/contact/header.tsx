import type { Site } from "@/content";
import { PageHeader } from "@/components/sections/page-header";

export function ContactHeader({ site }: { site: Site }) {
  const { heading, subline, label } = site.contactPage.header;

  return <PageHeader eyebrow={label} heading={heading} subline={subline} />;
}
