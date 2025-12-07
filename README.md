# Survey System

A full-stack survey management application that allows administrators to create, manage, and analyze surveys, while users can take them.

## Features

-   **Admin Dashboard:** A comprehensive dashboard for administrators to manage surveys, users, and view analytics.
-   **Survey Management:** Create, edit, and delete surveys with various question types.
-   **User Management:** Manage user roles and permissions.
-   **Analytics:** Visualize survey data with various charts and graphs.
-   **Authentication:** Secure authentication system using JWT.
-   **QR Code Generation:** Generate QR codes for easy sharing of surveys.

## Tech Stack

-   **Frontend:**
    -   [React](https://reactjs.org/)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Vite](https://vitejs.dev/)
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [daisyUI](https://daisyui.com/)
-   **Routing:**
    -   [React Router](https://reactrouter.com/)
-   **HTTP Client:**
    -   [Axios](https://axios-http.com/)
-   **Charting:**
    -   [Chart.js](https://www.chartjs.org/)
    -   [react-chartjs-2](https://react-chartjs-2.js.org/)
-   **Icons:**
    -   [Lucide React](https://lucide.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/survey-system.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

### Running the Application

-   **Development:**
    ```sh
    npm run dev
    ```
    This will start the development server at `http://localhost:5173`.

-   **Production Build:**
    ```sh
    npm run build
    ```
    This will create a `dist` folder with the production build.

-   **Preview Production Build:**
    ```sh
    npm run preview
    ```
    This will start a local server to preview the production build.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in the development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the code using ESLint.
-   `npm run preview`: Serves the production build from the `dist` folder.

## Project Structure

```
.
├── src
│   ├── assets
│   ├── components
│   ├── context
│   ├── pages
│   │   ├── Admin
│   │   └── User
│   ├── utils
│   │   └── api
│   ├── main.tsx
│   └── index.css
├── public
├── package.json
└── README.md
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.