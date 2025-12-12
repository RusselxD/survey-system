# Survey System

A comprehensive, enterprise-grade survey management platform built with modern web technologies. This system empowers administrators to create sophisticated surveys with multiple question types, manage user access via RBAC, and derive actionable insights through advanced analytics dashboards.

## 🎯 Overview

The Survey System is a full-stack application designed to streamline the entire survey lifecycle—from creation and distribution to response collection and data analysis. The platform features a rich administrative interface with real-time analytics, role-based access control, and an intuitive user experience for both survey creators and respondents.

## ✨ Core Features

### 📊 Administrative Dashboard

-   **Comprehensive Analytics**: Real-time visualization of survey performance metrics including response rates, completion times, and engagement trends.
-   **Response Insights**: Track survey views, total responses, average completion times, and satisfaction scores.
-   **Engagement Funnel**: Monitor user journey from survey views to completion.
-   **Time-Series Analysis**: Response trends over configurable time periods.
-   **Geographical & Service Analytics**: Response distribution by location and service type.
-   **Activity Heatmaps**: Visualize response patterns across days and hours.
-   **Question Type Distribution**: Analyze usage of different question types across surveys.

### 📝 Survey Management

-   **Rich Question Types**: Support for diverse question formats including:
    -   Multiple Choice & Checkboxes
    -   Dropdowns
    -   Linear Scales (with customizable ranges and labels)
    -   Text Inputs (Short & Long Answer)
    -   Date & Time Pickers
    -   Grids (Multiple Choice & Checkbox Grids)
-   **Survey Builder**: Intuitive interface for creating and editing surveys.
-   **Question Validation**: Required fields and conditional logic support.
-   **Survey Status Management**: Draft, Published, Archived, and Closed states.
-   **QR Code Generation**: Automatically generate downloadable QR codes for easy distribution.
-   **Public Links**: Shareable links with clipboard copy functionality.
-   **Data Export**:
    -   **PDF Reports**: Generate detailed survey reports with analytics and charts.
    -   **Export Status**: Global background processing for multiple exports.

### 🔐 User Management & Security

-   **Role-Based Access Control (RBAC)**: Fine-grained permission system for Admin and User roles.
-   **User Administration**: Create, modify, and delete user accounts.
-   **Authentication**: Secure JWT-based authentication with session management.
-   **Security Best Practices**:
    -   Forced password updates on first login.
    -   Secure password generation and display warnings.
    -   Automatic session expiration and token handling.
-   **Protected Routes**: Route-level guards based on authentication and permissions.

### 📈 Advanced Analytics & Visualization

-   **Response Rate Analysis**: Track survey performance percentages.
-   **Completion Time Distribution**: Visualize respondent time investment.
-   **Top Surveys Ranking**: Identify high-performing surveys.
-   **Question-Level Analytics**:
    -   Distribution charts for choice-based questions.
    -   Word frequency analysis for text responses.
    -   Average ratings for linear scales.
    -   Complex grid response breakdowns.

### 🎨 User Experience

-   **Respondent Flow**:
    -   **Landing Page**: Survey overview with consent and privacy information.
    -   **Take Survey**: Distraction-free interface with validation.
    -   **Completion**: Confirmation page with "Submit Another" capability.
    -   **Smart Redirection**: Intelligent routing based on completion status (e.g., redirecting completed users away from the active survey).
-   **Theming**: Automatic Dark/Light mode switching based on system preference.
-   **Responsive Design**: Mobile-first architecture using Tailwind CSS.
-   **Interactive UI**:
    -   Infinite scroll pagination for large datasets.
    -   Skeleton loaders and spinners for smooth transitions.
    -   Toast notifications for user feedback.

## 🛠️ Tech Stack

### Frontend Framework & Build
| Technology | Purpose | Version |
| :--- | :--- | :--- |
| **React** | UI Library | v19.1.1 |
| **TypeScript** | Static Typing | v5.x |
| **Vite** | Build Tool & Dev Server | v7.x |

### Styling & UI
| Library | Purpose |
| :--- | :--- |
| **Tailwind CSS** | Utility-First CSS Framework |
| **daisyUI** | Component Library |
| **Lucide React** | Iconography |

### State & Routing
| Library | Purpose |
| :--- | :--- |
| **React Router** | Client-side Routing (v7) |
| **Context API** | Global State Management (Auth) |

### Utilities & Integration
| Library | Purpose |
| :--- | :--- |
| **Axios** | HTTP Client with Interceptors |
| **Chart.js** | Data Visualization |
| **jsPDF** | PDF Generation |
| **JWT Decode** | Token Parsing |
| **Date-fns** | Date Formatting |

## 🚀 Getting Started

### Prerequisites

-   **Node.js**: v18.0.0 or higher
-   **npm**: v9.0.0 or higher

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/RusselxD/survey-system.git
    cd survey-system
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    VITE_APP_TITLE="Survey System"
    VITE_APP_URL="http://localhost:5173"
    VITE_API_URL="http://localhost:3000/api"
    ```

### Running the Application

#### Development Mode
Starts the Vite development server with Hot Module Replacement (HMR).
```bash
npm run dev
```
> Access at: `http://localhost:5173`

#### Production Build
Creates an optimized build in the `dist/` directory.
```bash
npm run build
```

#### Preview Build
Preview the production build locally.
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/                  # Static assets (SVG, images)
├── components/              # Shared UI components
│   ├── reusable/            # Generic components (Modals, Buttons)
│   ├── ErrorBoundary.tsx    # Global error handling
│   ├── Navbar.tsx           # Navigation component
│   └── ProtectedRoute.tsx   # Auth & Permission wrapper
├── context/                 # React Contexts
│   └── AuthContext.tsx      # Authentication & User state
├── pages/                   # Route-based components
│   ├── Admin/               # Protected Admin Area
│   │   ├── Analytics/       # Global Analytics Dashboard
│   │   ├── Dashboard/       # Main Overview
│   │   ├── Login/           # Auth Pages (Login, Password Update)
│   │   ├── Settings/        # System Configuration
│   │   ├── Sidebar/         # App Sidebar
│   │   ├── Surveys/         # Survey Management
│   │   └── Users/           # User Management
│   └── User/                # Public Respondent Area
│       └── Survey/          # Survey Taking Flow (View, Take, Completed)
├── utils/                   # Helper functions & API
│   ├── api/                 # API service modules
│   ├── exportSurveyToPDF.ts # PDF Logic
│   └── ...                  # Other utilities
├── main.tsx                 # Entry point & Router configuration
└── index.css                # Global Tailwind styles
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---
<div align="center">
  <strong>Built with ❤️ using React 19 & TypeScript</strong>
</div>