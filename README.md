# n8n-nodes-whatsapp-pro

Advanced WhatsApp Business API node for n8n with interactive messages, buttons, lists, catalogs and flows.

## Features

### 🚀 What this node does that the official doesn't:

| Feature | Official Node | WhatsApp Pro |
|---------|--------------|--------------|
| Interactive Buttons (Quick Reply) | ❌ | ✅ Up to 3 buttons |
| List Messages | ❌ | ✅ Up to 10 options |
| CTA Buttons (URL/Phone) | ❌ | ✅ |
| Location Request | ❌ | ✅ |
| Product Messages | ❌ | ✅ Single & Multi |
| Catalog Integration | ❌ | ✅ |
| Template Management | Limited | ✅ Full CRUD |
| Reactions | ❌ | ✅ |
| Contact Cards | ❌ | ✅ |

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-whatsapp-pro`
4. Select **Install**

### Manual Installation

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-whatsapp-pro
```

## Credentials Setup

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create or select your app
3. Add WhatsApp product
4. Get your:
   - **Access Token** (permanent token recommended)
   - **Phone Number ID**
   - **Business Account ID**

## Operations

### Message
- **Send Text** - Send text messages with URL preview option
- **Send Location** - Send location with coordinates
- **Send Contact** - Send contact cards
- **React** - React to messages with emoji

### Interactive
- **Send Buttons** - Quick reply buttons (up to 3)
- **Send List** - List message with sections (up to 10 items)
- **Send CTA Button** - Call-to-action (URL or Phone call)
- **Request Location** - Ask user for their location

### Template
- **Send Template** - Send approved template with variables
- **List Templates** - Get all templates
- **Get Template** - Get specific template
- **Delete Template** - Delete a template

### Media
- **Send Image** - Send images (URL or Media ID)
- **Send Video** - Send videos
- **Send Document** - Send documents with filename
- **Send Audio** - Send audio files
- **Send Sticker** - Send stickers

### Catalog
- **Send Product** - Single product message
- **Send Product List** - Multi-product message (up to 30)
- **Get Catalog** - Get catalog information

## Examples

### Send Interactive Buttons

```json
{
  "to": "56912345678",
  "bodyText": "How can we help you?",
  "buttons": [
    { "id": "sales", "title": "Sales" },
    { "id": "support", "title": "Support" },
    { "id": "info", "title": "More Info" }
  ]
}
```

### Send List Message

```json
{
  "to": "56912345678",
  "bodyText": "Select an option:",
  "buttonText": "View Options",
  "sections": [
    {
      "title": "Products",
      "items": [
        { "id": "p1", "title": "Product A", "description": "Description A" },
        { "id": "p2", "title": "Product B", "description": "Description B" }
      ]
    }
  ]
}
```

## Roadmap

- [ ] WhatsApp Flows
- [ ] Carousel Messages
- [ ] Authentication OTP Templates
- [ ] Coupon Templates
- [ ] Read Receipts Webhook

## License

MIT

## Author

**LatamFlows** - [manu@latamflows.com](mailto:manu@latamflows.com)

---

Made with ❤️ for the n8n community
