# Vite Todo List

## Overview
This is a Todo List application built using modern web technologies. It provides a simple interface for managing tasks, including adding, updating, and deleting todos. The project is designed with scalability and maintainability in mind, leveraging a robust tech stack.

## Idea Behind 
This project adopts a feature-based structure to organize the source code, making it easier to maintain and extend over time. To efficiently render large todo lists, it leverages TanStack React Virtual, ensuring that only about 15 items are rendered at once for optimal performance. The app employs event delegation to handle actions like marking todos as completed/incomplete and deleting items — all managed at the parent component level.

For CRUD operations, the project uses TanStack React Query with optimistic updates, enabling efficient updates to the current list without needing to refetch the entire dataset. The todo list is stored using a Map data structure, allowing fast lookups and efficient state management.

For form handling, the project extends React Hook Form’s FormProvider, adding custom fields to enable more flexible and streamlined form management using the compound component pattern.

## Tech Stack
### Frontend
- React: A JavaScript library for building user interfaces.
- React Hook Form: For managing form state and validation.
- ShadCN: Accessible UI primitives for building components.
- Tailwind CSS: A utility-first CSS framework for styling.
- TanStack React Query: For data fetching and caching.
- TanStack React Virtual: For efficient rendering of large lists.
- Zod: For schema validation.
- Zustand: A lightweight state management library.

### Backend
- JSON Server: A mock REST API for development purposes.

## Setup Instructions
Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v8 or higher)

Installation
1. Clone the repository:
```bash
git clone
cd vite-todo-list
```
2. Install dependencies:

```bash
npm install
# or
yarn
```
3. Generate mock data:
Run the following command to generate mock data for the application:

```bash
npm run generate:data
npm run generate:data --todo-list=100
# or
yarn generate:data
yarn generate:data --todo-list=100
```
This will populate the db.json file with sample todos.
4. Start Development Server

```bash
npm run dev 
# or
yarn dev 
```
This will:
- Start the frontend development server on http://localhost:5173.
- Start the JSON Server backend on http://localhost:8080.
