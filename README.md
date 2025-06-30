# NextJsApp

A modern application built with Next.js 14, TypeScript, and Prisma.


## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts      # Optimized login endpoint
│   │   │   └── signup/route.ts     # Optimized signup endpoint
│   │   └── diary/
│   │       └── route.ts            # Optimized diary CRUD operations
│   ├── dashboard/
│   │   └── page.tsx                # Enhanced dashboard with better UX
│   ├── diary/
│   │   └── page.tsx                # Optimized diary listing
│   ├── login/
│   │   └── page.tsx                # Improved login form
│   └── signup/
│       └── page.tsx                # Enhanced signup form
├── components/
│   ├── diary/
│   │   └── DiaryCard.tsx           # Reusable diary card component
│   └── ui/
│       ├── Button.tsx              # Reusable button component
│       ├── Input.tsx               # Reusable input component
│       └── LoadingSpinner.tsx      # Loading spinner component
├── lib/
│   ├── api-client.ts               # Centralized API client
│   └── auth-utils.ts               # Authentication utilities
└── types/
    └── index.ts                    # TypeScript type definitions
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd travel-diary-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/travel_diary"
   JWT_SECRET="your-secret-key-here"
   NEXT_PUBLIC_API_URL="http://localhost:3000"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```


## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```


