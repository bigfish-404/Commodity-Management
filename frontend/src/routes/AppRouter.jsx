import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login/Login';
import Homepage from '../pages/Home/Homepage';
import SaleInput from '../pages/SaleInput/SaleInput';
import Mypage from '../pages/Mypage/Mypage';
import Register from '../pages/Register/Register';
import ProductList from '../pages/ProductList/ProductList';
import ProductAdd from '../pages/ProductAdd/ProductAdd';
import SalesHistory from '../pages/SalesHistory/SalesHistory';
import Channel from '../pages/Channel/Channel';

function AppRouter() {
  return (
    <Routes>
      {/* 无布局的页面 */}
      <Route path="/" element={<Login />} />
      <Route path="/api/register" element={<Register />} />

      {/* 有布局的页面 */}
      <Route path="/api/homepage" element={<MainLayout><Homepage /></MainLayout>} />
      <Route path="/api/saleInput" element={<MainLayout><SaleInput /></MainLayout>} />
      <Route path="/api/salesHistory" element={<MainLayout><SalesHistory /></MainLayout>} />
      <Route path="/api/mypage" element={<MainLayout><Mypage /></MainLayout>} />
      <Route path="/api/productList" element={<MainLayout><ProductList /></MainLayout>} />
      <Route path="/api/productAdd" element={<MainLayout><ProductAdd /></MainLayout>} />
      <Route path="/api/channel" element={<MainLayout><Channel /></MainLayout>} />
    </Routes>
  );
}

export default AppRouter;
