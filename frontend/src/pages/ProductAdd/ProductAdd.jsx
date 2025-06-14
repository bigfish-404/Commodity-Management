import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductForm from './ProductForm';
import './ProductAdd.css';

export default function ProductAdd() {
  return (
    <>
      <Helmet>
        <title>Product Add</title>
      </Helmet>
      <div className="product-add-container">
        <h2>Product Add</h2>
        <p>Create new product</p>
        <ProductForm />
      </div>
    </>
  );
}
