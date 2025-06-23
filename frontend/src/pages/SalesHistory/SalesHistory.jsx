// SalesHistory.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  fetchAllsalesHistoryByUserId,
  deleteProfitById,
  increaseProductStock
} from '../../services/salesHistoryService';
import EditModal from './EditModal/EditModal';
import ConfirmDeleteDialog from './DeleteDialog/ConfirmDeleteDialog';

function SalesHistory() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const [fullData, setFullData] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchAllsalesHistoryByUserId(currentUser);
        setFullData(data || []);
      } catch (err) {
        console.error('❌ データ取得失敗:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setProducts(fullData.slice(start, end));
  }, [currentPage, itemsPerPage, fullData]);

  const totalPages = Math.ceil(fullData.length / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSaveModal = (updatedItem) => {
    const updatedList = fullData.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setFullData(updatedList);
    setIsModalOpen(false);
  };

  const handleOpenDelete = (item) => {
    setDeleteTarget(item);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProfitById(deleteTarget.id);
      await increaseProductStock(deleteTarget);
      setFullData((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    } catch (e) {
      console.error('❌ 削除失敗:', e);
    } finally {
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>販売履歴</title>
      </Helmet>

      <div className="content">
        <div className="product-header">
          <h2>販売履歴</h2>
        </div>

        {loading ? (
          <p>読み込み中...</p>
        ) : error ? (
          <p>データ取得中にエラーが発生しました。</p>
        ) : (
          <>
            <table className="product-table">
              <thead>
                <tr>
                  <th>商品名</th>
                  <th>商品カテゴリ</th>
                  <th>規格・仕様</th>
                  <th>売り数量</th>
                  <th>単価</th>
                  <th>利益</th>
                  <th>販売日</th>
                  <th>販売チャネル</th>
                  <th>担当者</th>
                  <th>アクション</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={10}>データがありません。</td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id}>
                      <td>{p.productName}</td>
                      <td>{p.category}</td>
                      <td>{p.spec}</td>
                      <td>{p.quantity}</td>
                      <td>{p.salesPrice}</td>
                      <td>{p.profit}</td>
                      <td>{p.salesDate?.slice(0, 10)}</td>
                      <td>{p.displayName}</td>
                      <td>{p.salesPerson}</td>
                      <td>
                        <span className="action-btn" onClick={() => handleOpenModal(p)}>
                          ✏️
                        </span>
                        <span className="action-btn" onClick={() => handleOpenDelete(p)}>
                          🗑
                        </span>
                      </td>
                    </tr>
                  ))
                )}
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
                {(currentPage - 1) * itemsPerPage + 1} -
                {Math.min(currentPage * itemsPerPage, fullData.length)} of {fullData.length} items
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
          </>
        )}
      </div>

      <EditModal
        open={isModalOpen}
        item={selectedItem}
        onClose={handleCloseModal}
        onSave={handleSaveModal}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default SalesHistory;
