import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login/Login';
import Homepage from '../pages/Home/Homepage';
import Mercari from '../pages/Mercari/Mercari';
import Furima from '../pages/Furima/Furima';
import Mypage from '../pages/Mypage/Mypage';
import Register from '../pages/Register/Register';
import ProductList from '../pages/ProductList/ProductList';
import ProductAdd from '../pages/ProductAdd/ProductAdd';

function AppRouter() {
  return (
    <Routes>
      {/* 无布局的页面 */}
      <Route path="/" element={<Login />} />
      <Route path="/api/register" element={<Register />} />

      {/* 有布局的页面 */}
      <Route path="/api/homepage" element={<MainLayout><Homepage /></MainLayout>} />
      <Route path="/api/mercari" element={<MainLayout><Mercari /></MainLayout>} />
      <Route path="/api/furima" element={<MainLayout><Furima /></MainLayout>} />
      <Route path="/api/mypage" element={<MainLayout><Mypage /></MainLayout>} />
      <Route path="/api/productList" element={<MainLayout><ProductList /></MainLayout>} />
      <Route path="/api/productAdd" element={<MainLayout><ProductAdd /></MainLayout>} />
    </Routes>
  );
}

export default AppRouter;
