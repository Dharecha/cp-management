import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Customers from "./Pages/Customers";
import Products from "./Pages/Products";
import Login from "./Pages/Login";

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Header />

        <div style={{ padding: "20px", marginTop: "60px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;