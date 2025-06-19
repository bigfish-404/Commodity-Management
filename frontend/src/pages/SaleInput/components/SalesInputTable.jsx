import React, { useState, useEffect } from 'react';
import './SalesInputTable.css';
import { TextField, Button } from '@mui/material';
import { fetchSalesData } from '../../../services/salesInputService';

function SalesInputTable({ platform, channelId }) {
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSalesData = async () => {
      if (!channelId || !platform) {
        console.warn("⚠️ 渠道ID或平台未准备好，跳过此次加载");
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const data = await fetchSalesData(userId, channelId);
        const initializedData = data.map(item => ({
          ...item,
          quantity: item.quantity || 1,
          deliveryFee: item.deliveryPrice || 0,
          handlingFee: item.handlingFee || 0,
          profit: 0,
        }));

        initializedData.forEach(row => {
          const salesPrice = parseFloat(row.salesPrice) || 0;
          const quantity = parseFloat(row.quantity) || 1;
          const deliveryFee = parseFloat(row.deliveryFee) || 0;
          const handlingRate = platform === 'mercari' ? 0.1 : 0.05;
          const handlingFee = Math.ceil(salesPrice * handlingRate);
          row.handlingFee = handlingFee;
          row.profit = salesPrice * quantity - handlingFee - deliveryFee;
        });

        setRows(initializedData);
      } catch (err) {
        console.error("❌ 数据加载失败:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadSalesData();
  }, [channelId, platform]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    const salesPrice = parseFloat(updated[index].salesPrice) || 0;
    const deliveryFee = parseFloat(updated[index].deliveryFee) || 0;
    const quantity = parseFloat(updated[index].quantity) || 0;
    let handlingFee = parseFloat(updated[index].handlingFee) || 0;

    if (field !== 'handlingFee') {
      const handlingRate = platform === 'mercari' ? 0.10 : 0.05;
      handlingFee = Math.ceil(salesPrice * handlingRate);
      updated[index].handlingFee = handlingFee;
    }

    const profit = salesPrice * quantity - handlingFee - deliveryFee;
    updated[index].profit = profit;

    setRows(updated);
  };

  if (error) {
    return <div className="error-message">データ取得に失敗しました。</div>;
  }

  if (loading) {
    return <div className="loading-message">データ読み込み中...</div>;
  }

  return (
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
          <tr key={row.id || index}>
            <td><div className="display-cell">{row.productName}</div></td>
            <td><div className="display-cell">{row.categoryName}</div></td>
            <td><div className="display-cell">{row.specName}</div></td>
            <td>
              <TextField
                className="small-input"
                type="number"
                value={row.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
              />
            </td>
            <td>
              <TextField
                className="small-input"
                type="number"
                value={row.salesPrice}
                onChange={(e) => handleChange(index, 'salesPrice', e.target.value)}
              />
            </td>
            <td>
              <TextField
                className="small-input"
                type="number"
                value={row.handlingFee}
                onChange={(e) => handleChange(index, 'handlingFee', e.target.value)}
              />
            </td>
            <td>
              <TextField
                className="small-input"
                type="number"
                value={row.deliveryFee}
                onChange={(e) => handleChange(index, 'deliveryFee', e.target.value)}
              />
            </td>
            <td>
              <TextField
                className="small-input"
                value={row.profit}
                disabled
              />
            </td>
            <td>
              <div className="action-buttons">
                <Button variant="contained" size="small" color="primary">确认</Button>
                <Button variant="outlined" size="small" color="secondary">取消</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SalesInputTable;
