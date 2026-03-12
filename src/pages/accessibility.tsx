import { SEO } from "@/components/seo";
import { PolicyPageLayout } from "@/components/website/policy-page-layout";

export default function AccessibilityPage() {
  return (
    <>
      <SEO title="Accessibility" />
      <PolicyPageLayout title="Accessibility">
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
            CHAAD Energy & Industrial Services Ltd is committed to ensuring our
            website is accessible to as many people as possible, including those
            with disabilities. We aim to conform to relevant accessibility
            standards and best practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            2. Standards and Practices
          </h2>
          <p>
            We strive to meet the Web Content Accessibility Guidelines (WCAG) at
            an appropriate level and to design and develop our site with
            accessibility in mind. This includes clear structure, readable text,
            sufficient colour contrast, keyboard navigation support, and
            meaningful alternative text for images where relevant.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            3. Feedback and Assistance
          </h2>
          <p>
            If you encounter any accessibility barriers on our website or need
            information in an alternative format, please contact us at
            hello@chaad.com or via our Contact page. We will work with you to
            provide the information or service you need.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">
            4. Continuous Improvement
          </h2>
          <p>
            We regularly review our website and processes to improve
            accessibility. We welcome your feedback as we work to make our
            digital presence inclusive for everyone.
          </p>
        </section>
      </PolicyPageLayout>
    </>
  );
}
