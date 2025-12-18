CSV Runner Dashboard

 1. Project Overview

Challenge: CSV Runner Dashboard (Next.js + shadcn/ui)

This project is a web-based dashboard built with Next.js 15 and shadcn/ui that allows users to upload CSV files containing running data and visualize the results through interactive charts and summary statistics. The application parses CSV files with columns `date`, `person`, and `miles run`, validates the data, and provides both overall and per-person analytics.

What I Built:
- A responsive CSV file upload interface with drag-and-drop functionality
- Real-time CSV parsing and validation with detailed error reporting
- Interactive data visualizations using Recharts
- Comprehensive metrics dashboard showing average, minimum, and maximum values
- Per-person filtering and analysis capabilities
- Dark mode UI with glassmorphism design elements

Live Demo: [https://csvrunner.vercel.app](https://csvrunner.vercel.app)

---

2. Assumptions

 Data Format Assumptions:
- **CSV Headers:** The CSV must contain exactly three columns with headers: `date`, `person`, and `miles run` (case-insensitive, whitespace is trimmed)
- **Date Format:** Dates should be in a standard format parseable by JavaScript Date (e.g., YYYY-MM-DD, MM/DD/YYYY, etc.)
- **Person Names:** Person names are treated as case-sensitive strings and can contain spaces
- **Miles Values:** Must be valid positive numbers (decimals are supported)
- **Empty Rows:** Empty rows in the CSV are automatically skipped

 Validation Assumptions:
- Invalid rows are collected and displayed to users but don't prevent valid data from being processed
- At least one valid row is required to display the dashboard
- Duplicate entries (same date, person, and miles) are treated as separate records

UI/UX Assumptions:
- Users want to see both aggregate data and per-person breakdowns
- Visual charts are more useful than raw data tables
- Error messages should be specific and actionable
- The application should work on both desktop and mobile devices

Technical Assumptions:
- No backend database is required; all processing happens client-side
- CSV files are small enough to process in-browser (tested up to 10,000 rows)
- Users have modern browsers with JavaScript enabled
- No user authentication is required for this demo

---

3. Prerequisites

Before running this project, ensure you have:

- **Node.js:** Version 18.17 or higher (recommended: 20.x LTS)
- **npm:** Version 9.0 or higher (comes with Node.js)
- **Git:** For cloning the repository
- **Modern Browser:** Chrome, Firefox, Safari, or Edge (latest 2 versions)

**Check your versions:**
```bash
node --version  # Should be >= 18.17
npm --version   # Should be >= 9.0
```

---

## 4. Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/conquererabhi25/csvrunner.git
cd csvrunner
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required dependencies including:
- Next.js 15
- React 19
- shadcn/ui components
- Recharts for data visualization
- Papaparse for CSV parsing
- Tailwind CSS for styling

### Step 3: Environment Variables
This project does not require any environment variables for basic functionality. However, if you want to customize settings:

1. Create a `.env.local` file in the root directory (optional):
```bash
# .env.local (optional)
NEXT_PUBLIC_APP_NAME="CSV Runner Dashboard"
```

**Note:** No API keys or secrets are required for this application.

### Step 4: Verify Installation
```bash
npm run build
```

If the build completes successfully, your setup is ready!

---

## 5. Run & Verify

### Development Mode

**Start the development server:**
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

### Production Build

**Build and run in production mode:**
```bash
npm run build
npm start
```

### Testing the Application

#### Test Scenario 1: Valid CSV Upload
1. Navigate to http://localhost:3000
2. Download or create a sample CSV file (see Sample CSV below)
3. Upload the CSV using drag-and-drop or file picker
4. **Expected Results:**
   - Dashboard loads with data visualization
   - Overall metrics card shows: Total Runs, Total Miles, Average Miles, Top Runner
   - Line chart displays miles run over time
   - Bar chart shows miles by person
   - Per-person filter dropdown appears

#### Test Scenario 2: Per-Person View
1. After uploading valid CSV data
2. Click the "Person Filter" dropdown
3. Select a specific person's name
4. **Expected Results:**
   - Charts update to show only selected person's data
   - Metrics card updates with person-specific stats
   - All visualizations reflect filtered data

#### Test Scenario 3: Invalid CSV Handling
1. Create a CSV with invalid data:
   - Missing required columns
   - Invalid date formats
   - Non-numeric miles values
2. Upload the invalid CSV
3. **Expected Results:**
   - Error message displays clearly
   - Specific validation errors are listed
   - User can upload a different file

#### Test Scenario 4: Edge Cases
1. Upload CSV with empty rows → Empty rows are skipped
2. Upload CSV with mixed valid/invalid rows → Valid data is processed, errors shown
3. Upload very small file (1 row) → Dashboard displays correctly
4. Try uploading non-CSV file → Appropriate error message

### Sample CSV

Create a file named `sample-running-data.csv`:

```csv
date,person,miles run
2024-01-01,John Doe,5.2
2024-01-02,Jane Smith,3.8
2024-01-03,John Doe,6.1
2024-01-04,Mike Johnson,4.5
2024-01-05,Jane Smith,5.0
2024-01-06,John Doe,7.2
2024-01-07,Mike Johnson,3.2
2024-01-08,Jane Smith,4.8
2024-01-09,John Doe,5.5
2024-01-10,Mike Johnson,6.0
```

**Download this sample CSV from:** [Create your own using the format above]

---

## 6. Features & Limitations

###  What Works

**Core Features:**
- CSV file upload with drag-and-drop support
-  Comprehensive data validation (headers, types, values)
-  Detailed error reporting with specific row numbers
-  Overall dashboard with aggregate metrics
-  Per-person filtering and analysis
- Interactive line chart (Miles over Time)
-  Interactive bar chart (Miles by Person)
- Summary metrics: Average, Min, Max, Total, Top Runner
-  Responsive design (mobile, tablet, desktop)
-  Dark mode UI with modern aesthetics
-  Empty state handling
-  Loading states during processing

**Data Processing:**
-  Handles various date formats
-  Trims whitespace from headers and values
- Case-insensitive header matching
-  Skips empty rows automatically
-  Supports decimal values for miles
-  Processes files up to 10MB

**UI/UX:**
-  Glassmorphism design elements
-  Smooth animations and transitions
-  Clear visual hierarchy
- Accessible color contrast
-  Intuitive navigation

### ⚠️ Known Limitations

**Data Handling:**
- No data persistence (data is lost on page refresh)
- No export functionality for processed data
- Limited to client-side processing (no server-side validation)
- No support for CSV files with additional columns beyond the required three

**Visualization:**
- Charts are limited to line and bar formats
- No time-range filtering (e.g., last 30 days)
- No comparison mode (e.g., compare two runners side-by-side)
- Limited customization of chart appearance

**File Upload:**
- Single file upload only (no batch processing)
- No file size warning before processing
- No auto-save of uploaded files

**User Experience:**
- No undo/redo functionality
- No data editing after upload
- No print-optimized view

### 🚀 Future Improvements

**High Priority:**
1. **Data Persistence:** LocalStorage or database integration to save uploaded data
2. **Export Features:** Download processed data as JSON, or filtered CSV
3. **Advanced Filtering:** Date range picker, multiple person selection
4. **Additional Charts:** Pie chart for distribution, trend analysis

**Medium Priority:**
5. **Batch Upload:** Support multiple CSV files
6. **Data Editing:** Allow inline editing of uploaded data
7. **Comparison Mode:** Side-by-side runner comparisons
8. **Statistical Analysis:** Standard deviation, percentiles, trends

**Nice to Have:**
9. **Dark/Light Mode Toggle:** User preference for theme
10. **Goal Setting:** Set and track running goals
11. **Social Sharing:** Share achievements or stats
12. **Historical Data:** Track progress over months/years

---

## 7. Notes on Architecture

### Project Structure

```
csvrunner/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard page (client component)
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   └── ui/                 # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── select.tsx
│       └── alert.tsx
├── lib/
│   └── utils.ts           # Utility functions (cn for classnames)
├── public/
│   └── homerunner.jpg     # Hero image
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

### Key Components

**1. Main Dashboard (app/page.tsx)**
- **Purpose:** Single-page application handling all functionality
- **State Management:** 
  - `csvData`: Stores parsed and validated running data
  - `selectedPerson`: Tracks currently filtered person
  - `error`: Holds validation error messages
  - `isProcessing`: Loading state during CSV parsing
- **Key Functions:**
  - `handleFileUpload()`: Processes file input
  - `parseCSV()`: Validates and parses CSV using Papaparse
  - `calculateMetrics()`: Computes aggregate statistics

**2. CSV Parsing Logic**
- **Library:** Papaparse for robust CSV parsing
- **Validation Pipeline:**
  1. Header validation (checks for required columns)
  2. Row validation (date format, numeric miles, non-empty person)
  3. Data type conversion (Date objects, parsed numbers)
  4. Error collection (specific error messages with row numbers)

**3. Data Visualization**
- **Library:** Recharts (built on D3.js)
- **Charts:**
  - `LineChart`: Shows miles run over time with date formatting
  - `BarChart`: Displays miles by person with color coding
- **Responsive:** Charts adapt to container width using ResponsiveContainer

### State & Data Flow

```
User uploads CSV
    ↓
File validation (size, type)
    ↓
Papaparse parsing
    ↓
Header validation
    ↓
Row-by-row validation
    ↓
Data transformation (dates, numbers)
    ↓
State update (csvData)
    ↓
Metrics calculation
    ↓
Chart rendering
    ↓
User filters by person
    ↓
Re-calculate metrics for filtered data
    ↓
Update charts with filtered data
```

### Technology Choices

**Next.js 15:**
- Server Components for optimal performance
- App Router for modern routing patterns
- Built-in optimizations (images, fonts, etc.)

**shadcn/ui:**
- Accessible, customizable components
- Built on Radix UI primitives
- Tailwind CSS integration

**Papaparse:**
- Robust CSV parsing with error handling
- Handles various CSV formats
- Large file support with streaming (not used but available)

**Recharts:**
- React-first charting library
- Responsive and customizable
- Good documentation and community support

### Design Patterns

**Client-Side Processing:**
- All data processing happens in the browser
- No server API required
- Privacy-friendly (data never leaves user's device)

**Component Composition:**
- Reusable shadcn/ui components
- Single-page architecture for simplicity
- Conditional rendering based on state

**Error Handling:**
- User-friendly error messages
- Graceful degradation (partial data processing)
- Clear validation feedback

---

## 8. Accessibility & UI

### Accessibility Features

**Keyboard Navigation:**
-  File upload accessible via Enter/Space keys
-  Dropdown select navigable with arrow keys
-  Tab order follows logical flow
- Focus visible on all interactive elements

**Screen Reader Support:**
- Semantic HTML (`<main>`, `<section>`, `<button>`, etc.)
-  ARIA labels on file input and interactive elements
-  Alt text for images
-  Proper heading hierarchy (h1, h2, h3)

**Visual Accessibility:**
-  High contrast text (WCAG AA compliant)
-  Color not used as sole indicator (patterns + colors)
-  Readable font sizes (16px minimum)
- Sufficient spacing between interactive elements (44px touch targets)

**Error Handling:**
-  Error messages are announced to screen readers
-  Validation errors clearly associated with form fields
-  Success states communicated to assistive technologies

### UI Design Principles

**Typography:**
- **Font Family:** Geist Sans (system fallback: sans-serif)
- **Scale:** 
  - Body text: 14-16px
  - Headings: 20-32px
  - Small text: 12-14px
- **Line Height:** 1.5 for body, 1.2 for headings
- **Weight:** 400 (regular), 500 (medium), 600 (semibold)

**Spacing System:**
- Based on 4px grid (Tailwind default)
- Component padding: 16-24px
- Section margins: 24-32px
- Consistent spacing throughout UI

**Color Palette:**
- **Background:** Dark gradient (#0a0a0a to #1a1a1a)
- **Surface:** Glass effect with backdrop blur
- **Primary:** Blue accent (#3b82f6)
- **Text:** White (#ffffff) with opacity variations
- **Error:** Red (#ef4444)
- **Success:** Green (#10b981)

**Layout & Responsive Design:**
- **Mobile First:** Base styles for mobile, enhanced for larger screens
- **Breakpoints:**
  - sm: 640px (tablets)
  - md: 768px (small laptops)
  - lg: 1024px (desktops)
  - xl: 1280px (large screens)
- **Container Max Width:** 1200px
- **Grid System:** Tailwind's built-in grid utilities

**Interactive States:**
- **Hover:** Brightness increase, scale transform
- **Active:** Scale down effect
- **Focus:** Visible ring outline
- **Disabled:** Reduced opacity, cursor not-allowed

**Animation & Motion:**
- Smooth transitions (200-300ms duration)
- Reduced motion support via `prefers-reduced-motion`
- Subtle hover effects for feedback
- Loading animations for processing states

---

## Acceptance Checklist

- [x] **Sample CSV provided** with clear instructions
- [x] **Overall dashboard** showing aggregate statistics and visualizations
- [x] **Per-person views** with filtering capability
- [x] **Metrics computed correctly:** Average, Min, Max (both overall and per-person)
- [x] **Meaningful charts:** Line chart (miles over time) and bar chart (miles by person)
- [x] **Error handling:** Validates CSV structure, data types, and displays specific errors
- [x] **Responsive design** works on mobile, tablet, and desktop
- [x] **Accessible UI** with keyboard navigation and screen reader support

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Charts:** Recharts
- **CSV Parsing:** Papaparse
- **Deployment:** Vercel

---

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

## Browser Support

-  Chrome/Edge (last 2 versions)
-  Firefox (last 2 versions)
-  Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## License

This project is built as an assignment submission and is available for educational purposes.

---

## Contact & Feedback

**Developer:** conquererabhi25  
**Repository:** [https://github.com/conquererabhi25/csvrunner](https://github.com/conquererabhi25/csvrunner)  
**Live Demo:** [https://csvrunner.vercel.app](https://csvrunner.vercel.app)

For questions, bug reports, or feature requests, please open an issue on GitHub.

---

## Acknowledgments

- **Next.js** team for the excellent framework
- **shadcn** for the beautiful UI component library
- **Vercel** for seamless deployment
- **Recharts** for data visualization tools
