# TypeMaster - Multilingual Typing Practice Application

## Overview

TypeMaster is a desktop-optimized typing practice web application that supports 20+ languages with real-time feedback, complex script handling, and performance tracking. The application features virtual keyboard visualization, ligature transformation for complex scripts (like Devanagari), Hindi transliteration, and text-to-speech capabilities. It's designed to help users improve their typing skills across multiple languages while providing detailed performance metrics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework and Tooling**
- React 18 with TypeScript for type-safe component development
- Wouter for lightweight client-side routing
- TanStack Query for server state management and API interaction
- Vite as the build tool and development server

**UI Layer**
- Shadcn/ui component library built on Radix UI primitives
- TailwindCSS for utility-first styling with custom design tokens
- Dark mode support via CSS class toggling
- Custom design system with productivity-focused aesthetics (inspired by Linear and Monkeytype)

**Font System**
- Noto Sans font family for comprehensive multilingual support
- Specific font variants for different scripts (Devanagari, Tamil, Telugu, Bengali, Arabic, etc.)
- Monospace fonts (JetBrains Mono) for typing areas to ensure character alignment

**State Management Patterns**
- React hooks for local component state
- TanStack Query for server state caching and synchronization
- No global state management library (intentionally simple architecture)

**Key Features Implementation**
- Real-time typing feedback with character-by-character validation
- Virtual keyboard component that mirrors hardware keyboard layout and highlights pressed keys
- Ligature engine for automatic transformation of character sequences in complex scripts
- Hindi transliteration system that converts typed English text to Devanagari phonetically
- Browser-based Text-to-Speech API integration with speed control
- Performance calculation (WPM, accuracy, error tracking) in real-time

### Backend Architecture

**Server Framework**
- Express.js server running on Node.js
- TypeScript throughout for type safety
- ESM module system

**Data Storage Strategy**
- In-memory storage (MemStorage class) for typing results and user data
- No persistent database in current implementation
- Database schema defined using Drizzle ORM (PostgreSQL dialect) for future migration
- Schema includes users table and typing_results table with comprehensive metrics

**API Design**
- RESTful endpoints for typing results (POST, GET by language, GET all)
- Stub endpoints for AI features (ligature prediction, typing analysis, personalized exercises)
- CORS enabled for local development
- Request/response validation using Zod schemas derived from Drizzle schema

**Middleware Stack**
- JSON body parsing with raw body access for webhook compatibility
- Static file serving for language configuration files
- Custom logging middleware for API requests with response capture
- Vite middleware integration for development hot module replacement

### Language Configuration System

**JSON-Based Language Definitions**
- Each language has a dedicated JSON configuration file in `/public/languages/`
- Configuration includes: keyboard layout, sample text, ligature rules, font selection
- 20 languages supported: English, Hindi, Marathi, Sanskrit, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi, Urdu, Arabic, French, Russian, Greek, Thai, Korean, Chinese, Japanese

**Ligature Processing**
- Configurable ligature rules per language as sequence-to-result transformations
- LigatureEngine class applies rules using longest-match-first strategy
- Supports complex scripts where multiple characters combine into single glyphs

**Dynamic Loading**
- Language configurations loaded on-demand via fetch API
- Client-side caching of loaded configurations
- Fallback to default QWERTY layout if language config fails to load

### Component Architecture

**Main Components**
- TypingArea: Core typing interface with real-time validation
- VirtualKeyboard: Visual representation of keyboard with key press highlighting
- StatsPanel: Real-time WPM, accuracy, and error display
- SessionSummary: Modal dialog showing detailed session results
- ErrorFeedback: List of recent typing errors with correction suggestions
- SettingsPanel: Side sheet for TTS, transliteration, and display preferences
- TopNav: Language selector, dark mode toggle, and settings access

**Design Patterns**
- Controlled components for all user inputs
- Event-driven keyboard interaction handling
- Ref forwarding for focus management
- Compound component pattern for UI primitives (shadcn/ui)

### Development and Build Process

**Development Environment**
- Vite dev server with HMR
- Express server running concurrently
- TypeScript compilation without emit (type checking only)
- Path aliases for clean imports (@/, @shared/)

**Build Process**
- Vite builds frontend to `dist/public/`
- esbuild bundles backend server to `dist/`
- Single production server serves both static assets and API

**Type Safety**
- Shared schema definitions between client and server
- Zod for runtime validation matching TypeScript types
- Drizzle ORM for type-safe database schema (when database is added)

## External Dependencies

### Third-Party Libraries

**UI and Styling**
- Radix UI component primitives (accordion, dialog, dropdown, etc.)
- TailwindCSS for utility classes
- class-variance-authority for component variant management
- Lucide React for icon library

**React Ecosystem**
- React 18 and React DOM
- @tanstack/react-query for data fetching and caching
- wouter for routing
- react-hook-form with @hookform/resolvers for form validation

**Backend Dependencies**
- Express.js for HTTP server
- drizzle-orm and drizzle-zod for database abstraction
- @neondatabase/serverless for PostgreSQL driver (configured but not actively used)
- connect-pg-simple for PostgreSQL session storage (configured but not actively used)

**Development Tools**
- Vite with React plugin
- esbuild for server bundling
- TypeScript compiler
- tsx for running TypeScript in Node.js
- drizzle-kit for database migrations

### External Services

**Database**
- PostgreSQL (schema defined, but using in-memory storage currently)
- Connection configured via DATABASE_URL environment variable
- Neon serverless driver for edge deployment compatibility

**Fonts**
- Google Fonts CDN for Noto Sans family
- Preconnect to fonts.googleapis.com and fonts.gstatic.com for performance

**Browser APIs**
- Web Speech API for text-to-speech functionality
- Keyboard Event API for real-time key press detection
- Local Storage (potentially) for user preferences persistence

### Future Integration Points

**AI Endpoints (Stubbed)**
- Ligature prediction API for autocomplete suggestions
- Typing analysis API for performance insights
- Personalized exercise generation based on error patterns
- These endpoints exist as placeholders returning sample data

**Session Management**
- Database schema includes users table for authentication
- Session storage configured with connect-pg-simple
- Not actively implemented in current version