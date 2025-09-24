// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/adminPanel/Dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Customer from './pages/Customer/Customer';
import Product from './pages/Product/Product';
import Transactions from './pages/Transactions/Transactions';
import ProtectedRoute from './components/ProtectedRoute';
import TransactionPanel from './pages/adminPanel/Transaction/TransactionPanel';
import Reports from './pages/adminPanel/Report/Reports';
import TransactionDetailPage from './pages/Transactions/TransactionDetailPage';
import Category from './pages/adminPanel/Category/Category';
import Users from './pages/adminPanel/User/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route */}
        <Route path="/" element={<Login />} />
        
        {/* Main App Routes */}
        <Route path="/home" element={
          
            <Home />
         
        } />
        
        <Route path="/customer" element={
          
            <Customer />
         
        } />
        
        <Route path="/product" element={
          
            <Product />
         
        } />
        
        <Route path="/transaction" element={
          
            <Transactions />
         
        } />
        
        <Route path="/transaction/:id" element={
          
            <TransactionDetailPage />
         
        } />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          
            <Dashboard />
         
        } />
        
        <Route path="/dashboard/transaction-panel" element={
          
            <TransactionPanel />
         
        } />

        <Route path="/dashboard/Report" element={
          
            <Reports />
         
        } />
        <Route path="/dashboard/category" element={
          
            <Category />
         
        } />
        <Route path="/dashboard/user" element={
          
            <Users/>
         
        } />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;