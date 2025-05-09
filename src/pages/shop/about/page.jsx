import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { Users, Award, Globe, Heart } from "lucide-react"

export default function ShopAbout() {
  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Happy Customers",
    },
    {
      icon: Award,
      value: "15+",
      label: "Years Experience",
    },
    {
      icon: Globe,
      value: "50+",
      label: "Countries Served",
    },
    {
      icon: Heart,
      value: "100%",
      label: "Customer Satisfaction",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground">
            We are passionate about providing high-quality products and exceptional service to our customers.
            Our mission is to make shopping easy, enjoyable, and accessible to everyone.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <Card className="p-6 text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <ScrollReveal>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2008, we started as a small local shop with a big dream. Over the years,
              we've grown into a trusted online retailer, serving customers worldwide while maintaining
              our commitment to quality and customer service.
            </p>
            <p className="text-muted-foreground">
              Our journey has been marked by continuous innovation, customer feedback, and a dedication
              to providing the best shopping experience possible.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Quality First</h3>
                  <p className="text-muted-foreground">
                    We carefully select and test every product to ensure the highest quality standards.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Customer Focus</h3>
                  <p className="text-muted-foreground">
                    Our customers are at the heart of everything we do. We listen, learn, and improve based on your feedback.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're committed to reducing our environmental impact and promoting sustainable practices.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our team. If you share our values
            and want to be part of our journey, check out our current openings.
          </p>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            View Careers
          </button>
        </Card>
      </ScrollReveal>
    </div>
  )
} 