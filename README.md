# Horizon Banking Platform

![Horizon Logo](public/icons/logo.svg)

Horizon is a modern banking platform that allows users to manage their finances, track transactions, and transfer funds seamlessly. Built with Next.js 14 and integrated with Plaid for secure banking connections.

## Features

- 🏦 Connect multiple bank accounts securely via Plaid
- 💳 View all connected bank accounts and balances
- 📊 Track recent transactions with detailed analytics
- 💸 Transfer funds between connected accounts
- 🔒 Secure authentication and session management
- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS and shadcn/ui

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Appwrite
- **Banking Integration**: Plaid API
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Charts**: Chart.js + react-chartjs-2
- **Error Monitoring**: Sentry
- **Testing**: Cypress

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-repo/finance-dashboard.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_APPWRITE_KEY=
PLAID_CLIENT_ID=
PLAID_SECRET=
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable UI components
- `/lib` - Utility functions and API clients
- `/providers` - React context providers
- `/public` - Static assets
- `/types` - TypeScript type definitions
- `/constants` - Application constants

## Testing

Run Cypress tests:

```bash
npm run cypress:open
```

## Deployment

The easiest way to deploy your Horizon banking app is to use the [Vercel Platform](https://vercel.com/new).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@horizonbanking.com or join our Slack channel.

## Acknowledgments

- [Plaid](https://plaid.com) for banking integration
- [Appwrite](https://appwrite.io) for authentication
- [shadcn/ui](https://ui.shadcn.com) for UI components
- [Vercel](https://vercel.com) for deployment and infrastructure


