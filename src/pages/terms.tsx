import { SEO } from "@/components/seo";
import { PolicyPageLayout } from "@/components/website/policy-page-layout";

export default function TermsPage() {
  return (
    <>
      <SEO title="Terms of Service" />
      <PolicyPageLayout title="Terms of Service">
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
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using the website and services of CHAAD Energy &
            Industrial Services Ltd, you agree to be bound by these Terms of
            Service. If you do not agree, please do not use our website or
            services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            2. Use of Website
          </h2>
          <p>
            You may use this website for lawful purposes only. You must not use
            it in any way that is unlawful, harmful, or that could damage,
            disable, or impair our systems or security. You are responsible for
            maintaining the confidentiality of any account credentials and for
            all activity under your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            3. Intellectual Property
          </h2>
          <p>
            All content on this website, including text, graphics, logos, and
            images, is the property of CHAAD Energy or its licensors and is
            protected by copyright and other intellectual property laws. You may
            not reproduce, distribute, or use our content without prior written
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            4. Services and Quotations
          </h2>
          <p>
            Information on this website about our services is for general
            information only. Formal quotations, contracts, and project terms
            are subject to separate written agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            5. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, CHAAD Energy shall not be
            liable for any indirect, incidental, special, or consequential
            damages arising from your use of this website or our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">6. Contact</h2>
          <p>
            For questions about these Terms of Service, contact us at
            hello@chaad.com or via our Contact page.
          </p>
        </section>
      </PolicyPageLayout>
    </>
  );
}
