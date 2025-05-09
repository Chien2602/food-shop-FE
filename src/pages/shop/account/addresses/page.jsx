import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const mockAddresses = [
  {
    id: "1",
    name: "Home",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    isDefault: true
  },
  {
    id: "2",
    name: "Office",
    street: "456 Business Ave",
    city: "New York",
    state: "NY",
    zip: "10002",
    country: "United States",
    isDefault: false
  }
]

export default function AccountAddresses() {
  const [addresses, setAddresses] = useState(mockAddresses)
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States"
  })

  const handleAddAddress = (e) => {
    e.preventDefault()
    const address = {
      id: String(addresses.length + 1),
      ...newAddress,
      isDefault: addresses.length === 0
    }
    setAddresses([...addresses, address])
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States"
    })
  }

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })))
  }

  const handleDelete = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Address</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAddress} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Address Name</Label>
                <Input
                  id="name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  placeholder="e.g., Home, Office"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={newAddress.zip}
                  onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Save Address</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{address.name}</h3>
                {address.isDefault && (
                  <Badge className="mt-1">Default</Badge>
                )}
              </div>
              <div className="flex gap-2">
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.country}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 