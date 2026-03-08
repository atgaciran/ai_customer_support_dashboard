# AI Customer Support Dashboard

A modern, high-performance customer support ticket management dashboard integrated with AI-powered assistance. 

## 🔗 Live Preview
You can explore the live application here: [Live Demo](https://ai-customer-support-dashboard-sigma.vercel.app)

---

## 🏗️ Architecture Overview

This project is built with a focus on modularity, performance, and clean code principles:

* **Framework:** Next.js 15+ (App Router) for optimized rendering and seamless routing.
* **State Management:** Zustand for lightweight, centralized state handling (managing tickets, filters, and search).
* **Styling:** Tailwind CSS for a fully responsive, utility-first design with built-in Dark Mode support.
* **AI Integration:** io.net infrastructure for AI-powered assistant features and automated responses.

---

### 📂 Folder Structure

The project follows a feature-based and modular folder structure to maintain clean architecture:

```
.
├── public/            # Static assets and images
└── src/
    ├── actions/       # Server actions and backend logic operations
    ├── app/           # Next.js App Router pages and layouts
    ├── components/    # Reusable UI components
    ├── lib/           # Utility functions, mock data, and configurations
    ├── store/         # Zustand store for global state management
    └── types/         # TypeScript interfaces and type definitions
```
    

## 🚀 Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Prerequisites

You must have Node.js installed on your system.
* **Node.js:** Download and install the latest stable version from [https://nodejs.org/en/download](https://nodejs.org/en/download).

### 2. Installation & Dependencies

Clone the repository and install the necessary packages:

```bash
# Clone the repository
git clone https://github.com/atgaciran/ai_customer_support_dashboard.git

# Navigate into the project directory
cd ai_customer_support_dashboard

# Install dependencies
npm install
```

### 3. API Configuration (io.net)
The project utilizes **io.net** infrastructure for AI assistant features.

* Go to [https://ai.io.net/ai/api-keys](https://ai.io.net/ai/api-keys) and generate an API key.
* Edit or create a `.env` (or `.env.local`) file in the root directory and add your key:

```env
IONET_BASE_URL=https://api.intelligence.io.solutions/api/v1
IONET_API_KEY= your_api_key_here
IONET_MODEL=meta-llama/Llama-3.3-70B-Instruct
```
### 4. Running the Project
Start the development server with the following command:

```bash
npm run dev
```
Once the process is complete, open your browser and navigate to `http://localhost:3000` to view the application.
