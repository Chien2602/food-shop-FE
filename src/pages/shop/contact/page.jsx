import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ShopContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "support@foodshop.com",
      link: "mailto:support@foodshop.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Food Street, Cuisine City, FC 12345",
      link: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <FadeIn>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {contactInfo.map((info, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <Card className="p-6">
              <info.icon className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{info.title}</h3>
              {info.link ? (
                <a
                  href={info.link}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-muted-foreground">{info.content}</p>
              )}
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ScrollReveal>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Find Us</h2>
            <div className="aspect-video bg-muted rounded-lg mb-6">
              {/* Replace with actual map component */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Map Placeholder
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Store Location</h3>
              <p className="text-muted-foreground">
                123 Food Street
                <br />
                Cuisine City, FC 12345
                <br />
                United States
              </p>
              <div className="pt-4">
                <h3 className="font-semibold mb-2">Parking Information</h3>
                <p className="text-muted-foreground">
                  Free parking available in our store parking lot. Additional street parking is available
                  on surrounding streets.
                </p>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  )
} 