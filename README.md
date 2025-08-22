# CarZone

## Project Description
**CarZone** is a modern web application for buying and selling cars. Built with **Next.js 15**, **React 19**, and **MongoDB**, it allows users to browse, list, and view car details. The app features authentication via **NextAuth**, interactive UI elements with **Framer Motion**, responsive layouts, and data visualization using **Recharts**.

Key Features:
- User authentication (sign up/login) with NextAuth.
- Add, view, and manage car listings.
- Interactive UI animations and responsive design.
- Car details pages with images and specifications.
- Dashboard for managing listings and user data.

---

## Setup & Installation

### Prerequisites
- Node.js >= 18
- npm >= 9
- MongoDB database (Atlas or local)

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/car-selling-app.git
   cd car-selling-app
```
2.**Install dependencies
   ```bash
     npm install
```
3 .Run the development server
```bash
npm run dev
```
4.Build for production 
```bash
npm run build
npm start
```

#Route Summary

### Car Routes
| Route | Method | Description | Access |
|-------|--------|------------|--------|
| `/cars` | GET | List all cars | Public |
| `/cars/:id` | GET | Get car details | Public |
| `/cars/add` | POST | Add new car | Protected |

