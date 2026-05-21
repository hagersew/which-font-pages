import {
  CHROME_STORE_URL,
  CONTACT_EMAIL,
  GITHUB_URL,
  HAGERSEW_URL,
  PRIVACY_URL,
} from "@/content/landing";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

const footerLinks = [
  { label: "Chrome Web Store", href: CHROME_STORE_URL },
  { label: "GitHub", href: GITHUB_URL },
  { label: "Privacy", href: PRIVACY_URL },
  { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-background/60 py-12 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Which Font?"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-bold">Which Font?</span>
            </Link>
            <p className="max-w-xs text-sm text-muted">
              Inspect fonts and typography instantly on any website.
            </p>
            <a
              href={HAGERSEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
            >
              Powered by Hagersew
              <FiExternalLink size={14} aria-hidden />
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 text-center text-xs text-muted md:text-left">
          © {new Date().getFullYear()} Which Font? All rights reserved.
        </div>
      </div>
    </footer>
  );
}
