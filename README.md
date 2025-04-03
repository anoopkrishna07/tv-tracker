# TV Show Tracker

A web application built with React and Material UI that allows users to track the TV shows they've watched, powered by the TMDB API.

## Table of Contents

1.  [Project Overview](#project-overview)
2.  [Features](#features)
3.  [Technologies Used](#technologies-used)
4.  [Setup Instructions](#setup-instructions)
5.  [Environment Variables](#environment-variables)
6.  [Running the Application](#running-the-application)
7.  [Deployment](#deployment)
8.  [Contributing](#contributing)
9.  [License](#license)
10. [Credits](#credits)

## Project Overview

This project provides a simple and intuitive way to keep track of the TV shows you've watched. It allows you to:

*   Search for TV shows using the TMDB API.
*   Add shows to your "Watched" list.
*   Remove shows from your "Watched" list.
*   Browse your watched shows with pagination.
*   Play a Hangman game using the titles of your watched shows.
*   Categorize your TV shows in Spanish

The application uses a React frontend, a Vercel serverless function for the API, and a MongoDB database for data storage.

## Features

*   **TMDB API Integration:** Search for TV shows using the TMDB API.
*   **Watched List Management:** Add and remove shows from your personal watched list.
*   **Pagination:** Browse your watched shows in manageable chunks with pagination.
*   **Hangman Game:** Play a fun Hangman game using your watched shows as the words.
*   **User Interface:** A modern and responsive user interface built with Material UI.
*   **Local Authentication:** Restrict changes to the list only to the owner (basic authentication).
*   **Spanish TV Shows List:** Manage a separate list for Spanish TV shows.
*   **Mobile Responsiveness:**  Enjoy a seamless experience on desktop and mobile devices.

## Technologies Used

*   **Frontend:**
    *   [React](https://reactjs.org/)
    *   [Vite](https://vitejs.dev/) (Build Tool)
    *   [Material UI](https://mui.com/) (UI Component Library)
    *   [axios](https://axios-http.com/) (HTTP Client)
    *   [react-router-dom](https://reactrouter.com/web/guides/quick-start) (Routing)
*   **Backend/API:**
    *   [Node.js](https://nodejs.org/en/) (Vercel Serverless Functions)
    *   [mongodb](https://www.mongodb.com/) (MongoDB Node.js Driver)
*   **Database:**
    *   [MongoDB Atlas](https://www.mongodb.com/atlas/) (Cloud Database)
*   **Deployment:**
    *   [Vercel](https://vercel.com/) (Hosting Platform)

## Setup Instructions

1.  **Fork the Repository:**
    *   Click the "Fork" button in the top-right corner of this repository on GitHub. This will create a copy of the repository in your own GitHub account.

2.  **Clone the Forked Repository:**
    *   In your forked repository, click the "Code" button and copy the repository URL (either HTTPS or SSH).
    *   Open your terminal and run the following command, replacing `<repository-url>` with the URL you copied:

        ```bash
        git clone <repository-url>
        ```

3.  **Install Dependencies:**
    *   Navigate to the project directory:

        ```bash
        cd tv-tracker
        ```

    *   Install the required dependencies using npm:

        ```bash
        npm install
        ```

## Environment Variables

Before running the application, you need to configure the following environment variables.  You can do this by creating a `.env` file in the root of your project or by setting them directly in your Vercel project settings.

**Create a `.env` file in the root of your project:**


*   **`VITE_TMDB_API_KEY`:** Your API key from [TMDB](https://www.themoviedb.org/). Create an account and request an API key from your account settings.
*   **`MONGODB_URI`:** The connection string for your MongoDB Atlas cluster. Get this from your MongoDB Atlas dashboard.
*   **`MONGODB_DB`:** The name of the database you want to use in your MongoDB Atlas cluster (e.g., `tvtracker`).
*   **`ALLOWED_USERNAME`:** The username you want to use for basic authentication (for demonstration purposes only; do not use in production).
*   **`ALLOWED_PASSWORD`:** The password you want to use for basic authentication (for demonstration purposes only; do not use in production).

**Important:**

*   **Replace the placeholders** (`YOUR_TMDB_API_KEY`, `<username>`, `<password>`, `<cluster-name>`, `YOUR_USERNAME`, `YOUR_PASSWORD`) with your actual values.
*   **Never commit your `.env` file** to your public repository. Add `.env` to your `.gitignore` file.
*   **For production deployments**, it's recommended to set these environment variables directly in your hosting platform's (e.g., Vercel's) project settings for enhanced security.

## Running the Application

1.  **Start the Development Server:**
    *   Run the following command to start the Vite development server:

        ```bash
        npm run dev
        ```

    *   Open your browser and go to the address shown in the terminal (usually `http://localhost:5173/`).

2.  **Local Vercel Functions:**
    Start the local Vercel development server:

    ```bash
    vercel dev
    ```

## Deployment

1.  **Create a Vercel Account:**
    *   If you don't have one, create a free account on [Vercel](https://vercel.com/).

2.  **Install the Vercel CLI:**

    ```bash
    npm install -g vercel
    ```

3.  **Link Your Project to Vercel:**
    *   Run the following command in your project directory:

        ```bash
        vercel
        ```

    *   Follow the prompts to link your project to your Vercel account.

4.  **Deploy Your Application:**
    *   Run the following command to deploy your application to Vercel:

        ```bash
        vercel --prod
        ```

    *   Vercel will automatically build and deploy your application to a unique URL.

5.  **Set Environment Variables in Vercel:**
    *   In your Vercel project dashboard, go to "Settings" -> "Environment Variables."
    *   Add the environment variables listed in the [Environment Variables](#environment-variables) section. This is crucial for your application to function correctly in the production environment.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

*   This project was built using the following open-source libraries and resources:
    *   [React](https://reactjs.org/)
    *   [Material UI](https://mui.com/)
    *   [TMDB API](https://developer.themoviedb.org/docs)
    *   [Vercel](https://vercel.com/)
    *   [MongoDB](https://www.mongodb.com/)