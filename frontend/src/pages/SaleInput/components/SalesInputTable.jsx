// src/pages/SalesInput/SalesInputTable.jsx
import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
    Grid, FormControl, Select, MenuItem, Box
} from '@mui/material';
import { fetchSalesData, sellProduct } from '../../../services/salesInputService';
import {
    cellSx, inputSx, rowSx,
    paginationContainerSx, selectBoxSx, itemRangeSx, pageButtonSx
} from './salesInputTableStyles';

function SalesInputTable({ platform, channelId, handlingFeeMap }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [confirmIndex, setConfirmIndex] = useState(null);

    const [fullData, setFullData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    const calculateHandlingFee = (platform, salesPrice) => {
        const rate = (handlingFeeMap[platform] ?? 0) / 100;
        return Math.ceil(salesPrice * rate);
    };

    useEffect(() => {
        const loadSalesData = async () => {
            setLoading(true);
            setError(false);
            try {
                const data = await fetchSalesData(currentUser, channelId);
                const initializedData = data.map(item => {
                    const salesPrice = parseFloat(item.price) || 0;
                    const deliveryFee = parseFloat(item.deliveryPrice) || 0;
                    const purchasePrice = parseFloat(item.purchasePrice) || 0;
                    const quantity = 1;
                    const handlingFee = calculateHandlingFee(platform, salesPrice);
                    const profit = (salesPrice - purchasePrice) * quantity - handlingFee - deliveryFee;
                    return {
                        ...item,
                        quantity,
                        salesPrice,
                        deliveryFee,
                        handlingFee,
                        profit,
                        channelId
                    };
                });
                setFullData(initializedData);
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

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setRows(fullData.slice(start, end));
    }, [fullData, currentPage, itemsPerPage]);


    const handleChange = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;

        const salesPrice = parseFloat(updated[index].salesPrice) || 0;
        const deliveryFee = parseFloat(updated[index].deliveryFee) || 0;
        const purchasePrice = parseFloat(updated[index].purchasePrice) || 0;
        const quantity = parseFloat(updated[index].quantity) || 1;

        if (field === 'salesPrice' || field === 'quantity') {
            const handlingFee = calculateHandlingFee(platform, salesPrice);
            updated[index].handlingFee = handlingFee;
        }

        const handlingFee = parseFloat(updated[index].handlingFee) || 0;
        updated[index].profit = (salesPrice - purchasePrice) * quantity - handlingFee - deliveryFee;

        setRows(updated);
    };

    const handleConfirmClick = (index) => setConfirmIndex(index);
    const handleCancelDialog = () => setConfirmIndex(null);

    const handleConfirmSale = async () => {
        const product = rows[confirmIndex];
        try {
            await sellProduct(product, currentUser);
            alert("販売が完了しました！");
            setConfirmIndex(null);
        } catch (err) {
            console.error("❌ 販売エラー:", err);
            alert("販売処理に失敗しました");
        }
    };

    if (loading) return <Typography sx={{ m: 2 }}>読み込み中...</Typography>;
    if (error) return <Typography color="error" sx={{ m: 2 }}>データ取得失敗</Typography>;

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small" sx={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={cellSx(120)}>商品名</TableCell>
                            <TableCell sx={cellSx(120)}>カテゴリー</TableCell>
                            <TableCell sx={cellSx(100)}>規格</TableCell>
                            <TableCell sx={cellSx(100)}>数量</TableCell>
                            <TableCell sx={cellSx(100)}>販売価格</TableCell>
                            <TableCell sx={cellSx(100)}>手数料</TableCell>
                            <TableCell sx={cellSx(100)}>配送料</TableCell>
                            <TableCell sx={cellSx(100)}>利益</TableCell>
                            <TableCell sx={cellSx(100)}>操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.id || index}
                                hover
                                sx={rowSx(index, index === confirmIndex)}
                            >

                                <TableCell sx={cellSx(160)}>{row.productName}</TableCell>
                                <TableCell sx={cellSx(120)}>{row.categoryName}</TableCell>
                                <TableCell sx={cellSx(100)}>{row.specName}</TableCell>
                                <TableCell sx={cellSx(100)}>
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={row.quantity}
                                        onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                        sx={inputSx}
                                    />
                                </TableCell>
                                <TableCell sx={cellSx(100)}>
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={row.salesPrice}
                                        onChange={(e) => handleChange(index, 'salesPrice', e.target.value)}
                                        sx={inputSx}
                                    />
                                </TableCell>
                                <TableCell sx={cellSx(100)}>
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={row.handlingFee}
                                        onChange={(e) => handleChange(index, 'handlingFee', e.target.value)}
                                        sx={inputSx}
                                    />
                                </TableCell>
                                <TableCell sx={cellSx(100)}>
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={row.deliveryFee}
                                        onChange={(e) => handleChange(index, 'deliveryFee', e.target.value)}
                                        sx={inputSx}
                                    />
                                </TableCell>
                                <TableCell sx={cellSx(100)}>
                                    <TextField
                                        size="small"
                                        value={row.profit}
                                        disabled
                                        sx={inputSx}
                                    />
                                </TableCell>
                                <TableCell sx={cellSx(80)}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleConfirmClick(index)}
                                        sx={{ minWidth: 64 }}
                                    >
                                        確認
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container sx={paginationContainerSx}>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography fontSize={13}>表示件数：</Typography>
                    <FormControl size="small">
                        <Select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(parseInt(e.target.value));
                                setCurrentPage(1);
                            }}
                            sx={selectBoxSx}
                        >
                            {[5, 10, 20].map((num) => (
                                <MenuItem key={num} value={num}>{num}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <Typography sx={itemRangeSx}>
                        {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, fullData.length)} 件 / {fullData.length} 件中
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {[...Array(Math.ceil(fullData.length / itemsPerPage))].map((_, i) => (
                            <Button
                                key={i}
                                size="small"
                                variant={currentPage === i + 1 ? 'contained' : 'outlined'}
                                onClick={() => setCurrentPage(i + 1)}
                                sx={pageButtonSx(currentPage === i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </Box>
                </Grid>
            </Grid>



            {/* 確認ダイアログ */}
            <Dialog open={confirmIndex !== null} onClose={handleCancelDialog}>
                <DialogTitle>販売確認</DialogTitle>
                <DialogContent>
                    <Typography>この商品を販売してもよろしいですか？</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDialog} color="secondary" variant="outlined">キャンセル</Button>
                    <Button onClick={handleConfirmSale} color="primary" variant="contained">確定</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SalesInputTable;
