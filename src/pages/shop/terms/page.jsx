import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"

export default function ShopTerms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this website.`,
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on Food Shop's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      - Modify or copy the materials
      - Use the materials for any commercial purpose
      - Attempt to decompile or reverse engineer any software contained on Food Shop's website
      - Remove any copyright or other proprietary notations from the materials
      - Transfer the materials to another person or "mirror" the materials on any other server`,
    },
    {
      title: "3. User Account",
      content: `To access certain features of the website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.`,
    },
    {
      title: "4. Product Information",
      content: `We strive to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate. We reserve the right to discontinue any product at any time.`,
    },
    {
      title: "5. Pricing and Payment",
      content: `All prices are subject to change without notice. We reserve the right to modify or discontinue the Service without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.`,
    },
    {
      title: "6. Shipping and Delivery",
      content: `Shipping times may vary depending on the shipping method selected and the delivery location. We are not responsible for any delays in delivery that are beyond our control. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.`,
    },
    {
      title: "7. Returns and Refunds",
      content: `Our return policy is designed to ensure your satisfaction. Please refer to our Returns Policy page for detailed information about our return process, eligibility, and timeframes.`,
    },
    {
      title: "8. Intellectual Property",
      content: `The Service and its original content, features, and functionality are and will remain the exclusive property of Food Shop and its licensors. The Service is protected by copyright, trademark, and other laws.`,
    },
    {
      title: "9. Limitation of Liability",
      content: `In no event shall Food Shop, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.`,
    },
    {
      title: "10. Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.`,
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Please read these terms of service carefully before using our website.
          </p>
        </div>
      </FadeIn>

      <div className="max-w-4xl mx-auto space-y-8">
        {sections.map((section, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
} 