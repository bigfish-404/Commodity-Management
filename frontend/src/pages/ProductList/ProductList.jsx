import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import './ProductList.css';

function ProductList() {

    // 定义状态：商品列表数据
    const [products, setProducts] = useState([]);
    // 定义状态：商品总数量（用于分页）
    const [totalItems, setTotalItems] = useState(0);
    // 定义状态：当前页码
    const [currentPage, setCurrentPage] = useState(1);
    // 定义状态：每页显示条数
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // 临时用户ID (后续登录模块完善后从登录状态中获取)
    const userId = 2;

    const formatDate = (dateString) => {
    if (!dateString) return '-';
    return dateString.substring(0, 10);
};

    /**
     * 当 currentPage 或 itemsPerPage 变化时，重新获取数据
     */
    useEffect(() => {
        fetchProducts();
        fetchTotalCount();
    }, [currentPage, itemsPerPage]);

    /**
     * 获取商品列表（带分页）
     */
    const fetchProducts = async () => {
        try {
            const offset = (currentPage - 1) * itemsPerPage;
            const response = await axios.get(`/api/products/${userId}`, {
                params: { offset: offset, limit: itemsPerPage }
            });
            setProducts(response.data); // 设置商品数据
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    /**
     * 获取商品总数量（用于分页总页数计算）
     */
    const fetchTotalCount = async () => {
        try {
            const response = await axios.get(`/api/products/${userId}/count`);
            setTotalItems(response.data); // 设置总数
        } catch (error) {
            console.error('Error fetching count:', error);
        }
    };

    // 计算总页数
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    /**
     * 处理每页显示数量切换事件
     * @param {*} e 
     */
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value)); // 更新每页条数
        setCurrentPage(1); // 切换每页数量后自动跳转到第一页
    };

    return (
        <>
            {/* 设置页面标题 */}
            <Helmet><title>商品一覧</title></Helmet>

            <div className="content">
                <div className="product-header">
                    <h2>商品リスト</h2>
                    <button className="add-product-btn">+ Add New Product</button>
                </div>

                {/* 商品数据表格 */}
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
                                <td>{p.productName}</td>
                                <td>{p.category}</td>
                                <td>{p.spec}</td>
                                <td>{p.stockQty}</td>
                                <td>{p.price?.toFixed(2)}</td> {/* 金额保留两位小数 */}
                                <td>{formatDate(p.lastSalesDate)}</td> {/* 允许空值显示 - */}
                                <td>{p.totalSales}</td>
                                <td>{p.staff}</td>
                                <td>
                                    <span className="action-btn">👁</span> {/* 查看 */}
                                    <span className="action-btn">✏️</span> {/* 编辑 */}
                                    <span className="action-btn">🗑</span> {/* 删除 */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 分页区域 */}
                <div className="pagination-container">
                    <div className="show-per-page">
                        表示件数：
                        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <div className="pagination-info">
                        {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
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
