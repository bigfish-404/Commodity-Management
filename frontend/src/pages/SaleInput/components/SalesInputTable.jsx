import React, { useState, useEffect } from 'react';
import './SalesInputTable.css';
import {
  TextField, Button, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';
import { fetchSalesData, sellProduct } from '../../../services/salesInputService';

function SalesInputTable({ platform, channelId, handlingFeeMap  }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [confirmIndex, setConfirmIndex] = useState(null);

  useEffect(() => {
    const loadSalesData = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchSalesData(currentUser, channelId); // 
        const initializedData = data.map(item => {
          const salesPrice = parseFloat(item.price) || 0;
          const deliveryFee = parseFloat(item.deliveryPrice) || 0;
          const purchasePrice = parseFloat(item.purchasePrice) || 0;
          const quantity = 1;
          const feePercent = handlingFeeMap[platform] ?? 0; // 
          const handlingRate = feePercent / 100;
          const handlingFee = Math.ceil(salesPrice * handlingRate);
          const profit = (salesPrice - purchasePrice) * quantity - handlingFee - deliveryFee;

          return {
            ...item,
            quantity,
            salesPrice,
            deliveryFee,
            handlingFee,
            profit,
          };
        });
        setRows(initializedData);
      } catch (err) {
        console.error("❌ 商品データ取得失敗:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.userId && platform && channelId) {
      loadSalesData();
    }
  }, [currentUser?.userId, platform, channelId]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    const salesPrice = parseFloat(updated[index].salesPrice) || 0;
    const deliveryFee = parseFloat(updated[index].deliveryFee) || 0;
    const purchasePrice = parseFloat(updated[index].purchasePrice) || 0;
    const quantity = parseFloat(updated[index].quantity) || 1;
    const handlingRate = platform === 'mercari' ? 0.1 : 0.05;
    const handlingFee = Math.ceil(salesPrice * handlingRate);

    updated[index].handlingFee = handlingFee;
    updated[index].profit = (salesPrice - purchasePrice) * quantity - handlingFee - deliveryFee;

    setRows(updated);
  };

  const handleConfirmClick = (index) => {
    setConfirmIndex(index);
  };

  const handleCancelDialog = () => {
    setConfirmIndex(null);
  };

  const handleConfirmSale = async () => {
    const product = rows[confirmIndex];
    try {
      await sellProduct(product, currentUser, channelId);
      alert("販売が完了しました！");
      setConfirmIndex(null);
      // 可选：可以重新加载数据
    } catch (err) {
      console.error("❌ 販売エラー:", err);
      alert("販売処理に失敗しました");
    }
  };

  if (loading) return<div className="loading-message">読み込み中...</div>;
  if (error) return <div className="error-message">データ取得失敗</div>;

  return (
<>
    <table className="sales-input-table">
        <thead>
            <tr>
                <th>商品名</th>
                <th>カテゴリー</th>
                <th>規格</th>
                <th>数量</th>
                <th>販売価格</th>
                <th>手数料</th>
                <th>配送料</th>
                <th>利益</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index} className={index === confirmIndex ? 'selected-row' : ''}>
<td><div className="display-cell">{row.productName}</div>
        </td>
        <td>
            <div className="display-cell">{row.categoryName}</div>
        </td>
        <td>
            <div className="display-cell">{row.specName}</div>
        </td>
        <td>
            <TextField className="small-input" type="number" value={row.quantity} onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                />
</td>
<td>
<TextField className="small-input" type="number" value={row.salesPrice} onChange={(e) => handleChange(index, 'salesPrice', e.target.value)}
                />
</td>
<td>
<TextField className="small-input" type="number" value={row.handlingFee} disabled />
</td>
<td>
<TextField className="small-input" type="number" value={row.deliveryFee} onChange={(e) => handleChange(index, 'deliveryFee', e.target.value)}
                />
</td>
<td>
<TextField className="small-input" value={row.profit} disabled />
</td>
<td>
<Button variant="contained" color="primary" size="small" onClick={() => handleConfirmClick(index)}
                >
                  確認
                </Button>
</td>
</tr>
          ))}
        </tbody>
</table>

      {/* 確認ダイアログ */}
      <Dialog open={confirmIndex !== null} onClose={handleCancelDialog}>
<DialogTitle>販売確認</DialogTitle>
<DialogContent>この商品を販売してもよろしいですか？</DialogContent>
<DialogActions>
<Button onClick={handleCancelDialog} color="secondary">キャンセル</Button>
            <Button onClick={handleConfirmSale} color="primary" variant="contained">確定</Button>
        </DialogActions>
    </Dialog>
</>
  );
}

export default SalesInputTable;
