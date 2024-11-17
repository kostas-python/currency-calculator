This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

*** Ask for admin credentials  ***



# Currency Calculator Application

## Overview

The Currency Calculator application consists of two main components:
1. **REST API**: Built using Node.js to handle currency conversion, manage exchange rates, and perform CRUD operations. Includes authentication for protected endpoints.

2. **Graphical User Interface (GUI)**: Developed using React Js allowing users to interact with the API for currency conversion, adding/updating exchange rates, and managing currencies.

---

## Features

### API
- **Currency Conversion**: Convert a specific amount from a base currency to a target currency.
- **CRUD Operations**: Add, read, update, and delete currencies and their exchange rates dynamically.
- **Authentication and Authorization**: Secured endpoints (with CRUD operations) with a simple login mechanism and NEXT_PUBLIC_ADMIN_PASSWORD_HASH, bcrypt, JSON Web Tokens (JWT).


### GUI
- **Conversion Tool**: Simple interface to select base/target currencies, input amounts, and view conversion results.
- **Currency Management**: Add or update currencies and their rates using forms.
- **Authentication**: Log in to access protected API features like managing currencies.
- **Dynamic Updates**: Leverages API endpoints to fetch and update live data.

---

## Tech Stack

### Backend
- **Node.js** with Express.js (or PHP Symfony)
- **Database**: SQLite (for storing users and exchange rates)
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Variables**: `dotenv` for managing secrets like `JWT_SECRET`.

### Frontend
- **React** 
- **Styling**: Tailwind CSS/
- **State Management**: React's `useState`/`useEffect` 
- **API Communication**: Fetch API

---

## Installation and Setup

### Backend Setup
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd currency-calculator-api


