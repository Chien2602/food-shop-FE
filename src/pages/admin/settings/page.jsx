"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { FadeIn } from "@/components/ui/fade-in"
import {
  Save,
  Store,
  Bell,
  Truck,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Shield,
  Users,
  Settings,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettings() {
  const { toast } = useToast()
  const [storeSettings, setStoreSettings] = useState({
    name: "Food Shop",
    email: "contact@foodshop.com",
    phone: "+1 234 567 890",
    address: "123 Main St, New York, NY 10001",
    currency: "USD",
    timezone: "America/New_York",
    language: "en",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    lowStockAlerts: true,
    newCustomerNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
  })

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 50,
    defaultShippingRate: 5.99,
    shippingMethods: ["standard", "express", "overnight"],
    processingTime: 1,
    allowInternationalShipping: true,
  })

  const handleStoreSettingsChange = (field, value) => {
    setStoreSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNotificationSettingsChange = (field) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleShippingSettingsChange = (field, value) => {
    setShippingSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveStoreSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your store settings have been saved successfully.",
    })
  }

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification settings have been saved successfully.",
    })
  }

  const handleSaveShippingSettings = () => {
    toast({
      title: "Shipping settings saved",
      description: "Your shipping settings have been saved successfully.",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <FadeIn>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your store settings and preferences
            </p>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ScrollReveal>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Store className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Store Settings</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeSettings.name}
                    onChange={(e) =>
                      handleStoreSettingsChange("name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) =>
                      handleStoreSettingsChange("email", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input
                    id="storePhone"
                    value={storeSettings.phone}
                    onChange={(e) =>
                      handleStoreSettingsChange("phone", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Store Address</Label>
                  <Input
                    id="storeAddress"
                    value={storeSettings.address}
                    onChange={(e) =>
                      handleStoreSettingsChange("address", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={storeSettings.currency}
                    onValueChange={(value) =>
                      handleStoreSettingsChange("currency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={storeSettings.timezone}
                    onValueChange={(value) =>
                      handleStoreSettingsChange("timezone", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">
                        Eastern Time (ET)
                      </SelectItem>
                      <SelectItem value="America/Chicago">
                        Central Time (CT)
                      </SelectItem>
                      <SelectItem value="America/Denver">
                        Mountain Time (MT)
                      </SelectItem>
                      <SelectItem value="America/Los_Angeles">
                        Pacific Time (PT)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Notification Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Order Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new orders
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.orderNotifications}
                    onCheckedChange={() =>
                      handleNotificationSettingsChange("orderNotifications")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when products are running low
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.lowStockAlerts}
                    onCheckedChange={() =>
                      handleNotificationSettingsChange("lowStockAlerts")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Customer Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new customer registrations
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newCustomerNotifications}
                    onCheckedChange={() =>
                      handleNotificationSettingsChange("newCustomerNotifications")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing and promotional emails
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={() =>
                      handleNotificationSettingsChange("marketingEmails")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about security-related events
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={() =>
                      handleNotificationSettingsChange("securityAlerts")
                    }
                  />
                </div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Shipping Settings</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">
                    Free Shipping Threshold
                  </Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={(e) =>
                      handleShippingSettingsChange(
                        "freeShippingThreshold",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultShippingRate">
                    Default Shipping Rate
                  </Label>
                  <Input
                    id="defaultShippingRate"
                    type="number"
                    value={shippingSettings.defaultShippingRate}
                    onChange={(e) =>
                      handleShippingSettingsChange(
                        "defaultShippingRate",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processingTime">Processing Time (days)</Label>
                  <Input
                    id="processingTime"
                    type="number"
                    value={shippingSettings.processingTime}
                    onChange={(e) =>
                      handleShippingSettingsChange(
                        "processingTime",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>International Shipping</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={shippingSettings.allowInternationalShipping}
                      onCheckedChange={(checked) =>
                        handleShippingSettingsChange(
                          "allowInternationalShipping",
                          checked
                        )
                      }
                    />
                    <span className="text-sm text-muted-foreground">
                      Allow international shipping
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>

        <div className="space-y-6">
          <ScrollReveal>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Quick Links</h2>
              </div>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Domain Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Templates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Methods
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </Button>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Store Hours</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monday - Friday</span>
                  <span className="text-sm font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Saturday</span>
                  <span className="text-sm font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sunday</span>
                  <span className="text-sm font-medium">Closed</span>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
