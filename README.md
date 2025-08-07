# Frontend Practice

A comprehensive collection of coding exercises and interview preparation tasks covering frontend, backend, and full-stack development.

## 📋 Overview

This repository serves as a centralized hub for small-scale coding exercises and technical challenges completed during engineering interview preparation. Each exercise is designed to demonstrate specific skills and best practices in modern web development.

The exercises range from:
- **Frontend-focused**: User experience (UX) implementations and application logic
- **Backend-focused**: API design, data processing, and server-side logic
- **Full-stack**: End-to-end applications combining frontend and backend

## 🛠 Tech Stack

### Current Stack
- **Runtime**: Node.js v18+ (recommended: v20 LTS)
- **Package Manager**: npm (can use yarn or pnpm)
- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Frontend**: React 19.1.0 with React Server Components
- **Styling**: Tailwind CSS v4
- **Code Quality**: ESLint with Next.js configuration

### Planned Additions
- **Validation**: Zod for runtime type safety and schema validation
- **API Layer**: GraphQL and/or tRPC for type-safe API communication
- **Additional Styling**: CSS Modules alongside Tailwind CSS
- **Code Formatting**: Prettier for consistent code style
- **Testing**: Jest and React Testing Library
- **State Management**: Zustand and TanStack React Query
- **UI Components**: Shadcn UI and Radix UI
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: NextAuth.js v5

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ (recommended: v20 LTS)
- npm, yarn, or pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend-practice
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
frontend-practice/
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   └── [exercise-folders]/     # Individual coding exercises
│   └── components/                 # Reusable UI components
├── public/                         # Static assets
└── [config files]                  # TypeScript, ESLint, Tailwind configs
```

## 📝 Exercise Organization

Each coding exercise should be organized as follows:

### Frontend Exercises
- Focus on component design, user interactions, and UI/UX
- Implement responsive design and accessibility features
- Demonstrate modern React patterns and hooks

### Backend Exercises
- API endpoint creation and data handling
- Database integration and query optimization
- Authentication and authorization implementations

### Full-Stack Exercises
- Complete applications with frontend and backend integration
- Real-time features using WebSockets or Server-Sent Events
- End-to-end type safety with tRPC or GraphQL

## 🎯 Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled for better type safety
- **Components**: Functional components with proper TypeScript typing
- **Styling**: Mobile-first responsive design using Tailwind CSS
- **Performance**: Optimize for Core Web Vitals and accessibility

### File Naming Conventions

#### Next.js App Router Structure
- **Route folders**: `kebab-case` (e.g., `user-profile`, `todo-list`)
- **Special files**: Next.js conventions
  - `page.tsx` - Route pages
  - `layout.tsx` - Shared layouts
  - `loading.tsx` - Loading UI
  - `error.tsx` - Error UI
  - `not-found.tsx` - 404 pages
  - `route.ts` - API routes

#### Components and Files
- **React Components**: `PascalCase.tsx` (e.g., `UserProfile.tsx`, `TodoItem.tsx`)
- **Utility functions**: `camelCase.ts` (e.g., `formatDate.ts`, `validateEmail.ts`)
- **Type definitions**: `camelCase.types.ts` (e.g., `user.types.ts`)
- **Constants**: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)
- **Hooks**: `use` prefix with `camelCase` (e.g., `useLocalStorage.ts`)

### Adding New Exercises
1. Create a new folder under `src/app/` with a descriptive name
2. Include a README.md explaining the exercise requirements
3. Implement the solution following the established patterns
4. Add any necessary routes to the Next.js app router
5. Update this main README if introducing new technologies

## 🔄 Future Enhancements

This repository will evolve as new technologies and patterns are explored:

- **Testing Suite**: Comprehensive unit and integration tests
- **CI/CD Pipeline**: Automated testing and deployment
- **Documentation**: Auto-generated documentation for components and APIs
- **Performance Monitoring**: Real User Monitoring (RUM) integration
- **Database Integration**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js implementation
- **Deployment**: Vercel integration for easy previews

## 📚 Learning Resources

Each exercise may include:
- Problem statement and requirements
- Solution approach and reasoning
- Alternative implementations
- Performance considerations
- Testing strategies

## 🤝 Contributing

This is a personal learning repository, but suggestions and improvements are welcome through issues and pull requests.

## 📄 License

This project is for educational purposes and interview preparation.

---

**Note**: This README will be updated as the repository grows and new technologies are integrated.