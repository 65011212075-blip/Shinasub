import type { AppLocale } from "@/i18n/routing";
import { siteEn } from "./en";
import { siteTh } from "./th";

export type { Site, SystemSpec, DeploymentStep, MaintenanceItem } from "./types";

export function getSite(locale: AppLocale) {
  return locale === "th" ? siteTh : siteEn;
}
