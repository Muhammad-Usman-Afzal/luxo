# 🛍️ BazaarHub — Full-Stack E-Commerce Platform

A production-ready, full-stack e-commerce platform built with **React + Vite** (frontend) and **.NET Core 9** (backend) with **SQL Server LocalDB**.

---

## 🚀 Quick Start (Visual Studio 2022)

### One-Click Launch:
1. Double-click **`BazaarHub.sln`** → Opens in Visual Studio 2022
2. Click the **▶ Play** button (or press `F5`)
3. That's it! 🎉

**What happens automatically:**
- ✅ `npm install` runs (if needed)
- ✅ .NET backend starts on `http://localhost:5050`
- ✅ SQL Server LocalDB creates `BazaarHubDb` database
- ✅ Seed data auto-inserts (users, products, categories, orders)
- ✅ Vite dev server launches on `http://localhost:5173`
- ✅ Chrome opens at `http://localhost:5173`

---

## 🔑 Demo Accounts

| Role  | Email               | Password |
|-------|---------------------|----------|
| Admin | admin@bazaarhub.pk  | admin123 |
| User  | ahmed@email.com     | user123  |

---

## 📁 Project Structure

```
BazaarHub/
├── BazaarHub.sln                          # Open this → Click Play
│
├── BazaarHub.Backend/                     # .NET Core 9 Backend
│   ├── Controllers/
│   │   ├── HomeController.cs
│   │   ├── AccountController.cs           # Login/Register/Dashboard
│   │   ├── ProductsController.cs          # Products + Filters + Pagination
│   │   ├── OrdersController.cs            # Order CRUD + Status
│   │   ├── CartController.cs              # Cart Add/Remove/Update
│   │   ├── AdminController.cs             # Admin Dashboard + Reports
│   │   └── ChatController.cs              # Chat Messages + Contacts
│   │
│   ├── Models/
│   │   ├── User.cs, Product.cs, Category.cs
│   │   ├── Order.cs, OrderItem.cs
│   │   ├── Review.cs, Cart.cs, ChatMessage.cs
│   │   └── ViewModels/
│   │       ├── ProductViewModel.cs
│   │       ├── ProductDetailViewModel.cs
│   │       ├── CheckoutViewModel.cs
│   │       └── UserDashboardViewModel.cs
│   │
│   ├── Data/
│   │   ├── ApplicationDbContext.cs        # EF Core DbContext
│   │   └── SeedData.cs                    # Auto-seed on first run
│   │
│   ├── Services/
│   │   ├── IProductService.cs / ProductService.cs
│   │   ├── IOrderService.cs / OrderService.cs
│   │   ├── IAccountService.cs / AccountService.cs
│   │   ├── IChatService.cs / ChatService.cs
│   │   └── IEmailService.cs / EmailService.cs
│   │
│   ├── Program.cs                         # Entry point + Auto-DB + Vite launcher
│   ├── appsettings.json                   # LocalDB connection string
│   └── Properties/launchSettings.json
│
├── src/                                   # React + Vite Frontend
│   ├── components/
│   │   ├── Header.tsx, Footer.tsx, Navbar.tsx
│   │   ├── MobileNav.tsx (bottom navigation)
│   │   ├── ProductCard.tsx, Carousel.tsx
│   │   ├── Filters.tsx, Pagination.tsx
│   │   ├── ChatWidget.tsx (WhatsApp-style)
│   │   └── Layout.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx, ProductListing.tsx
│   │   ├── ProductDetail.tsx, Cart.tsx
│   │   ├── Checkout.tsx, WishlistPage.tsx
│   │   ├── ChatPage.tsx, SearchPage.tsx
│   │   ├── Login.tsx, Register.tsx
│   │   ├── UserDashboard.tsx
│   │   └── admin/
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminOrders.tsx
│   │       ├── AdminProducts.tsx
│   │       └── AdminUsers.tsx
│   │
│   ├── context/                           # State Management
│   │   ├── AuthContext.tsx (role-based)
│   │   ├── CartContext.tsx
│   │   ├── WishlistContext.tsx
│   │   └── ChatContext.tsx
│   │
│   ├── data/mockData.ts                   # Seed data for frontend
│   ├── types/index.ts                     # TypeScript interfaces
│   └── App.tsx                            # Router + Providers
│
├── index.html
├── vite.config.ts                         # Vite + API proxy
├── package.json
└── README.md
```

---

## 🎨 Features

### Frontend (React + Vite + Tailwind CSS)
- 🏠 **Home Page** — Hero carousel, category grid, featured products, hot deals
- 📋 **Product Listing** — Grid/List view, filters (category, price, rating), sort, pagination
- 📱 **Product Detail** — Images, sizes, colors, specs, reviews, chat button
- 🛒 **Cart** — Add/remove items, quantity, size/color selection
- 💳 **Checkout** — Multi-step: shipping → payment → confirmation
- ❤️ **Wishlist** — Save favorite products
- 💬 **Chat** — WhatsApp-style: ✓ single tick, ✓✓ double tick, quoted reply, product sharing
- 👤 **User Dashboard** — Orders, profile, quick stats
- 🔐 **Login/Register** — Role-based auth (Admin/User)
- 📊 **Admin Dashboard** — Charts, revenue, order management, user management
- 📱 **Responsive** — Mobile bottom nav, tablet, laptop, desktop

### Backend (.NET Core 9 + EF Core + SQL Server LocalDB)
- 🔒 Role-based authentication
- 🗄️ Auto-migrating database (LocalDB)
- 🌱 Auto-seeding sample data
- 📧 Email notifications (simulated)
- 💳 Payment simulation (COD, Card, JazzCash, Easypaisa)
- 📊 Admin analytics
- 🔌 RESTful API with Swagger UI

---

## 🔧 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite 7, Tailwind CSS 4    |
| Backend   | .NET Core 9, ASP.NET Core Web API   |
| Database  | SQL Server LocalDB + EF Core 9      |
| Auth      | SHA-256 password hashing            |
| UI Icons  | Lucide React                        |
| Routing   | React Router DOM v7                 |

---

## 📡 API Endpoints

| Method | Route                              | Description              |
|--------|------------------------------------|--------------------------|
| GET    | `/api/home/health`                 | Health check             |
| GET    | `/api/products`                    | List (filtered, paged)   |
| GET    | `/api/products/featured`           | Featured products        |
| GET    | `/api/products/{slug}`             | Product detail + reviews |
| POST   | `/api/account/login`               | User login               |
| POST   | `/api/account/register`            | User registration        |
| GET    | `/api/account/dashboard/{id}`      | User dashboard           |
| GET    | `/api/orders/user/{userId}`        | User orders              |
| POST   | `/api/orders`                      | Place order              |
| PATCH  | `/api/orders/{id}/status`          | Update order status      |
| GET    | `/api/cart/{userId}`               | View cart                |
| POST   | `/api/cart`                        | Add to cart              |
| DELETE | `/api/cart/{itemId}`               | Remove from cart         |
| GET    | `/api/chat/messages`               | Chat messages            |
| POST   | `/api/chat/send`                   | Send message             |
| POST   | `/api/chat/seen`                   | Mark messages seen       |
| GET    | `/api/admin/dashboard`             | Admin dashboard          |
| GET    | `/api/admin/orders`                | All orders               |
| GET    | `/api/admin/users`                 | All users                |
| GET    | `/api/admin/products`              | All products             |

📚 Swagger UI: `http://localhost:5050/swagger`

---

## ⚙️ Requirements

- **Visual Studio 2022** (Community/Pro/Enterprise)
- **.NET 9 SDK**
- **Node.js 18+** (for npm)
- **SQL Server LocalDB** (comes with Visual Studio)

> No separate SQL Server installation needed — LocalDB is included with VS.

---

## 🏗️ Manual Start (Alternative)

```bash
# Terminal 1 — Backend
cd BazaarHub.Backend
dotnet run

# Terminal 2 — Frontend
npm install
npm run dev
```

---

*Built with ❤️ — BazaarHub 2025*
