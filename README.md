# 🚀 CRM Management System (React + .NET + PostgreSQL)

A full-stack Customer Relationship Management (CRM) web application built using:

- ⚙️ ASP.NET Core Web API  
- ⚛️ React.js (Vite) Frontend  
- 🐘 PostgreSQL Database (pgAdmin)  
- 🔗 RESTful API Architecture  

This system helps manage **Users, Customers, Products, and Orders** with complete CRUD operations and an admin dashboard.

---

# 📌 Project Overview

The CRM system is designed for managing business operations such as:

- User administration  
- Customer records  
- Product inventory  
- Order tracking  

It includes a dashboard with live statistics and a modern admin interface.

---

# ✨ Features

## 📊 Dashboard
- Total Users
- Total Customers
- Total Products
- Total Orders
- Clean admin UI

## 👤 User Management
- Add User
- Update User
- Delete User
- View User List

## 🧾 Customer Management
- Add Customer
- Update Customer
- Delete Customer
- View Customer List

## 📦 Product Management
- Add Product
- Update Product
- Delete Product
- Manage stock & price

## 📑 Order Management
- Create orders
- Link customer & product
- Track order details

---

# 🛠️ Tech Stack

## Frontend
- React.js (Vite)
- JavaScript
- Fetch API / Axios
- CSS

## Backend
- ASP.NET Core Web API
- Entity Framework Core
- REST APIs
- CORS enabled

## Database
- PostgreSQL
- pgAdmin

---

# 🚀 CRM Management System

A Full-Stack CRM (Customer Relationship Management) Application built using:

- ASP.NET Core Web API (Backend)
- React.js with Vite (Frontend)
- PostgreSQL (Database)
- Entity Framework Core

This system manages Users, Customers, Products, and Orders with full CRUD functionality.

---

# 📂 Project Structure

CRM-Project  
│  
├── CRMApi (Backend)  
│ ├── Controllers  
│ │ ├── UserController.cs  
│ │ ├── CustomerController.cs  
│ │ ├── ProductController.cs  
│ │ └── OrderController.cs  
│ │  
│ ├── Models  
│ ├── Data  
│ │ └── AppDbContext.cs  
│ │  
│ ├── Program.cs  
│ ├── appsettings.json  
│ └── CRMApi.csproj  
│  
├── crm-frontend (Frontend)  
│ ├── src  
│ │ ├── pages  
│ │ │ ├── Dashboard.jsx  
│ │ │ ├── Users.jsx  
│ │ │ ├── Customers.jsx  
│ │ │ └── Products.jsx  
│ │ │  
│ │ ├── layout  
│ │ │ ├── Sidebar.jsx  
│ │ │ └── Header.jsx  
│ │ │  
│ │ ├── App.jsx  
│ │ └── main.jsx  
│ │  
│ ├── package.json  
│ └── vite.config.js  
│  
└── README.md  

---

# ✨ Features

- Dashboard with statistics
- User CRUD operations
- Customer CRUD operations
- Product CRUD operations
- Order Management
- REST API architecture
- CORS enabled
- Modern Admin UI

---

# ⚙️ Setup Instructions

## 1️⃣ Database Setup

Create PostgreSQL database:

```sql
CREATE DATABASE crm_db;
# ⚙️ Setup Instructions

## 1️⃣ Database Setup (PostgreSQL)

Create database:

```sql
CREATE DATABASE crm_db;
Create tables:

users

customers

products

orders

order_items

2️⃣ Backend Setup (.NET API)

Open terminal:
cd CRMApi
Install dependencies:
dotnet restore
Run project:
dotnet run
Backend runs at:
http://localhost:5010
http://localhost:5010/swagger
cd crm-frontend
npm install
npm run dev
Frontend runs at:
http://localhost:5173
🔗 API Endpoints
Users
GET     /api/user
POST    /api/user
PUT     /api/user/{id}
DELETE  /api/user/{id}
Customers
GET     /api/customer
POST    /api/customer
PUT     /api/customer/{id}
DELETE  /api/customer/{id}
Products
GET     /api/product
POST    /api/product
PUT     /api/product/{id}
DELETE  /api/product/{id}
Orders
GET     /api/order
POST    /api/order
DELETE  /api/order/{id}
🧪 Testing
You can test using:

Swagger UI

Postman

Browser

React frontend
UI Modules
Admin Dashboard

Sidebar navigation

Header top bar

User form UI

Customer split form UI

Product management UI

CORS Configuration
Enabled in Program.cs:
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

app.UseCors("ReactPolicy");
Future Enhancements

JWT Authentication

Role-based login (Admin/User)

Sales analytics charts

Export data (Excel/PDF)

Notification system

Cloud deployment

👨‍💻 Author

Name: Manoj Dharecha
Project: CRM Management System
Technology: React + .NET + PostgreSQL
License

This project is developed for learning and academic purposes.


