import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageBackground } from "@/components/layout/PageBackground";
import { StoreBadgeLinks } from "@/components/ui/StoreBadgeLinks";
import { CONTACT_EMAIL } from "@/content/landing";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Which Font?",
  description:
    "Which Font? does not collect, store, or share any personal user data. Font inspection runs entirely in your browser.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBackground />
      <Header />
      <main className="pt-28 pb-16 md:pt-32">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <article className="glass-card flex flex-col gap-8 p-6 md:p-10">
            <div className="flex flex-col gap-4">
              <span className="section-eyebrow">Legal</span>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Privacy Policy
              </h1>
              <p className="text-base leading-relaxed text-muted">
                Which Font? does not collect, store, or share any personal user
                data.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Font and typography inspection runs entirely in your browser on
                the page you are viewing. No browsing data, page content, or
                inspected element details are transmitted to our servers or any
                third party.
              </p>
              <p className="text-base leading-relaxed text-muted">
                Any extension preferences are stored locally on your device
                using Chrome storage APIs. We do not use analytics, tracking, or
                advertising SDKs.
              </p>
              <p className="text-base leading-relaxed text-muted">
                We respect user privacy and are committed to keeping your
                browsing experience secure.
              </p>
            </div>

            <div className="flex flex-col gap-6 border-t border-border-subtle pt-6">
              <p className="text-sm font-medium text-foreground">
                Get the extension
              </p>
              <StoreBadgeLinks variant="light" size="sm" />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-200 hover:bg-brand-500 hover:shadow-brand-500/30"
              >
                Back to Home
              </Link>
              <p className="text-sm text-muted">
                Questions?{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-brand-600 underline-offset-2 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
