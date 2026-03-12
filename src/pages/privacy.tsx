import { SEO } from "@/components/seo";
import { PolicyPageLayout } from "@/components/website/policy-page-layout";

export default function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy Policy" />
      <PolicyPageLayout title="Privacy Policy">
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
            1. Introduction
          </h2>
          <p>
            CHAAD Energy & Industrial Services Ltd (&quot;we&quot;,
            &quot;our&quot;, or &quot;us&quot;) is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website or use our
            services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            2. Information We Collect
          </h2>
          <p>
            We may collect personal identification information (such as name,
            email address, phone number, company name, and job title) when you
            fill out a form, subscribe to our newsletter, request a
            consultation, or contact us. We also collect non-personal data such
            as browser type, IP address, and pages visited to improve our
            website and services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            3. How We Use Your Information
          </h2>
          <p>
            We use your information to respond to enquiries, send updates about
            our services and projects, improve our website, comply with legal
            obligations, and for other purposes described at the time of
            collection. We do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            4. Data Security and Retention
          </h2>
          <p>
            We implement appropriate technical and organisational measures to
            protect your personal data. We retain your information only for as
            long as necessary to fulfil the purposes for which it was collected
            or as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            5. Your Rights
          </h2>
          <p>
            Depending on your location, you may have the right to access,
            correct, delete, or restrict the processing of your personal data,
            and to object to processing or request data portability. To exercise
            these rights or ask questions about this policy, please contact us
            at the details provided on our Contact page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">6. Contact</h2>
          <p>
            For privacy-related enquiries, contact us at hello@chaad.com or via
            the address on our Contact page.
          </p>
        </section>
      </PolicyPageLayout>
    </>
  );
}
