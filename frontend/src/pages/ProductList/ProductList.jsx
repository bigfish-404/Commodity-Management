import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ProductListTable from './conponents/ProductListTable';
import { fetchProducts, fetchTotalCount } from '../../services/productListService';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState("productName");
    const [orderDirection, setOrderDirection] = useState("asc");


    const userId = 2;

    useEffect(() => {
        loadData();
    }, [currentPage, itemsPerPage, orderBy, orderDirection]);


    const loadData = async () => {
        const offset = (currentPage - 1) * itemsPerPage;
        const data = await fetchProducts(userId, offset, itemsPerPage, orderBy, orderDirection);
        const count = await fetchTotalCount(userId);
        setProducts(data);
        setTotalItems(count);
    };

    const handleSort = (field) => {
        if (orderBy === field) {
            setOrderDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setOrderBy(field);
            setOrderDirection("asc");
        }
    };



    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <>
            <Helmet><title>商品一覧</title></Helmet>
            <div className="content">
                <div className="product-header">
                    <h2>商品リスト</h2>
                    <button className="add-product-btn">+ Add New Product</button>
                </div>

                <ProductListTable
                    products={products}
                    orderBy={orderBy}
                    orderDirection={orderDirection}
                    handleSort={handleSort}
                />

                <div className="pagination-container">
                    <div className="show-per-page">
                        表示件数：
                        <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <div className="pagination-info">
                        {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} 件中
                    </div>

                    <div className="pagination-buttons">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                className={currentPage === i + 1 ? 'active' : ''}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
