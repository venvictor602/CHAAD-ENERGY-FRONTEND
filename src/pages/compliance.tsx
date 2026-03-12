import { SEO } from "@/components/seo";
import { PolicyPageLayout } from "@/components/website/policy-page-layout";

export default function CompliancePage() {
  return (
    <>
      <SEO title="Compliance" />
      <PolicyPageLayout title="Compliance">
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
            1. Our Commitment
          </h2>
          <p>
            CHAAD Energy & Industrial Services Ltd is committed to operating in
            compliance with applicable laws, regulations, and industry standards
            in every jurisdiction where we operate. This includes health and
            safety, environmental protection, anti-corruption, and labour
            standards.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            2. Health, Safety and Environment
          </h2>
          <p>
            We adhere to strict HSE policies and procedures in line with local
            and international requirements. Our projects are executed with a
            focus on zero harm to people and minimal impact on the environment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            3. Ethics and Anti-Corruption
          </h2>
          <p>
            We conduct our business with integrity and in accordance with
            applicable anti-corruption and anti-bribery laws. We do not tolerate
            bribery, fraud, or unethical behaviour in any form.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            4. Reporting
          </h2>
          <p>
            If you have concerns about compliance or ethical conduct, you may
            report them to hello@chaad.com or through the channels provided on
            our Contact page. We will investigate and respond appropriately
            while protecting confidentiality where possible.
          </p>
        </section>
      </PolicyPageLayout>
    </>
  );
}
