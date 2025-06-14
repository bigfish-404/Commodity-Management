import React from "react";
import { formatDate } from "../../../utils/dateFormatter";
import './ProductListTable.css';


// 从父组件接受4个props
function ProductListTable({ products, orderBy, orderDirection, handleSort }) {

    const renderSortArrow = (field) => {
        if (orderBy !== field) return null;
        return orderDirection === 'asc' ? '▲' : '▼';
    };

    return (
        <table className="product-table">
            <thead>
                <tr>
                    {/* 点击这个表头的时候，会调用 handleSort("productName")，通知父组件修改排序字段。
                        renderSortArrow("productName")} 负责显示对应排序箭头。*/}
                    <th onClick={() => handleSort("productName")}>商品名 {renderSortArrow("productName")}</th>
                    <th onClick={() => handleSort("categoryName")}>カテゴリ {renderSortArrow("categoryName")}</th>
                    <th onClick={() => handleSort("specName")}>規格・仕様 {renderSortArrow("specname")}</th>
                    <th onClick={() => handleSort("stockQty")}>在庫数量 {renderSortArrow("stockQty")}</th>
                    <th onClick={() => handleSort("price")}>単価（税込） {renderSortArrow("price")}</th>
                    <th onClick={() => handleSort("lastSalesDate")}>最終販売日 {renderSortArrow("lastSalesDate")}</th>
                    <th onClick={() => handleSort("totalSales")}>累計販売数 {renderSortArrow("totalSales")}</th>
                    <th onClick={() => handleSort("staff")}>担当者 {renderSortArrow("staff")}</th>
                    <th>アクション</th>
                </tr>
            </thead>
            <tbody>
                {/* 遍历products的数组，逐条进行渲染，每一个p表示一条数据对象 */}
                {products.map(p => (
                    // 用 p.id 作为 key
                    <tr key={p.id}>
                        <td>{p.productName}</td>
                        <td>{p.categoryName}</td>
                        <td>{p.specName}</td>
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
