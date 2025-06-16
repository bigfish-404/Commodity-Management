import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProductAddForm from './ProductAddForm';
import './ProductAdd.css';

export default function ProductAdd() {
    return (
        <>
            <Helmet>
                <title>Product Add</title>
            </Helmet>
            <div className="content">
                <div className=".product-header ">
                    <h2>商品追加</h2>
                    <ProductAddForm />
                </div>
            </div>

        </>
    );
}
