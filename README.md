# hol-copilot-lab

A polished, hands-on lab project that demonstrates how to build and validate a modern e-commerce experience using React, TypeScript, and Vite.

## ✨ Overview

This repository brings together a complete frontend workflow for a fictional online store, including:

- product discovery and browsing
- cart management and quantity updates
- checkout flow and confirmation states
- promotional discount handling from an admin experience
- product review submission
- automated testing and coverage reporting

The project is designed not only to showcase a functional UI, but also to highlight strong engineering practices such as component-driven development, state management, routing, and test quality.

## 🧭 Project Structure

```text
copilot-lab/
├── eCommApp/                 # Main application
│   ├── src/                  # Application source code
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # Shared React context
│   │   ├── test/             # Test helpers and setup
│   │   ├── types/            # TypeScript models and interfaces
│   │   └── utils/            # Helper functions
│   ├── public/               # Static assets and product data
│   ├── package.json          # Scripts and dependencies
│   └── README.md             # App-specific documentation
├── Instructions/             # Lab exercises and learning guides
└── README.md                 # Repository overview
```

## ⚙️ How It Works

The app follows a simple end-to-end customer journey:

1. Users browse through available products.
2. They can add selected items to the shopping cart.
3. They can review their choices and proceed through checkout.
4. Administrators can access a separate interface to apply promotional discounts.
5. Customers can submit product reviews directly through the UI.

This makes the project a strong example of modern frontend development patterns, including:

- component-based architecture
- declarative UI rendering
- client-side routing
- shared state via context
- automated testing with real user interaction flows

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have:

- Node.js 18 or higher
- npm

### Installation

```bash
cd eCommApp
npm install
```

### Run the Application

```bash
npm run dev
```

Then open the local app in your browser:

```text
http://localhost:5173
```

## 🧪 Testing

The project includes an automated test suite built with Vitest and Testing Library.

### Run tests

```bash
npm run test
```

### Run tests once

```bash
npm run test:run
```

### Generate a coverage report

```bash
npm run test:coverage
```

## 📦 Available Scripts

From the eCommApp folder, you can use:

- `npm run dev` — start the development server
- `npm run build` — build the project for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks
- `npm run test` — run tests in watch mode
- `npm run test:run` — run tests once
- `npm run test:coverage` — run tests and generate coverage insights

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- React Router
- Vitest
- Testing Library
- ESLint

## 🎯 Purpose

This lab is intended to help developers strengthen their skills in:

- frontend architecture
- UI implementation
- testing and quality assurance
- state management and shared context
- building interactive user experiences with React

---

Built as a learning-focused project to explore modern frontend development and professional engineering practices.
