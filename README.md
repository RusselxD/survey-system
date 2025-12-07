# Survey System

A comprehensive, enterprise-grade survey management platform built with modern web technologies. This system empowers administrators to create sophisticated surveys with multiple question types, manage user access, and derive actionable insights through advanced analytics dashboards.

## 🎯 Overview

The Survey System is a full-stack application designed to streamline the entire survey lifecycle—from creation and distribution to response collection and data analysis. The platform features a rich administrative interface with real-time analytics, role-based access control, and an intuitive user experience for both survey creators and respondents.

## ✨ Core Features

### 📊 Administrative Dashboard

-   **Comprehensive Analytics**: Real-time visualization of survey performance metrics including response rates, completion times, and engagement trends
-   **Response Insights**: Track survey views, total responses, average completion times, and satisfaction scores
-   **Engagement Funnel**: Monitor user journey from survey views to completion
-   **Time-Series Analysis**: Response trends over configurable time periods (7 days, 30 days, 6 months, 1 year)
-   **Geographical Analytics**: Response distribution by location with interactive visualizations
-   **Service Type Analytics**: Performance metrics segmented by service categories
-   **Activity Heatmaps**: Visualize response patterns across days and hours
-   **Question Type Distribution**: Analyze usage of different question types across surveys

### 📝 Survey Management

-   **Rich Question Types**: Support for multiple question formats including:
    -   Multiple Choice
    -   Checkboxes
    -   Dropdown
    -   Linear Scale (with customizable range and labels)
    -   Text Input (Short Answer)
    -   Paragraph (Long Answer)
    -   Date/Time Pickers
    -   Grid (Multiple Choice Grid & Checkbox Grid)
-   **Survey Builder**: Intuitive drag-and-drop interface for creating surveys
-   **Question Validation**: Required fields and conditional logic support
-   **Survey Status Management**: Draft, Active, Paused, and Closed states
-   **QR Code Generation**: Automatically generate QR codes for easy survey distribution
-   **Public Links**: Shareable links with clipboard copy functionality
-   **Survey Metadata**: Customizable titles, descriptions, locations, and service type categorization
-   **Response Collection**: Real-time response tracking with infinite scroll pagination
-   **Export Capabilities**:
    -   PDF export of complete survey reports with detailed analytics
    -   Chart exports with metadata (Response Trends, Top Surveys, etc.)
    -   Excel export of tabular data for external analysis

### 🔐 User Management

-   **Role-Based Access Control (RBAC)**: Admin and User role hierarchies
-   **User Administration**: Create, modify, and delete user accounts
-   **Permission Management**: Granular control over user capabilities
-   **Authentication**: Secure JWT-based authentication system
-   **Password Management**: Forced password updates for security compliance
-   **Session Management**: Automatic token refresh and secure logout

### 📈 Advanced Analytics

-   **Response Rate Analysis**: Track survey performance with response rate percentages
-   **Completion Time Distribution**: Visualize time taken by respondents to complete surveys
-   **Top Surveys Ranking**: Identify best-performing surveys by response rate and count
-   **Question-Level Analytics**: Detailed breakdown for each question type:
    -   Distribution charts for multiple choice questions
    -   Word frequency analysis for text responses
    -   Average ratings for linear scale questions
    -   Grid response breakdowns
    -   Date/time range analysis
-   **Data Export**: Export charts and data to PDF and Excel formats with comprehensive metadata

### 🎨 User Experience

-   **Dark/Light Mode**: Automatic theme switching with system preference detection
-   **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
-   **Infinite Scroll**: Seamless pagination for responses and large datasets
-   **Loading States**: Skeleton screens and spinners for improved perceived performance
-   **Error Boundaries**: Graceful error handling with user-friendly messages
-   **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Tech Stack

### Frontend

| Technology                                    | Purpose                     | Version |
| --------------------------------------------- | --------------------------- | ------- |
| [React](https://reactjs.org/)                 | UI Framework                | 19.1.1  |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety                 | 5.x     |
| [Vite](https://vitejs.dev/)                   | Build Tool & Dev Server     | Latest  |
| [Tailwind CSS](https://tailwindcss.com/)      | Utility-First CSS Framework | Latest  |
| [daisyUI](https://daisyui.com/)               | Component Library           | Latest  |

### Core Libraries

| Library                                            | Purpose                             |
| -------------------------------------------------- | ----------------------------------- |
| [React Router](https://reactrouter.com/)           | Client-side routing and navigation  |
| [Axios](https://axios-http.com/)                   | HTTP client with interceptors       |
| [Chart.js](https://www.chartjs.org/)               | Data visualization and charting     |
| [react-chartjs-2](https://react-chartjs-2.js.org/) | React wrapper for Chart.js          |
| [Lucide React](https://lucide.dev/)                | Modern icon system                  |
| [jsPDF](https://github.com/parallax/jsPDF)         | PDF generation and export           |
| [html2canvas](https://html2canvas.hertzen.com/)    | DOM to canvas rendering for exports |
| [xlsx](https://sheetjs.com/)                       | Excel file generation and export    |

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

-   **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
-   **npm**: v9.0.0 or higher (comes with Node.js)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/RusselxD/survey-system.git
    cd survey-system
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment variables** (if applicable)
    ```bash
    cp .env.example .env
    # Edit .env with your configuration
    ```

### Running the Application

#### Development Mode

```bash
npm run dev
```

Starts the Vite development server with hot module replacement (HMR)

-   **URL**: `http://localhost:5173`
-   **Features**: Fast refresh, error overlay, source maps

#### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` folder

-   **Optimizations**: Code splitting, minification, tree shaking
-   **Output**: Static files ready for deployment

#### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing

-   **URL**: `http://localhost:4173`
-   **Purpose**: Verify production build before deployment

#### Linting

```bash
npm run lint
```

Runs ESLint to check code quality and enforce coding standards

## 📁 Project Structure

```
survey-system/
├── src/
│   ├── assets/                      # Static assets (images, fonts)
│   ├── components/                  # Reusable UI components
│   │   ├── reusable/               # Generic components (modals, buttons)
│   │   ├── ErrorBoundary.jsx       # Error handling wrapper
│   │   ├── Navbar.jsx              # Main navigation
│   │   ├── ProtectedRoute.jsx      # Route authentication guard
│   │   └── TextInput.jsx           # Form input component
│   ├── context/                     # React Context providers
│   │   └── AuthContext.jsx         # Authentication state management
│   ├── pages/                       # Application pages
│   │   ├── Admin/                  # Admin-specific pages
│   │   │   ├── AdminPage/          # Admin layout and navigation
│   │   │   ├── Analytics/          # Analytics dashboard
│   │   │   │   ├── CompletionTimeDistribution/
│   │   │   │   ├── EngagementFunnel/
│   │   │   │   ├── ResponseTrendLineChart/
│   │   │   │   ├── TopSurveysByResponseRate/
│   │   │   │   └── ...             # Other analytics components
│   │   │   ├── Dashboard/          # Main admin dashboard
│   │   │   ├── Login/              # Authentication pages
│   │   │   ├── Responses/          # Response management
│   │   │   ├── Settings/           # System settings
│   │   │   ├── Surveys/            # Survey CRUD operations
│   │   │   │   ├── CreateNewSurvey/
│   │   │   │   ├── SurveyPage/     # Individual survey view
│   │   │   │   └── Modals/         # Survey-related modals
│   │   │   └── Users/              # User management
│   │   └── User/                   # Public survey pages
│   ├── utils/                       # Utility functions and helpers
│   │   ├── api/                    # API client configuration
│   │   │   ├── axiosConfig.js      # Axios instance with interceptors
│   │   │   ├── auth.js             # Authentication API calls
│   │   │   ├── models/             # Data models API
│   │   │   │   ├── survey.js
│   │   │   │   └── users.js
│   │   │   └── pages/              # Page-specific API calls
│   │   │       ├── analytics.js
│   │   │       ├── dashboard.js
│   │   │       └── surveyPage.js
│   │   ├── download.js             # File download utilities
│   │   ├── exportChartToPDF.ts     # Chart to PDF conversion
│   │   └── exportSurveyToPDF.ts    # Survey report PDF generation
│   ├── App.jsx                      # Root component with routing
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles and Tailwind imports
├── public/                          # Public static files
├── .gitignore                       # Git ignore rules
├── eslint.config.js                 # ESLint configuration
├── index.html                       # HTML entry point
├── package.json                     # Project dependencies and scripts
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.js                   # Vite build configuration
└── README.md                        # Project documentation
```

## 🔑 Key Features Explained

### Survey Creation Workflow

1. **Survey Details**: Define title, description, location, and service type
2. **Question Builder**: Add multiple questions with various types
3. **Validation Rules**: Set required fields and validation criteria
4. **Preview Mode**: Test survey before publishing
5. **Status Management**: Control survey availability (Draft/Active/Paused/Closed)

### Analytics Pipeline

1. **Data Collection**: Real-time response aggregation
2. **Processing**: Server-side analytics calculation
3. **Visualization**: Interactive charts with Chart.js
4. **Export**: PDF and Excel export with full metadata

### Authentication Flow

1. **Login**: JWT token generation
2. **Token Storage**: Secure localStorage with expiry
3. **Auto-refresh**: Automatic token renewal
4. **Protected Routes**: Route-level authentication guards
5. **Role Verification**: Permission-based component rendering

## 📊 API Integration

The frontend communicates with a RESTful backend API. Key endpoints include:

-   `/api/auth/*` - Authentication and authorization
-   `/api/surveys/*` - Survey CRUD operations
-   `/api/responses/*` - Response collection and retrieval
-   `/api/analytics/*` - Analytics data aggregation
-   `/api/users/*` - User management

## 🎨 Design System

### Color Palette

-   **Primary**: Blue (#3B82F6)
-   **Secondary**: Gray (#6B7280)
-   **Success**: Green (#10B981)
-   **Warning**: Yellow (#F59E0B)
-   **Error**: Red (#EF4444)

### Typography

-   **Font Family**: System fonts (Inter, SF Pro, Segoe UI)
-   **Headings**: Bold weights (600-700)
-   **Body**: Regular weight (400)

## 🧪 Development Guidelines

### Code Style

-   Use TypeScript for type safety
-   Follow React best practices (hooks, functional components)
-   Implement proper error boundaries
-   Use semantic HTML elements
-   Follow Tailwind CSS utility-first approach

### Component Structure

-   Keep components small and focused
-   Extract reusable logic into custom hooks
-   Use prop types for validation
-   Implement loading and error states

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deployment Platforms

-   **Vercel**: Zero-config deployment
-   **Netlify**: Continuous deployment from Git
-   **AWS S3 + CloudFront**: Static hosting with CDN
-   **Docker**: Containerized deployment

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**

    ```bash
    git clone https://github.com/RusselxD/survey-system.git
    ```

2. **Create a feature branch**

    ```bash
    git checkout -b feature/AmazingFeature
    ```

3. **Make your changes**

    - Write clean, documented code
    - Follow existing code style
    - Add tests if applicable

4. **Commit your changes**

    ```bash
    git commit -m 'Add some AmazingFeature'
    ```

5. **Push to the branch**

    ```bash
    git push origin feature/AmazingFeature
    ```

6. **Open a Pull Request**
    - Describe your changes
    - Reference any related issues
    - Wait for code review

### Contribution Guidelines

-   Follow the existing code style
-   Write meaningful commit messages
-   Update documentation for new features
-   Ensure all tests pass
-   Add comments for complex logic

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Project Maintainer**: RusselxD

**Repository**: [https://github.com/RusselxD/survey-system](https://github.com/RusselxD/survey-system)

---

<div align="center">
  <strong>Built with ❤️ using React and TypeScript</strong>
</div>
