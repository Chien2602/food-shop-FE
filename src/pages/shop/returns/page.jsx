import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ShopReturns() {
  const sections = [
    {
      title: "Return Policy Overview",
      content: `We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of delivery for a full refund or exchange.`,
    },
    {
      title: "Eligibility",
      content: `To be eligible for a return, your item must be:
      - Unused and in the same condition that you received it
      - In the original packaging
      - Accompanied by the original receipt or proof of purchase
      
      Some items are not eligible for return:
      - Perishable goods
      - Custom or personalized items
      - Items marked as final sale
      - Items that have been used or damaged`,
    },
    {
      title: "Return Process",
      content: `To initiate a return:
      1. Log into your account
      2. Go to your order history
      3. Select the order containing the item you wish to return
      4. Click "Return Item"
      5. Follow the return instructions
      6. Package the item securely
      7. Attach the return label
      8. Drop off at the designated shipping location`,
    },
    {
      title: "Refunds",
      content: `Once we receive your return:
      - We will inspect the item
      - Process your refund within 5-7 business days
      - Issue the refund to your original payment method
      
      Please note:
      - Shipping costs are non-refundable
      - Refunds may take 5-10 business days to appear in your account
      - International returns may take longer to process`,
    },
    {
      title: "Exchanges",
      content: `If you need a different size or color:
      1. Follow the return process
      2. Note that you want an exchange
      3. Specify the desired replacement item
      
      We'll process your exchange once we receive the returned item.`,
    },
    {
      title: "Damaged or Defective Items",
      content: `If you receive a damaged or defective item:
      - Contact us within 48 hours of delivery
      - Include photos of the damage
      - Keep all packaging materials
      
      We'll arrange for a replacement or refund at no cost to you.`,
    },
    {
      title: "International Returns",
      content: `For international returns:
      - You are responsible for return shipping costs
      - Use a trackable shipping service
      - Include all necessary customs documentation
      - Allow 2-3 weeks for processing`,
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Returns & Refunds</h1>
          <p className="text-lg text-muted-foreground">
            Our hassle-free return policy ensures your complete satisfaction with every purchase.
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

      <div className="text-center mt-12 space-y-6">
        <p className="text-muted-foreground">
          Need help with your return? Our customer service team is here to assist you.
        </p>
        <Button>
          Contact Support
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 