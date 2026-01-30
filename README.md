# React Retail - E-Commerce Project

This is the "React Retail" capstone project, a complete e-commerce application developed as part of Udacity's Intermediate React course. This project demonstrates advanced usage of React, global state management, routing, and API interaction.

## 🚀 Features

The application includes the following main features:

*   **Product Catalog**: Grid view of products with images, prices, and categories.
*   **Product Details**: Dedicated page for each product with a full description.
*   **Shopping Cart**:
    *   Add and remove items.
    *   Adjust quantities.
    *   State persistence during navigation.
    *   Automatic total calculation.
*   **Authentication**:
    *   Simulated login system.
    *   Route protection (Checkout accessible only to logged-in users).
*   **Checkout**:
    *   Purchase completion form.
    *   Order summary.
    *   Simulated order submission to the API.

## 🛠️ Technologies Used

*   **[React](https://react.dev/)**: Main library for building the interface.
*   **[Vite](https://vitejs.dev/)**: Build tool and fast development server.
*   **[React Router](https://reactrouter.com/)**: Route management and navigation.
*   **[TanStack Query (React Query)](https://tanstack.com/query/latest)**: Server state management and data caching.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.
*   **[Context API](https://react.dev/learn/passing-data-deeply-with-context)**: Global state management (Authentication and Cart).
*   **[Vitest](https://vitest.dev/)** & **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**: Unit and integration testing.

## 📦 Project Structure

The project is organized as follows:

```
src/
├── api/            # Mock API configuration (mock server)
├── components/     # Reusable components (Header, ProductCard, etc.)
├── context/        # React Contexts (AuthContext, CartContext)
├── hooks/          # Custom Hooks
├── pages/          # Application pages (Home, ProductDetail, Cart, Login, Checkout)
├── routes/         # Route configuration
├── test/           # Test configuration
└── utils/          # Utility functions
```

## 🏁 How to Run

Follow the steps below to run the project locally:

### 1. Prerequisites

Make sure you have **Node.js** (version 18 or higher) installed on your machine.

### 2. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 3. Running the API and Frontend

The project requires two processes running simultaneously: the Mock API and the React application.

**Terminal 1 (Mock API):**
```bash
npm run dev:api
```
The API will run at `http://localhost:5174`.

**Terminal 2 (React Application):**
```bash
npm run dev
```
The application will open at `http://localhost:5173`.

### 4. Running Tests

To run the test suite:

```bash
npm run test
```

## 📝 Additional Notes

*   **Mock API**: The API is simulated, and data is not persisted in a real database. When restarting the API server, created orders will be lost.
*   **Authentication**: The login accepts any non-empty credentials for demonstration purposes.

---
Developed by [albertoivo](https://github.com/albertoivo/React-Retail-E-Commerce) during Udacity's React course.
