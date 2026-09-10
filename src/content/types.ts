// Shared shape for both locales' content (src/content/en.ts, th.ts).
// Deliberately NOT derived via `typeof enSite` with `as const` — that would
// infer literal string types from the English copy and make it impossible
// for th.ts to type-check with different text. Fields that are genuinely
// invariant across locales (icon identifiers, numeric-format tags) keep
// literal union types; everything else is `string`/`number`.

export type SystemIcon =
  | "wifi"
  | "network"
  | "cctv"
  | "globe"
  | "switch"
  | "server"
  | "cable"
  | "layout-grid";

export type SystemSpec = {
  code: string;
  name: string;
  description: string;
  status: string;
  icon: SystemIcon;
};

export type DeploymentStep = {
  index: string;
  name: string;
  description: string;
};

export type MaintenanceItem = {
  name: string;
  description: string;
};

export type NavItem = { label: string; href: string };
export type CtaLink = { label: string; href: string };

export type StatFormat = "year" | "number" | "decimal";
export type Stat = { value: number; suffix: string; label: string; format: StatFormat };

export type ContactCardIcon = "map-pin" | "phone" | "mail" | "printer";
export type ContactCard = {
  title: string;
  value: string;
  icon: ContactCardIcon;
  href?: string;
};

export type PageMeta = { title: string; description: string };

export type Site = {
  locale: "en" | "th";
  htmlLang: string;
  name: string;
  legalName: string;
  tagline: string;
  founded: {
    isoDate: string;
    displayYear: string;
    years: string;
  };
  logo: {
    light: string;
    dark: string;
    width: number;
    height: number;
  };
  contact: {
    addressFull: string;
    addressShort: string;
    phone: string;
    phoneHref: string;
    fax: string;
    email: string;
    coords: {
      lat: number;
      lng: number;
      label: string;
      building: string;
    };
    mapImage: string;
  };
  nav: NavItem[];
  navCta: CtaLink;
  mobileMenuLabel: string;
  languageSwitcher: {
    label: string;
    en: string;
    th: string;
  };
  skipToContent: string;
  stats: Stat[];

  meta: {
    layout: PageMeta;
    home: PageMeta;
    about: PageMeta;
    services: PageMeta;
    contact: PageMeta;
  };

  home: {
    hero: {
      h1: string;
      subline: string;
      ctaPrimary: CtaLink;
      ctaSecondary: CtaLink;
    };
    coreServices: {
      heading: string;
      intro: string;
      cards: { index: string; name: string; description: string }[];
      cta: CtaLink;
    };
    profileBand: {
      heading: string;
      body: string;
      cta: CtaLink;
    };
  };

  about: {
    header: {
      heading: string;
      subheading: string;
      badge: string;
    };
    journey: {
      heading: string;
      body: string;
      timeline: { year: string; label: string; detail: string }[];
    };
    visionMission: { index: string; name: string; description: string }[];
    coreServices: {
      heading: string;
      body: string;
      imageAlt: string;
      expertiseHeading: string;
      expertise: string[];
      approachHeading: string;
      approachBody: string;
    };
    commitment: {
      heading: string;
      label: string;
      body: string;
    };
    cta: CtaLink;
    ctaBanner: { heading: string; body: string };
  };

  services: {
    header: {
      eyebrow: string;
      h1: string;
      subline: string;
      cta: CtaLink;
      badge: string;
      tagline: string;
    };
    guide: {
      quote: string;
      viewDetailsLabel: string;
      pillars: { index: string; name: string; description: string; anchor: string }[];
    };
    designImplementation: {
      anchor: string;
      heading: string;
      intro: string;
      systems: SystemSpec[];
    };
    installationDeployment: {
      anchor: string;
      heading: string;
      intro: string;
      steps: DeploymentStep[];
    };
    managedOperations: {
      anchor: string;
      heading: string;
      badge: string;
      intro: string;
      items: MaintenanceItem[];
    };
    cta: CtaLink;
    ctaBanner: { heading: string; body: string };
  };

  contactPage: {
    header: {
      heading: string;
      subline: string;
      label: string;
    };
    cards: ContactCard[];
    copyLabel: string;
    copiedLabel: string;
    map: {
      heading: string;
      coordPrefix: string;
      building: string;
      image: string;
      loadCta: string;
    };
    form: {
      heading: string;
      serviceOptions: string[];
      labels: {
        name: string;
        company: string;
        email: string;
        phone: string;
        service: string;
        message: string;
      };
      servicePlaceholder: string;
      submit: string;
      submitting: string;
      validation: {
        nameRequired: string;
        emailInvalid: string;
        serviceRequired: string;
        messageMinLength: string;
      };
      status: {
        mockSuccess: string;
        liveSuccess: string;
        error: string;
        invalid: string;
      };
    };
  };

  footer: {
    tagline: string;
    body: string;
    columnHeading: string;
    links: NavItem[];
    faxLabel: string;
    copyright: string;
  };

  notFound: {
    eyebrow: string;
    heading: string;
    body: string;
    ctaHome: string;
    ctaContact: string;
  };
};
