# Multilingual Typing Practice App - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Productivity-Focused) with Typing Practice Patterns

Drawing from Linear's clean interface architecture and Monkeytype's focused typing area, creating a utility-first experience that prioritizes clarity, real-time feedback, and minimal distraction during typing sessions.

**Key Design Principles:**
1. Distraction-free typing zone as primary focus
2. Information density balanced with breathing room
3. Real-time feedback without visual noise
4. Hierarchical data presentation for statistics

---

## Core Design Elements

### A. Typography

**Primary Font Stack:**
- Interface Text: Inter (400, 500, 600) - clean, highly legible for UI elements
- Typing Content: JetBrains Mono (400, 500) - monospace for typing area, ensures character alignment
- Multilingual Scripts: Noto Sans (for Latin), Noto Sans Devanagari, Noto Sans Tamil, etc. (per language)

**Hierarchy:**
- Page Titles: text-2xl font-semibold (24px)
- Section Headers: text-lg font-medium (18px)
- Typing Text: text-3xl font-medium (30px) - large, clear, easy to read during practice
- Stats/Metrics: text-sm font-medium (14px)
- Labels/Captions: text-xs (12px)
- Hindi Transliteration: text-xs opacity-60 (subtle, non-distracting)

### B. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8
- Component padding: p-4, p-6
- Section margins: mb-4, mb-6, mb-8
- Grid gaps: gap-2, gap-4
- Container spacing: max-w-7xl mx-auto px-8

**Desktop Grid Structure:**
- Main container: max-w-7xl centered with px-8
- Typing area: Full-width with max-w-4xl centered
- Statistics panels: Fixed sidebars or bottom panels
- Virtual keyboard: Full-width at bottom, max-w-5xl centered

### C. Component Library

#### 1. Primary Layout Components

**Top Navigation Bar:**
- Height: h-16
- Layout: Flex justify-between items-center with px-8
- Left: Logo/App name (text-xl font-semibold)
- Center: Language selector dropdown (w-48)
- Right: Session stats summary (WPM, Accuracy) + Settings icon
- Bottom border for subtle separation

**Main Typing Area:**
- Container: max-w-4xl mx-auto with py-12
- Text display area: min-h-48 with p-8 rounded-lg border-2
- Typing progress bar at top (h-1 absolute)
- Current word highlight with subtle rounded background
- Next words preview with reduced opacity
- Hindi transliteration positioned directly below each word (text-xs with -mt-1)
- Cursor blink animation on active character

**Virtual Keyboard Display:**
- Position: Fixed at bottom or absolute below typing area
- Container: max-w-5xl mx-auto with p-6
- Keyboard layout: CSS Grid matching hardware layout (QWERTY, AZERTY, Dvorak variants)
- Individual keys: Rounded rectangles with min-w-12 min-h-12, gap-1 between keys
- Active key state: Transform scale slightly + border emphasis (no color change)
- Key labels: Dual-layer showing base character + shift/alt character
- Special keys (Shift, Ctrl, Space): Distinct width proportions
- Ligature indicators: Small badge notation on applicable key combinations

#### 2. Statistics & Feedback Components

**Live Stats Panel (Top or Sidebar):**
- Layout: Grid with 4 columns (desktop) showing:
  - WPM (words per minute) - Largest numeric display
  - Accuracy percentage - Second emphasis
  - Errors count - Breakdown by category
  - Time elapsed - Simple timer
- Each stat card: p-4 with rounded-lg border
- Metric value: text-3xl font-semibold
- Metric label: text-sm uppercase tracking-wide

**Error Feedback Display:**
- Position: Below typing area or side panel
- Recent errors list (max 5 visible)
- Each error: Flex layout showing incorrect → correct with arrow
- Ligature errors marked distinctly with badge
- Smooth slide-in animation for new errors

**Session Summary Modal:**
- Centered overlay (max-w-2xl)
- Header: Session complete message with text-2xl
- Stats grid: 2×3 layout showing comprehensive metrics
- Charts: Simple bar chart for accuracy over time
- Error breakdown: Table format with categorization
- Action buttons: Retry / New Session / Save Results (bottom row)

#### 3. Configuration Components

**Language Selector Dropdown:**
- Width: w-64
- Dropdown menu: max-h-96 overflow-y-auto
- Language options grouped by region
- Each option shows: Language name + native script sample
- Search filter at top of dropdown (input with h-10)

**Settings Panel (Slide-in from right):**
- Width: w-96
- Sections: Appearance, Audio, Keyboard Layout, Practice Mode
- Toggle switches for boolean options (h-6)
- Slider inputs for numeric values (font size, speed)
- Keyboard layout visual preview (mini version)
- TTS voice selector with test button

**Practice Mode Selection:**
- Card-based layout with 3-4 options
- Each card: p-6 rounded-lg border-2 hover-transform
- Mode icon at top (large, 48×48)
- Mode title (text-lg font-semibold)
- Description (text-sm)
- Difficulty indicator (Easy/Medium/Hard badges)

#### 4. Utility Components

**Audio Controls:**
- Compact button group (h-10) positioned near transliteration
- Play/Pause icon button for TTS
- Volume slider (appears on hover)
- Voice speed control (appears in settings)

**Loading States:**
- Keyboard loading: Skeleton grid matching layout
- Language switching: Fade transition with brief skeleton
- TTS processing: Subtle pulse animation on audio icon

**Error/Success Messages:**
- Toast notifications (bottom-right, w-80)
- Slide-up animation, auto-dismiss after 4s
- Icon + message + dismiss button layout

---

## Specialized Patterns for Typing App

### Real-Time Typing Feedback
- Correct characters: No visual change (maintain flow)
- Incorrect characters: Subtle underline (not intrusive)
- Missed characters: Marked with different underline style
- Ligature formation: Smooth character merge animation (100ms)

### Keyboard Visualization
- Key press feedback: Instant visual response (no delay)
- Multi-key combinations: Show all pressed keys simultaneously
- Sticky keys (Shift, Ctrl): Persistent state indicator
- Dead keys (for accents): Preview overlay showing possible combinations

### Performance Metrics Display
- WPM calculation: Update every completed word
- Accuracy: Real-time percentage with smooth number transitions
- Error rate: Cumulative with recent trend indicator
- Progress bar: Linear progression through practice text

---

## Desktop-Specific Optimizations

**Window Sizing:**
- Minimum viewport: 1280×720
- Optimal viewport: 1440×900 and above
- No viewport height constraints (natural scroll if needed)

**Keyboard Shortcuts:**
- ESC: Cancel current session
- F11: Toggle fullscreen typing mode
- Ctrl+R: Restart current practice
- Ctrl+L: Change language
- Display shortcut hints in settings panel

**Multi-Monitor Consideration:**
- Keep primary typing area centered and contained
- Allow statistics to utilize wider screens with sidebar layout
- Keyboard visualization scales but maintains aspect ratio

---

## Data Visualization

**Accuracy Chart (Session Summary):**
- Line chart showing accuracy percentage over time
- Time on X-axis, accuracy on Y-axis
- Height: h-64
- Grid lines for readability
- Data points marked at 10-word intervals

**Error Distribution (Session Summary):**
- Horizontal bar chart categorizing error types
- Categories: Missed keys, Wrong keys, Ligature errors, Timing errors
- Percentage display for each category

**Progress Indicators:**
- Circular progress for session completion (top-right)
- Linear bar for lesson/level progression
- Milestone badges for achievements

---

## Critical UX Patterns

1. **Focus Management:** Typing area auto-focuses on page load and after modals close
2. **Keyboard Trap:** Prevent tab navigation during active typing session
3. **Pause State:** Clear visual indicator when paused vs. active
4. **Language Switch:** Confirm dialog if mid-session with unsaved progress
5. **Error Recovery:** Backspace handling with character deletion animation
6. **Session Persistence:** Auto-save progress every 30 seconds

---

## Accessibility

- High contrast ratios for all text (4.5:1 minimum)
- Keyboard navigation for all non-typing interactions
- Screen reader announcements for stats updates (aria-live)
- Scalable font sizes via settings (14px - 36px range)
- Clear focus indicators on interactive elements (ring-2)

This design creates a professional, distraction-free typing practice environment optimized for desktop users learning multiple languages with comprehensive real-time feedback and educational support.