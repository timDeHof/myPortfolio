# Tim DeHof - Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🚀 Modern React with TypeScript
- 🎨 Beautiful UI with Tailwind CSS and Framer Motion
- 📱 Fully responsive design
- 📧 Contact form with EmailJS integration and auto-reply
- ⚡ Fast performance with Vite
- 🔍 SEO optimized
- ♿ Accessible design

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- pnpm (the repo pins pnpm@10.25.0)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/timDeHof/myPortfolio.git
cd myPortfolio
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure EmailJS (see EmailJS Setup section below)

5. Start the development server:

```bash
pnpm dev
```

## EmailJS Setup

To enable the contact form functionality with auto-reply, you'll need to set up EmailJS:

### 1. Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **IMPORTANT**: In the service configuration, make sure to set the "To Email" field to your email address (e.g., `tim@timdehof.dev`) where you want to receive contact form messages
6. Note down your **Service ID**

### 3. Create Email Templates

You'll need to create TWO templates:

#### Main Contact Form Template (for you to receive messages)

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

4. Note down your **Template ID**

#### Auto-Reply Template (confirmation for users)

1. Create another new template
2. Use this auto-reply template structure:

```
Subject: Thank you for contacting Tim DeHof

Hi {{to_name}},

Thank you for reaching out! I've received your message and will get back to you within 24 hours.

Here's a copy of your message:
"{{original_message}}"

Best regards,
Tim DeHof
Full-Stack Developer

---
This is an automated response. Please do not reply to this email.
For urgent matters, you can reach me directly at tim@timdehof.dev
```

**Important Settings for Auto-Reply Template:**

- Set "To Email" field to: `{{to_email}}`
- Set "From Name" to: `Tim DeHof`
- Set "From Email" to your email address (e.g., `tim@timdehof.dev`)

5. Note down your **Auto-Reply Template ID**

### 4. Get Your Public Key

1. Go to "Account" in your dashboard
2. Find your **Public Key** in the API Keys section

### 5. Update Environment Variables

Update your `.env` file with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_main_template_id_here
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=your_auto_reply_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Verify Email Service Configuration

**CRITICAL**: Make sure your EmailJS service has a recipient email configured:

1. Go back to "Email Services" in your EmailJS dashboard
2. Click on your service (Gmail, Outlook, etc.)
3. Ensure the "To Email" field is filled with your email address (e.g., `tim@timdehof.dev`)
4. Save the configuration

Without a properly configured recipient email in the service settings, you'll get a "recipients address is empty" error.

### Auto-Reply Features

When properly configured, the contact form will:

1. Send you the original message from the user
2. Automatically send a confirmation email to the user with:
   - A thank you message
   - Confirmation that you'll respond within 24 hours
   - A copy of their original message
   - Your contact information

The auto-reply is optional - if you don't configure the `VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID`, the system will still work but won't send confirmation emails to users.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components, grouped by feature
│   ├── about/          # About page sections
│   ├── blog/           # Blog grid and post cards
│   ├── common/         # Shared components (SEO, loaders, error boundary)
│   ├── contact/        # Contact form and panels
│   ├── github/         # GitHub stats and charts
│   ├── home/           # Home page sections
│   ├── kibo-ui/        # Contribution graph
│   ├── layout/         # Navbar, footer, mobile drawer
│   ├── projects/       # Project case study view
│   └── ui/             # shadcn/Radix UI primitives
├── content/            # Blog content (git submodule)
├── data/               # Static data (career timeline, projects index)
├── hooks/              # Custom React hooks and TanStack Query hooks
├── lib/                # Shared utilities (env, query client, cn)
├── pages/              # Page components
├── routes/             # TanStack Router file-based routes
├── services/           # External service clients (GitHub API, email)
├── store/              # Zustand state
├── styles/             # Global styles
├── types/              # TypeScript type definitions
├── utils/              # Helpers (SEO schema, form validation)
├── App.tsx             # Root component and router factory
├── index.tsx           # App entry point
├── prerender.tsx       # Server-side render for prerendering (renderPage)
├── routeTree.gen.ts    # Generated route tree (tsr generate)
└── vite-env.d.ts       # Vite type declarations
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **TanStack Router** - File-based routing
- **EmailJS** - Contact form functionality with auto-reply
- **Vite** - Build tool
- **Zustand** - State management

## Deployment

The site deploys to Cloudflare Workers with Wrangler. Pushes to `main` build and
deploy automatically via `.github/workflows/deploy.yml`; from a local checkout,
`pnpm deploy:worker` builds and deploys.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Tim DeHof - [tim@timdehof.dev](mailto:tim@timdehof.dev)

Project Link: [https://github.com/timDeHof/myPortfolio](https://github.com/timDeHof/myPortfolio)
