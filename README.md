# TypeMaster - Multilingual Typing Practice Application

A desktop-optimized typing practice web application supporting 20+ languages with real-time feedback, ligature handling, and Hindi transliteration.

## Features

### Core Features
- **20 Language Support**: English, Hindi, Marathi, Sanskrit, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi, Urdu, Arabic, French, Russian, Greek, Thai, Korean, Chinese, Japanese
- **Real-time Virtual Keyboard**: Visual keyboard that highlights pressed keys matching hardware layout
- **Ligature Engine**: Automatic ligature transformation for Devanagari and other complex scripts
- **Hindi Transliteration**: Real-time phonetic conversion to Hindi (Devanagari) displayed below typed words
- **Text-to-Speech**: Browser-based TTS for Hindi transliteration with adjustable speed
- **Performance Metrics**: WPM, accuracy, error tracking (key errors + ligature errors)
- **Session Management**: Save typing results to backend, view session summaries

### Technical Features
- **Backend API**: Express.js server with typing results storage and AI endpoint stubs
- **Language Configurations**: JSON-based keyboard layouts and ligature rules for each language
- **Responsive Design**: Desktop-optimized (minimum 1280×720)
- **Dark Mode**: Full dark theme support
- **Font Support**: Noto font family for all supported scripts

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **Styling**: TailwindCSS with custom design system
- **Fonts**: Noto Sans family (Devanagari, Tamil, Telugu, Bengali, Arabic, etc.)
- **State Management**: React hooks + TanStack Query
- **UI Components**: Shadcn/ui components

### Backend
- **Server**: Node.js with Express
- **Storage**: In-memory storage (MemStorage) for typing results
- **CORS**: Enabled for local development
- **API**: RESTful endpoints for typing results and AI stubs

## Installation

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
git clone <repository-url>
cd typemaster
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the application**

The application uses a single command to start both frontend and backend:

```bash
npm run dev
```

This will:
- Start the Express backend on port 5000
- Start the Vite frontend development server
- Open the application in your browser at http://localhost:5000

## Project Structure

```
typemaster/
├── client/                      # Frontend application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── TopNav.tsx       # Navigation bar with language selector
│   │   │   ├── TypingArea.tsx   # Main typing interface
│   │   │   ├── VirtualKeyboard.tsx # Visual keyboard display
│   │   │   ├── StatsPanel.tsx   # Performance metrics display
│   │   │   ├── SessionSummary.tsx # Session completion modal
│   │   │   ├── ErrorFeedback.tsx  # Real-time error display
│   │   │   └── SettingsPanel.tsx  # App settings
│   │   ├── lib/
│   │   │   ├── ligatureEngine.ts     # Ligature transformation logic
│   │   │   ├── hindiTransliteration.ts # Hindi phonetic conversion
│   │   │   └── languageLoader.ts     # Language config loader
│   │   ├── pages/
│   │   │   └── Home.tsx         # Main application page
│   │   └── index.css            # Global styles & design tokens
│   └── index.html
├── server/                      # Backend application
│   ├── routes.ts                # API route definitions
│   ├── storage.ts               # In-memory data storage
│   └── index.ts                 # Express server setup
├── shared/
│   └── schema.ts                # Shared TypeScript types & Zod schemas
├── public/
│   └── languages/               # Language configuration JSON files
│       ├── en.json              # English
│       ├── hi.json              # Hindi (with ligatures)
│       ├── mr.json              # Marathi
│       ├── sa.json              # Sanskrit
│       ├── bn.json              # Bengali
│       ├── ta.json              # Tamil
│       ├── te.json              # Telugu
│       ├── kn.json              # Kannada
│       ├── ml.json              # Malayalam
│       ├── gu.json              # Gujarati
│       ├── pa.json              # Punjabi (Gurmukhi)
│       ├── ur.json              # Urdu
│       ├── ar.json              # Arabic
│       ├── fr.json              # French
│       ├── ru.json              # Russian
│       ├── el.json              # Greek
│       ├── th.json              # Thai
│       ├── ko.json              # Korean
│       ├── zh.json              # Chinese
│       └── ja.json              # Japanese
└── README.md
```

## Language Configuration Format

Each language JSON file in `public/languages/` contains:

```json
{
  "code": "hi",
  "name": "Hindi",
  "native": "हिन्दी",
  "script": "Devanagari",
  "keyboard": {
    "layout": "inscript",
    "rows": [
      // Keyboard layout as 2D array
    ]
  },
  "sampleText": "Practice text in the language...",
  "ligatures": [
    {
      "sequence": ["क", "्", "ष"],
      "result": "क्ष"
    }
  ],
  "font": "Noto Sans Devanagari"
}
```

## API Endpoints

### Typing Results

**POST /api/typing-results**
Save typing session results
```json
{
  "language": "hi",
  "wpm": 45,
  "accuracy": 94.5,
  "errors": 8,
  "keyErrors": 5,
  "ligatureErrors": 3,
  "timeElapsed": 120,
  "textLength": 150,
  "errorDetails": [...]
}
```

**GET /api/typing-results**
Retrieve all typing results (limit parameter optional)

**GET /api/typing-results/:language**
Retrieve results for specific language

### AI Endpoints (Stubs)

**POST /api/ai/predict-ligatures**
Predict ligature positions in text (returns sample data)

```json
{
  "text": "क्षत्रिय",
  "language": "hi"
}
```

**POST /api/ai/analyze-mistakes**
Analyze typing mistakes and provide recommendations (returns sample data)

```json
{
  "errors": [...],
  "language": "hi",
  "typingSpeed": 45
}
```

**GET /api/languages**
Get list of all supported languages with metadata

## Features Breakdown

### 1. Virtual Keyboard
- Real-time key highlighting matching hardware keypresses
- Dynamic layout loading based on selected language
- Support for QWERTY, AZERTY, Dvorak, Inscript layouts
- Visual feedback for modifier keys (Shift, Ctrl, Alt)

### 2. Ligature Handling
The ligature engine automatically transforms character sequences into proper ligatures:
- Hindi: क् + ष = क्ष, त् + र = त्र, ज् + ञ = ज्ञ
- Bengali: ক + ্ + ষ = ক্ষ
- Tamil: க + ் + ஷ = க்ஷ
- And more for other Indic scripts

### 3. Hindi Transliteration
Real-time phonetic conversion of any typed text to Hindi Devanagari:
- "quick" → "क्विक"
- "brown" → "ब्राउन"
- Displayed below each word during typing

### 4. Text-to-Speech
- Browser-based Web Speech API
- Hindi voice support
- Adjustable speed (0.5x - 2.0x)
- Speaks Hindi transliteration on demand

### 5. Performance Tracking
- **WPM (Words Per Minute)**: Calculated in real-time
- **Accuracy**: Percentage of correct keystrokes
- **Error Breakdown**: Key errors vs ligature errors
- **Time Tracking**: Session duration
- **Error Log**: Recent mistakes with corrections

## Customization

### Adding a New Language

1. Create a new JSON file in `public/languages/` (e.g., `xx.json`)
2. Define keyboard layout, sample text, and ligature rules
3. Add language to the list in `server/routes.ts` `/api/languages` endpoint
4. Add to language selector in `client/src/components/TopNav.tsx`

### Modifying Ligature Rules

Edit the `ligatures` array in the language JSON file:

```json
{
  "ligatures": [
    {
      "sequence": ["consonant", "virama", "consonant"],
      "result": "combined_glyph"
    }
  ]
}
```

### Customizing Fonts

Update the font import in `client/index.html` and add to `tailwind.config.ts`:

```typescript
fontFamily: {
  noto: ["Noto Sans YourScript", "sans-serif"],
}
```

## Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Code Structure Guidelines
- Frontend components use Shadcn/ui design system
- All interactive elements have `data-testid` attributes
- Language-specific rendering uses `font-noto` class
- Dark mode handled via `document.documentElement.classList.toggle("dark")`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

**Note**: Web Speech API support varies by browser. Hindi TTS works best in Chrome/Edge.

## Future Enhancements

- [ ] User authentication and profile management
- [ ] Historical performance tracking and charts
- [ ] Custom lesson builder with text import
- [ ] Full AI-powered ligature prediction
- [ ] Advanced mistake analysis with ML
- [ ] Multiplayer typing races
- [ ] Offline mode with IndexedDB
- [ ] Mobile support (currently desktop-only)

## License

MIT License

## Contributing

Contributions welcome! Please follow the existing code style and include tests for new features.

## Support

For issues and questions, please open a GitHub issue.
