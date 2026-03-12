import { SEO } from "@/components/seo";
import { PolicyPageLayout } from "@/components/website/policy-page-layout";

export default function CookiesPage() {
  return (
    <>
      <SEO title="Cookie Policy" />
      <PolicyPageLayout title="Cookie Policy">
        <p className="text-[#64748B] text-sm">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            1. What Are Cookies
          </h2>
          <p>
            Cookies are small text files stored on your device when you visit
            our website. They help us provide a better experience by remembering
            preferences, understanding how you use our site, and improving
            performance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            2. How We Use Cookies
          </h2>
          <p>
            We use cookies for essential site functionality (e.g. security, load
            balancing), analytics to understand visitor behaviour and improve
            our website, and preferences (e.g. language or region settings where
            applicable). We do not use cookies to track you for advertising
            without your consent where required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            3. Types of Cookies We Use
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Strictly necessary:</strong> Required for the website to
              function (e.g. security, session management).
            </li>
            <li>
              <strong>Functional:</strong> Enable enhanced features and
              personalisation.
            </li>
            <li>
              <strong>Analytics:</strong> Help us understand how visitors use
              our site (e.g. pages viewed, time on site).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            4. Managing Cookies
          </h2>
          <p>
            You can control or delete cookies through your browser settings.
            Note that disabling certain cookies may affect site functionality.
            For more information, see your browser&apos;s help section or visit
            www.aboutcookies.org.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">5. Contact</h2>
          <p>
            For questions about our use of cookies, contact us at
            hello@chaad.com or via our Contact page.
          </p>
        </section>
      </PolicyPageLayout>
    </>
  );
}
