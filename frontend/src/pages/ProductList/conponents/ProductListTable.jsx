import React from "react";
import { formatDate } from "../../../utils/dateFormatter";
import './ProductListTable.css';

function ProductListTable({ products, orderBy, orderDirection, handleSort }) {

    const renderSortArrow = (field) => {
        if (orderBy !== field) return null;
        return orderDirection === 'asc' ? '▲' : '▼';
    };

    return (
        <table className="product-table">
            <thead>
                <tr>
                    <th onClick={() => handleSort("productName")}>商品名 {renderSortArrow("productName")}</th>
                    <th onClick={() => handleSort("category")}>商品カテゴリ {renderSortArrow("category")}</th>
                    <th onClick={() => handleSort("spec")}>規格・仕様 {renderSortArrow("spec")}</th>
                    <th onClick={() => handleSort("stockQty")}>在庫数量 {renderSortArrow("stockQty")}</th>
                    <th onClick={() => handleSort("price")}>単価（税込） {renderSortArrow("price")}</th>
                    <th onClick={() => handleSort("lastSalesDate")}>最終販売日 {renderSortArrow("lastSalesDate")}</th>
                    <th onClick={() => handleSort("totalSales")}>累計販売数 {renderSortArrow("totalSales")}</th>
                    <th onClick={() => handleSort("staff")}>担当者 {renderSortArrow("staff")}</th>
                    <th>アクション</th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => (
                    <tr key={p.id}>
                        <td>{p.productName}</td>
                        <td>{p.category}</td>
                        <td>{p.spec}</td>
                        <td>{p.stockQty}</td>
                        <td>{p.price?.toFixed(0)}</td>
                        <td>{formatDate(p.lastSalesDate)}</td>
                        <td>{p.totalSales}</td>
                        <td>{p.staff}</td>
                        <td>
                            <span className="action-btn">👁</span>
                            <span className="action-btn">✏️</span>
                            <span className="action-btn">🗑</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ProductListTable;
