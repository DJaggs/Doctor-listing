# Doctor Listing Application

A comprehensive doctor listing platform with advanced search and filtering capabilities, designed to help patients find and connect with healthcare professionals efficiently.

![Doctor Listing Application](https://i.imgur.com/6VpVxG1.png)

## Features

- 🔍 **Search functionality**: Find doctors by name with an autocomplete dropdown
- 🏥 **Filtering options**: Filter by specialty, consultation type (Video/In-Clinic)
- 📊 **Sorting capabilities**: Sort doctors by fees or experience
- 👨‍⚕️ **Doctor profiles**: Detailed information including experience, fees, and ratings
- 📱 **Responsive design**: Optimized for both desktop and mobile devices

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Express.js
- **Data Fetching**: TanStack Query
- **State Management**: React Hooks
- **URL State Management**: Custom hooks for synchronizing URL parameters with application state

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/doctor-listing-app.git
   cd doctor-listing-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/           # UI components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utility functions and types
│   │   ├── pages/                # Application pages
│   │   └── main.tsx              # Entry point
├── server/
│   ├── data/                     # Sample data
│   ├── index.ts                  # Express server setup
│   └── routes.ts                 # API routes
└── shared/                       # Shared code between client and server
```

## API Endpoints

- `GET /api/doctors` - Returns a list of all doctors with their details

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [TanStack Query](https://tanstack.com/query) for data fetching and caching
- [Tailwind CSS](https://tailwindcss.com/) for styling