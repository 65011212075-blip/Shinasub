import type { Site } from "./types";

// English content — source language, ported from the original
// shinasub.com copy verbatim. See th.ts for the Thai translation and
// src/content/index.ts for how a locale resolves to one of these.
export const siteEn: Site = {
  locale: "en",
  htmlLang: "en",
  name: "SHINASUB",
  legalName: "Shinasub Company Limited",
  tagline: "Corporate Profile — Innovative Solutions, Future Forward.",
  founded: {
    isoDate: "2013-12-06",
    displayYear: "2013",
    years: "11+",
  },
  logo: {
    light: "/images/Shinasub_Logo.png",
    dark: "/images/Shinasub-Logo-W.png",
    width: 586,
    height: 427,
  },
  contact: {
    addressFull:
      "Room 2, Units 1501-1504, 15th Floor, Silom Edge Building, Silom Road, Suriyawong Subdistrict, Bang Rak District, Bangkok 10500, Thailand",
    addressShort: "Bangkok, Silom, Bangkok 10500, Thailand",
    phone: "02-080-9880",
    phoneHref: "tel:+66020809880",
    fax: "02-080-9880",
    email: "sales@shinasub.com",
    coords: {
      lat: 13.729414872738044,
      lng: 100.53582288994332,
      label: "13.729414872738044° N, 100.53582288994332° E",
      building: "Silom Edge Building",
    },
    mapImage: "/images/silom_Edge.jpg",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ],
  navCta: { label: "Contact Us", href: "/contact" },
  mobileMenuLabel: "Open menu",
  languageSwitcher: {
    label: "Language",
    en: "EN",
    th: "TH",
  },
  skipToContent: "Skip to content",
  stats: [
    { value: 2013, suffix: "", label: "Established", format: "year" },
    { value: 11, suffix: "+", label: "Years of Experience", format: "number" },
    { value: 99.9, suffix: "%", label: "Uptime", format: "decimal" },
    { value: 24, suffix: "/7", label: "Monitoring", format: "number" },
    { value: 8, suffix: "", label: "Infrastructure Systems", format: "number" },
  ],

  meta: {
    layout: {
      title: "SHINASUB — Thailand's Technology Infrastructure Leader",
      description:
        "Shinasub designs, installs, and manages ICT infrastructure across Thailand — Wi-Fi, networking, CCTV, fiber, and server rooms for government and enterprise.",
    },
    home: {
      title: "SHINASUB — Thailand's Technology Infrastructure Leader",
      description:
        "Leading wired and wireless ICT — from smart buildings to nationwide digital networks. Design, installation, and 24/7 managed operations.",
    },
    about: {
      title: "About Us",
      description:
        "Founded in 2013, Shinasub is a leading ICT infrastructure provider in Thailand, trusted by government agencies and private enterprises for 11+ years.",
    },
    services: {
      title: "Services",
      description:
        "End-to-end ICT infrastructure services: Wi-Fi, network, CCTV, internet HSIA, switching, server rooms, cabling, and 24/7 managed operations.",
    },
    contact: {
      title: "Contact Us",
      description:
        "Reach Shinasub's Bangkok headquarters at Silom Edge Building — phone, email, fax, or send a message about your ICT infrastructure project.",
    },
  },

  home: {
    hero: {
      h1: "Thailand's Technology Infrastructure Leader",
      subline:
        "Leading wired and wireless ICT — from smart buildings to nationwide digital networks.",
      ctaPrimary: { label: "READ MORE", href: "/about" },
      ctaSecondary: { label: "VIEW ALL SERVICES", href: "/services" },
    },
    coreServices: {
      heading: "Our Core Services",
      intro:
        "We provide end-to-end ICT solutions, from initial design and professional installation to ongoing management and maintenance with zero-latency targets.",
      cards: [
        {
          index: "01",
          name: "Design & Implementation",
          description:
            "We deliver comprehensive IT and network infrastructure solutions from Wi-Fi and CCTV to server rooms and structured cabling.",
        },
        {
          index: "02",
          name: "Installation & Deployment",
          description:
            "Our expert teams provide professional, on-site installation and deployment of Wi-Fi networks, fiber optics, and various event systems.",
        },
        {
          index: "03",
          name: "Manage & Maintenance",
          description:
            "We offer ongoing management and proactive support for your networks, ensuring reliable performance and continuous operation.",
        },
      ],
      cta: { label: "VIEW ALL SERVICES", href: "/services" },
    },
    profileBand: {
      heading: "Innovative Solutions, Future Forward.",
      body: "Empowering businesses with advanced, forward-thinking solutions tailored to your needs. Partner with us today to power your future.",
      cta: { label: "Contact Us", href: "/contact" },
    },
  },

  about: {
    header: {
      heading: "About Our Company",
      subheading:
        "Founded in 2013, Shinasub is a leading ICT infrastructure provider in Thailand",
      badge: "Establishment / 2013",
    },
    journey: {
      heading: "About Our Journey",
      body: "Established on December 6, 2013, Shinasub began with a clear vision: to become a trusted leader in delivering comprehensive ICT solutions. Over the past 11 years, we have transformed that vision into reality, building skilled professional team and deep expertise in designing, installing, and maintaining modern ICT systems. Our capabilities span network infrastructure, telecommunications, and cybersecurity, enabling us to support organizations across Thailand with reliable, future-ready solutions. Today, Shinasub stands as a proven technology partner for leading government agencies and private enterprises, driving innovation and strengthening competitiveness in the digital era.",
      timeline: [
        { year: "2013", label: "Founded", detail: "Shinasub established on December 6, 2013." },
        {
          year: "Today",
          label: "11+ years",
          detail: "A proven technology partner for government agencies and private enterprises.",
        },
      ],
    },
    visionMission: [
      {
        index: "01",
        name: "Our Vision",
        description:
          "As a trusted system integrator in Thailand, we focus on customer-centric design, seamless implementation, and advanced technology management.",
      },
      {
        index: "02",
        name: "Our Mission",
        description:
          "We create future-proof ICT and security ecosystems that enable smart living and digital innovation. With end-to-end expertise, we connect properties and cities through intelligent wired and wireless solutions to enable effective communication and a competitive advantage to our customers.",
      },
    ],
    coreServices: {
      heading: "Comprehensive ICT Solutions",
      body: "We provide end-to-end ICT system design, installation, and maintenance services.",
      imageAlt: "Illustration of connected end-to-end technology services across a city network",
      expertiseHeading: "Specialized Expertise",
      expertise: [
        "CCTV & Surveillance Systems",
        "Access Control & Security",
        "Structured Cabling & Networking",
        "Server Room Design & Implementation",
      ],
      approachHeading: "Client-Focused Approach",
      approachBody:
        "We work closely with clients to understand their unique needs and deliver tailored solutions. Our collaborative approach ensures every project is aligned with their goals, providing personalized service and measurable results.",
    },
    commitment: {
      heading: "Our Commitment",
      label: "Service Level Commitment",
      body: "Our team is committed to delivering exceptional results—offering full-service ICT solutions, from consultation to installation and maintenance. We integrate cutting-edge technology with professional project management to ensure timely, cost-effective, and outstanding outcomes.",
    },
    cta: { label: "Contact Us", href: "/contact" },
    ctaBanner: {
      heading: "Ready to strengthen your infrastructure?",
      body: "Talk to our team about design, installation, or ongoing management for your network.",
    },
  },

  services: {
    header: {
      eyebrow: "IT Infrastructure & Network Solutions",
      h1: "Design. Installation. Manage.",
      subline: "End-to-End IT solutions crafted to boost efficiency, security, and growth.",
      cta: { label: "Contact Us", href: "/contact" },
      badge: "Infrastructure Stability — 99.9% Uptime",
      tagline: "Engineering the Network backbone of the future.",
    },
    guide: {
      quote:
        "We offer comprehensive IT infrastructure services—from design and installation to 24/7 management—ensuring your systems are robust, scalable, and future-ready.",
      viewDetailsLabel: "View details",
      pillars: [
        {
          index: "01",
          name: "Design & Implement",
          description: "Network architecture designed to support your operations.",
          anchor: "design-implementation",
        },
        {
          index: "02",
          name: "Installation & Deploy",
          description: "Reliable network deployment and integration.",
          anchor: "installation-deployment",
        },
        {
          index: "03",
          name: "Manage & Maintenance",
          description: "24/7 monitoring and system optimization.",
          anchor: "managed-operations",
        },
      ],
    },
    designImplementation: {
      anchor: "design-implementation",
      heading: "Design & Implementation",
      intro:
        "We design IT infrastructure and network systems tailored to your business to enhance efficiency and security. Our team combines careful planning with engineering expertise to deliver reliable, future-ready solutions.",
      systems: [
        {
          code: "SYS 01",
          name: "Wi-Fi System",
          description:
            "High-density wireless design with predictive RF planning, roaming optimization, and secure access control.",
          status: "Ready",
          icon: "wifi",
        },
        {
          code: "SYS 02",
          name: "Network System",
          description:
            "Layered LAN architecture with redundancy, segmentation, and performance-driven design.",
          status: "Ready",
          icon: "network",
        },
        {
          code: "SYS 03",
          name: "CCTV System",
          description:
            "IP surveillance systems with centralized monitoring, recording, and secure access.",
          status: "Ready",
          icon: "cctv",
        },
        {
          code: "SYS 04",
          name: "Internet HSIA",
          description:
            "Carrier-grade high-speed internet access for hospitality, malls, and large commercial sites.",
          status: "Ready",
          icon: "globe",
        },
        {
          code: "SYS 05",
          name: "Switch Management",
          description:
            "Core, aggregation, and access switching with VLAN, QoS, and scalable topology design.",
          status: "Ready",
          icon: "switch",
        },
        {
          code: "SYS 06",
          name: "Server Room",
          description:
            "Secure server rooms with structured racks, power redundancy, cooling, and monitoring.",
          status: "Ready",
          icon: "server",
        },
        {
          code: "SYS 07",
          name: "Cabling Infra",
          description:
            "Fiber and UTP structured cabling compliant with performance and reliability standards.",
          status: "Ready",
          icon: "cable",
        },
        {
          code: "SYS 08",
          name: "BOH Systems",
          description:
            "Back-of-house network systems supporting operational workflows and internal services.",
          status: "Ready",
          icon: "layout-grid",
        },
      ],
    },
    installationDeployment: {
      anchor: "installation-deployment",
      heading: "Installation & Deployment",
      intro:
        "Professional installation and deployment of designed systems, ensuring quality and compliance with industry standards. Our technicians work diligently to deliver seamless implementation that meets your business requirements.",
      steps: [
        {
          index: "01",
          name: "Enterprise Wi-Fi Deployment",
          description:
            "Install the designed Wi-Fi networks to provide efficient coverage across target areas.",
        },
        {
          index: "02",
          name: "Network Configuration",
          description:
            "Complete installation of network systems and related equipment for optimal performance.",
        },
        {
          index: "03",
          name: "Wireless Network",
          description: "Setup wireless networks to ensure convenient, fast and secure connectivity.",
        },
        {
          index: "04",
          name: "Fiber Optic and Cable Wiring",
          description: "Perform precise and secure fiber optic and cable wiring with a neat finish.",
        },
        {
          index: "05",
          name: "Data Center",
          description:
            "Install and configure equipment and systems within server rooms, ensuring proper setup and functionality.",
        },
        {
          index: "06",
          name: "Internet at Events",
          description: "Provide reliable internet installation services for events and temporary setups.",
        },
      ],
    },
    managedOperations: {
      anchor: "managed-operations",
      heading: "Managed Operations & Maintenance",
      badge: "24/7 Monitoring",
      intro:
        "Ongoing management and maintenance services to keep your network and equipment running smoothly while minimizing risks of failure. We provide monitoring, troubleshooting, and proactive maintenance tailored to your systems.",
      items: [
        {
          name: "Real-time Monitoring (Wi-Fi)",
          description: "Monitor and maintain Wi-Fi networks to ensure continuous, high-quality performance.",
        },
        {
          name: "Server Room",
          description: "Manage and maintain the server room environment and systems for optimal reliability.",
        },
        {
          name: "Fiber Optic Backbone (FOBB)",
          description:
            "Maintain the core fiber optic cabling systems to guarantee stability and long-term performance.",
        },
        {
          name: "Internet Service",
          description: "Ensure internet connectivity remains stable and performs optimally.",
        },
        {
          name: "Events",
          description: "Provide support and maintenance for internet usage during various events and temporary setup.",
        },
      ],
    },
    cta: { label: "Contact Us", href: "/contact" },
    ctaBanner: {
      heading: "Let's design your next system.",
      body: "Tell us about your site and timeline — our team will scope the right infrastructure for it.",
    },
  },

  contactPage: {
    header: {
      heading: "Contact Us",
      subline: "Take your infrastructure to the next level",
      label: "Technical Support",
    },
    cards: [
      {
        title: "Location HQ",
        value:
          "Room 2, Units 1501-1504, 15th Floor, Silom Edge Building, Silom Road, Suriyawong Subdistrict, Bang Rak District, Bangkok 10500, Thailand",
        icon: "map-pin",
      },
      {
        title: "Contact Number",
        value: "02-080-9880",
        href: "tel:+66020809880",
        icon: "phone",
      },
      {
        title: "Contact Email",
        value: "sales@shinasub.com",
        href: "mailto:sales@shinasub.com",
        icon: "mail",
      },
      {
        title: "FAX",
        value: "02-080-9880",
        icon: "printer",
      },
    ],
    copyLabel: "Copy",
    copiedLabel: "Copied",
    map: {
      heading: "Bangkok Headquarters",
      coordPrefix: "COORD:",
      building: "Silom Edge Building",
      image: "/images/silom_Edge.jpg",
      loadCta: "Load interactive map",
    },
    form: {
      heading: "Send Us a Message",
      serviceOptions: [
        "SYS 01 — Wi-Fi System",
        "SYS 02 — Network System",
        "SYS 03 — CCTV System",
        "SYS 04 — Internet HSIA",
        "SYS 05 — Switch Management",
        "SYS 06 — Server Room",
        "SYS 07 — Cabling Infra",
        "SYS 08 — BOH Systems",
        "Installation & Deployment",
        "Managed Operations & Maintenance",
        "Other",
      ],
      labels: {
        name: "Full name",
        company: "Company",
        email: "Email",
        phone: "Phone",
        service: "Service of interest",
        message: "Message",
      },
      servicePlaceholder: "Select a service",
      submit: "Send message",
      submitting: "Sending…",
      validation: {
        nameRequired: "Enter your full name.",
        emailInvalid: "Enter a valid email address.",
        serviceRequired: "Select the service you're interested in.",
        messageMinLength: "Tell us a little more (10 characters minimum).",
      },
      status: {
        mockSuccess: "Thanks — your message has been received. We'll be in touch soon.",
        liveSuccess: "Thanks — your message has been sent. We'll be in touch soon.",
        error: "We couldn't send your message right now. Please try again shortly.",
        invalid: "Please check the highlighted fields and try again.",
      },
    },
  },

  footer: {
    tagline: "Corporate Profile — Innovative Solutions, Future Forward.",
    body: "Empowering businesses with advanced, forward-thinking solutions tailored to your needs. Partner with us today to power your future.",
    columnHeading: "Our Company",
    links: [
      { label: "Overview", href: "/about" },
      { label: "Service", href: "/services" },
      { label: "Contact & Support", href: "/contact" },
    ],
    faxLabel: "FAX",
    copyright: "All rights reserved.",
  },

  notFound: {
    eyebrow: "404",
    heading: "This page could not be found.",
    body: "The page you're looking for may have moved or no longer exists. Try one of the links below.",
    ctaHome: "Back to home",
    ctaContact: "Contact us",
  },
};
