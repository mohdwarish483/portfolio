import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: site.contactSupport,
};

export default function ContactPage() {
  return (
    <div className="pt-14">
      <ContactSection />
    </div>
  );
}
