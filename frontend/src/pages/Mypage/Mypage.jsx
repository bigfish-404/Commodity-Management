import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import './Mypage.css';


function Mypage() {
    // 模拟总数据
    const fullData = [
        { id: 1, name: "Macbook pro", sku: "PT001", category: "Computers", brand: "N/D", price: 1500, unit: "pc", qty: 100, createdBy: "Admin" },
        
    ];

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // 计算分页后的数据
    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setProducts(fullData.slice(start, end));
    }, [currentPage, itemsPerPage]);

    const totalPages = Math.ceil(fullData.length / itemsPerPage);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // 切换每页数量后回到第一页
    };

    return (
        <>
            <Helmet>
                <title>マイページ</title>
            </Helmet>

            <div className="content">
                <div className="product-header">
                    <h2>Product List</h2>
                    <button className="add-product-btn">+ Add New Product</button>
                </div>

                <table className="product-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>商品名</th>
                            <th>商品カテゴリ</th>
                            <th>規格・仕様</th>
                            <th>在庫数量</th>
                            <th>単価（税込）</th>
                            <th>最終販売日</th>
                            <th>累計販売数</th>
                            <th>担当者</th>
                            <th>アクション</th>

                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td><input type="checkbox" /></td>
                                <td>{p.name}</td>
                                <td>{p.sku}</td>
                                <td>{p.category}</td>
                                <td>{p.brand}</td>
                                <td>{p.price.toFixed(2)}</td>
                                <td>{p.unit}</td>
                                <td>{p.qty}</td>
                                <td>{p.createdBy}</td>
                                <td>
                                    <span className="action-btn">👁</span>
                                    <span className="action-btn">✏️</span>
                                    <span className="action-btn">🗑</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination-container">
                    <div className="show-per-page">
                        Show per page:
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <div className="pagination-info">
                        {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, fullData.length)} of {fullData.length} items
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

export default Mypage;
