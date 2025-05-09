import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

export default function ShopFaq() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedFaqs, setExpandedFaqs] = useState({})

  const faqs = [
    {
      category: "Ordering",
      questions: [
        {
          question: "How do I place an order?",
          answer:
            "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in, provide shipping information, and complete the payment process.",
        },
        {
          question: "Can I modify or cancel my order?",
          answer:
            "You can modify or cancel your order within 1 hour of placing it. Please contact our customer service team immediately for assistance. After this period, the order will be processed and cannot be modified.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through our payment gateway.",
        },
      ],
    },
    {
      category: "Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping typically takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. International shipping may take 7-14 business days depending on the destination.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can view shipping options and rates during checkout.",
        },
        {
          question: "How can I track my order?",
          answer:
            "Once your order ships, you'll receive a tracking number via email. You can also track your order status by logging into your account and visiting the order details page.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some items may be subject to different return conditions, which will be noted on the product page.",
        },
        {
          question: "How do I return an item?",
          answer:
            "To return an item, log into your account, go to your order history, and select the order containing the item you wish to return. Follow the return instructions and print the return label. Package the item securely and drop it off at the designated shipping location.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Refunds are typically processed within 5-7 business days after we receive your returned item. The refund will be issued to your original payment method. Please note that it may take additional time for your bank to process the refund.",
        },
      ],
    },
    {
      category: "Account & Security",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "Click on the 'Sign Up' button in the top right corner of our website. You'll need to provide your email address, create a password, and fill in some basic information. Once completed, you'll receive a confirmation email.",
        },
        {
          question: "How can I reset my password?",
          answer:
            "Click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password. Make sure to check your spam folder if you don't receive the email.",
        },
        {
          question: "Is my personal information secure?",
          answer:
            "Yes, we take security seriously. All personal and payment information is encrypted using SSL technology. We never store your full credit card details on our servers.",
        },
      ],
    },
  ]

  const toggleFaq = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    setExpandedFaqs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }))

  return (
    <div className="container mx-auto py-12 px-4">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>
      </FadeIn>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {filteredFaqs.map((category, categoryIndex) => (
          <ScrollReveal key={categoryIndex} delay={categoryIndex * 0.1}>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const isExpanded = expandedFaqs[`${categoryIndex}-${questionIndex}`]
                  return (
                    <div
                      key={questionIndex}
                      className="border-b last:border-0 pb-4 last:pb-0"
                    >
                      <button
                        onClick={() => toggleFaq(categoryIndex, questionIndex)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <h3 className="font-semibold">{faq.question}</h3>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                      {isExpanded && (
                        <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">
          Still have questions? We're here to help!
        </p>
        <Button>Contact Support</Button>
      </div>
    </div>
  )
} 