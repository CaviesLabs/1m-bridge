# DeFi 1Matrix Bridge Application

A modern DeFi bridge application built with Next.js, React, and Tailwind CSS. This application enables users to bridge tokens across different blockchains with a clean, responsive interface.

## Features

- 🌉 Cross-chain token bridging interface
- 🌓 Dark/Light mode support
- 🌍 Bilingual support (English/Vietnamese)
- 📱 Responsive design for desktop and mobile
- ⚡ Modern UI with Tailwind CSS v4
- 🎨 shadcn/ui component library integration
- 🔗 Wallet connection interface (ready for Web3 integration)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd defi-bridge-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind v4
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page component
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── cavies/            # cavies-specific components
│   ├── BridgeInterface.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── InfoSections.tsx
│   ├── LanguageProvider.tsx
│   └── ThemeProvider.tsx
├── imports/              # Imported assets and components
├── package.json
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Key Components

- **ThemeProvider**: Manages dark/light mode theming
- **LanguageProvider**: Handles English/Vietnamese translations
- **Header**: Navigation with mobile drawer, theme toggle, and language switcher
- **BridgeInterface**: Main bridging functionality UI
- **HeroSection**: Landing section with campaign information
- **InfoSections**: Terms & conditions and FAQ sections

## Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: Component library
- **Lucide React**: Icon library
- **Radix UI**: Headless UI components

## Development

### Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Customization

The application uses Tailwind CSS v4 with custom CSS variables for theming. You can modify the color scheme and design tokens in `app/globals.css`.

## Deployment

The application is ready to be deployed on platforms like Vercel, Netlify, or any other Next.js-compatible hosting service.

### Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<repository-url>)

## Future Enhancements

- [ ] Web3 wallet integration (MetaMask, WalletConnect)
- [ ] Real blockchain bridge functionality
- [ ] Transaction history and status tracking
- [ ] Additional language support
- [ ] Advanced bridge settings and configurations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.