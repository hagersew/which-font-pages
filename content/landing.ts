import type { IconType } from "react-icons";
import {
  FiCopy,
  FiLayers,
  FiMousePointer,
  FiZap,
} from "react-icons/fi";

export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/which-font/bkjnfjfgcpmiifbmlmcfljigdbmkhppl";

export const FIREFOX_ADDONS_URL =
  "https://addons.mozilla.org/en-US/firefox/addon/whichfont/";

export type StoreLink = {
  id: "chrome" | "firefox";
  label: string;
  href: string;
  badgeSrc: string;
  badgeSrcLight?: string;
  alt: string;
};

export const storeLinks: StoreLink[] = [
  {
    id: "chrome",
    label: "Chrome Web Store",
    href: CHROME_STORE_URL,
    badgeSrc: "/badges/chrome-web-store.svg",
    badgeSrcLight: "/badges/chrome-web-store-light.svg",
    alt: "Available in the Chrome Web Store",
  },
  {
    id: "firefox",
    label: "Firefox Add-ons",
    href: FIREFOX_ADDONS_URL,
    badgeSrc: "/badges/firefox-addons.svg",
    alt: "Get it on Firefox Add-ons",
  },
];

export const GITHUB_URL = "#";
export const HAGERSEW_URL = "https://hagersew.com";
export const PRIVACY_URL = "/privacy-policy/";
export const CONTACT_EMAIL = "hello@whichfont.hagersew.com";

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
];

export type Feature = {
  title: string;
  description: string;
  icon: IconType;
};

export const features: Feature[] = [
  {
    title: "Instantly Identify Fonts",
    description:
      "Hover over any element and instantly discover its font family, weight, size, spacing, and styling properties.",
    icon: FiZap,
  },
  {
    title: "Elegant Floating Inspector",
    description:
      "A clean, non-intrusive popup card displays all typography details in a beautiful and easy-to-read interface.",
    icon: FiLayers,
  },
  {
    title: "Made for Modern Workflows",
    description:
      "Designed for frontend developers, UI engineers, and product designers who care about typography precision.",
    icon: FiMousePointer,
  },
  {
    title: "Copy CSS Instantly",
    description:
      "Copy font styles, colors, spacing, and computed CSS values with a single click.",
    icon: FiCopy,
  },
];

export const howItWorksSteps = [
  {
    id: 1,
    label: "Activate from toolbar",
    description:
      "Click the Which Font? icon in your browser toolbar to enter inspection mode.",
  },
  {
    id: 2,
    label: "Hover any element",
    description:
      "Move your cursor over any text or UI element to highlight it with a glowing outline.",
  },
  {
    id: 3,
    label: "Click to inspect",
    description:
      "Click an element to open the floating inspector with full typography details.",
  },
];

export type TypographyProperty = {
  label: string;
  value: string;
  cssKey: string;
};

export const typographyProperties: TypographyProperty[] = [
  { label: "Font Family", value: "Inter, sans-serif", cssKey: "font-family" },
  { label: "Font Size", value: "14px", cssKey: "font-size" },
  { label: "Font Weight", value: "400", cssKey: "font-weight" },
  { label: "Line Height", value: "1.5", cssKey: "line-height" },
  { label: "Letter Spacing", value: "-0.01em", cssKey: "letter-spacing" },
  { label: "Color", value: "#18181b", cssKey: "color" },
  { label: "Padding", value: "12px 16px", cssKey: "padding" },
  { label: "Border Radius", value: "8px", cssKey: "border-radius" },
  {
    label: "CSS Selector",
    value: "h1.hero-title",
    cssKey: "selector",
  },
];

export const cssSnippet = `font-family: 'Inter', sans-serif;
font-size: 14px;
font-weight: 400;
line-height: 1.5;
letter-spacing: -0.01em;
color: #18181b;`;

export const showcaseBullets = [
  "Non-intrusive floating inspector that stays out of your way",
  "Computed typography values you can trust",
  "One-click copy for CSS, colors, and spacing",
];

export const stats = [
  { value: "10K+", label: "Installs" },
  { value: "4.9", label: "Rating" },
  { value: "100%", label: "Free" },
];

export const testimonials = [
  {
    quote: "The easiest way to inspect fonts on the web.",
    author: "Sarah Chen",
    role: "Product Designer",
  },
  {
    quote:
      "I use Which Font? daily when building design systems. Copy CSS in one click.",
    author: "Marcus Rivera",
    role: "Frontend Engineer",
  },
  {
    quote:
      "Finally a typography inspector that feels as polished as the tools I already love.",
    author: "Elena Kowalski",
    role: "UI Engineer",
  },
];

export const trustedBy = [
  "Linear",
  "Vercel",
  "Figma",
  "Raycast",
  "Framer",
  "Arc",
];

export const demoInspectData = {
  tagName: "span",
  className: "line-clamp-5 text-sm leading-relaxed",
  typography: {
    family: "Roboto, Helvetica, Arial, sans-serif",
    size: "14px",
    weight: "400",
    style: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
  },
};

export const heroDemoInspectData = {
  tagName: "h1",
  className: "hero-title text-4xl font-bold",
  typography: {
    family: "Inter, sans-serif",
    size: "36px",
    weight: "700",
    style: "normal",
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
  },
};
