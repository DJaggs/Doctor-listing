# Project Dependencies

This document outlines the key dependencies required for the Doctor Listing Application.

## Core Requirements

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher

## Frontend Dependencies

### React and Core Libraries
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `typescript`: 5.6.3
- `wouter`: ^3.3.5 (Routing)

### UI Libraries
- `tailwindcss`: ^3.4.17
- `@tailwindcss/typography`: ^0.5.15
- `tailwindcss-animate`: ^1.0.7
- `lucide-react`: ^0.453.0 (Icons)
- `react-icons`: ^5.4.0
- Radix UI components (`@radix-ui/*`) for accessible UI elements
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1

### Data Fetching & State Management
- `@tanstack/react-query`: ^5.60.5
- `zod`: ^3.24.2 (Schema validation)

### Form Handling
- `react-hook-form`: ^7.55.0
- `@hookform/resolvers`: ^3.10.0

## Backend Dependencies

### Server & API
- `express`: ^4.21.2
- `drizzle-orm`: ^0.39.1 (Database ORM)
- `drizzle-zod`: ^0.7.0

### Build & Development Tools
- `vite`: ^5.4.14
- `esbuild`: ^0.25.0
- `tsx`: ^4.19.1
- `drizzle-kit`: ^0.30.4
- `postcss`: ^8.4.47
- `autoprefixer`: ^10.4.20

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   npm start
   ```

## Notes

- The project uses shadcn/ui components which are implemented directly in the codebase (under components/ui/*)
- The TailwindCSS configuration is customized for the application's design system
- All UI components are fully accessible following WCAG guidelines
- The application follows a React Hooks pattern for state management