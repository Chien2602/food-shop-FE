import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"

export default function ShopPrivacy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information that you provide directly to us, including:
      - Name and contact information
      - Billing and shipping address
      - Payment information
      - Account credentials
      - Order history
      - Communication preferences
      
      We also automatically collect certain information when you visit our website, such as:
      - Device information
      - IP address
      - Browser type
      - Pages visited
      - Time spent on pages
      - Referring website`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information we collect to:
      - Process and fulfill your orders
      - Communicate with you about your orders
      - Send you marketing communications (with your consent)
      - Improve our website and services
      - Prevent fraud and enhance security
      - Comply with legal obligations`,
    },
    {
      title: "3. Information Sharing",
      content: `We may share your information with:
      - Service providers who assist in our operations
      - Payment processors
      - Shipping partners
      - Marketing partners (with your consent)
      - Legal authorities when required by law
      
      We do not sell your personal information to third parties.`,
    },
    {
      title: "4. Your Rights",
      content: `You have the right to:
      - Access your personal information
      - Correct inaccurate information
      - Request deletion of your information
      - Opt-out of marketing communications
      - Object to processing of your information
      - Data portability
      
      To exercise these rights, please contact our privacy team.`,
    },
    {
      title: "5. Cookies and Tracking",
      content: `We use cookies and similar tracking technologies to:
      - Remember your preferences
      - Understand how you use our website
      - Improve your shopping experience
      - Show you relevant advertisements
      
      You can control cookie settings through your browser preferences.`,
    },
    {
      title: "6. Data Security",
      content: `We implement appropriate security measures to protect your personal information, including:
      - Encryption of sensitive data
      - Regular security assessments
      - Access controls
      - Secure data storage
      - Employee training on data protection`,
    },
    {
      title: "7. Children's Privacy",
      content: `Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.`,
    },
    {
      title: "8. International Transfers",
      content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information.`,
    },
    {
      title: "9. Changes to Privacy Policy",
      content: `We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.`,
    },
    {
      title: "10. Contact Us",
      content: `If you have any questions about this privacy policy or our data practices, please contact us at:
      
      Email: privacy@foodshop.com
      Phone: +1 (555) 123-4567
      Address: 123 Food Street, Cuisine City, FC 12345`,
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            We are committed to protecting your privacy and ensuring the security of your personal information.
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