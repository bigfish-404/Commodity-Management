// src/pages/ProductInfo.jsx
import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, IconButton, TextField, Button, Chip
} from '@mui/material';
import { Delete, Edit, Add, Save } from '@mui/icons-material';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import { Helmet } from 'react-helmet-async';
import { formContainerSx } from './ProductInfoStyles';
import {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from '../../services/productInfoService';

function ProductInfo() {
    const [productInfo, setProductInfo] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newRow, setNewRow] = useState(null);
    const [search, setSearch] = useState('');
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser?.userId || 'demo_user';

    const loadProducts = async () => {
        try {
            const data = await fetchProducts(userId);
            setProductInfo(data);
        } catch (err) {
            console.error("商品情報の取得に失敗しました", err);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleEdit = (item) => {
        setEditId(item.id);
        setNewRow({ ...item });
    };

    const handleChange = (e) => {
        setNewRow({ ...newRow, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const productToSave = {
                ...newRow,
                userId,
                createdBy: userId,
                updatedBy: userId
            };

            if (editId === 'new') {
                productToSave.productId = 'PRD-' + Date.now();
                await addProduct(productToSave);
            } else {
                productToSave.id = editId;
                await updateProduct(productToSave);
            }

            setEditId(null);
            setNewRow(null);
            loadProducts();
        } catch (err) {
            console.error("保存失敗", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            loadProducts();
        } catch (err) {
            console.error("削除失敗", err);
        }
    };

    const handleAdd = () => {
        setEditId('new');
        setNewRow({
            productName: '',
            description: '',
            personInCharge: '',
            status: 'active'
        });
    };

    const filteredProducts = productInfo.filter(p =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Helmet>
                <title>品番追加</title>
            </Helmet>

            <Box component="form" sx={formContainerSx}>
                <Box p={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <TextField
                            label="品番検索"
                            size="small"
                            sx={{ width: 300 }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="body2" color="text.secondary">
                                合計 {filteredProducts.length} 件
                            </Typography>
                            <Button variant="contained" onClick={handleAdd} startIcon={<Add />}>
                                商品追加
                            </Button>
                        </Box>
                    </Box>

                    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
                        <Table
                            size="small"
                            sx={{ minWidth: 800, borderCollapse: 'separate', borderSpacing: 0 }}
                        >
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
                                    {['品番名', '説明', '担当者', '登録日', '操作'].map((header) => (
                                        <TableCell
                                            key={header}
                                            align="center"
                                            sx={{ fontWeight: 'bold', '&:not(:first-of-type)': { borderLeft: '1px solid #ddd' } }}
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProducts.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        hover
                                        sx={{ '&:hover': { backgroundColor: '#f9f9f9' }, borderBottom: '1px solid #eee' }}
                                    >
                                        {editId === row.id ? (
                                            <>
                                                <TableCell align="center">
                                                    <TextField name="productName" value={newRow.productName} onChange={handleChange} size="small" fullWidth />
                                                </TableCell>
                                                <TableCell align="center" sx={{ borderLeft: '1px solid #eee' }}>
                                                    <TextField name="description" value={newRow.description} onChange={handleChange} size="small" fullWidth />
                                                </TableCell>
                                                <TableCell align="center" sx={{ borderLeft: '1px solid #eee' }}>
                                                    <TextField name="personInCharge" value={newRow.updatedBy} onChange={handleChange} size="small" fullWidth />
                                                </TableCell>
                                                <TableCell align="center" sx={{ borderLeft: '1px solid #eee' }}>{row.updatedAt || '--'}</TableCell>
                                                <TableCell align="center" sx={{ borderLeft: '1px solid #eee' }}>
                                                    <IconButton onClick={handleSave} color="primary"><Save /></IconButton>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell align="center">
                                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                        <Inventory2Outlined fontSize="small" color="action" />
                                                        {row.productName}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center" sx={{ borderLeft: '1px solid #eee' }}>{row.description}</TableCell>
                                                <TableCell align="center" sx={{ borderLeft: '1px solid #eee' }}>{row.updatedBy}</TableCell>

                                                <TableCell align="center" sx={{ borderLeft: '1px solid #eee' }}>{row.updatedAt?.slice(0, 10) || '--'}</TableCell>
                                                <TableCell align="center" sx={{ borderLeft: '1px solid #eee' }}>
                                                    <IconButton onClick={() => handleEdit(row)}><Edit /></IconButton>
                                                    <IconButton onClick={() => handleDelete(row.id)} color="error"><Delete /></IconButton>
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
}

export default ProductInfo;