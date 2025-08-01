import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, IconButton, TextField, Button
} from '@mui/material';
import { Delete, Edit, Add, Save } from '@mui/icons-material';
import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import { Helmet } from 'react-helmet-async';

import {
    formContainerSx,
    searchFieldSx,
    tableContainerSx,
    tableSx,
    tableHeadRowSx,
    tableCellHeadSx,
    tableRowHoverSx,
    tableCellBodySx,
    disabledTextFieldSx
} from './CategoryStyles';

import {
    fetchCategorys,
    addCategory,
    updateCategory,
    deleteCategory
} from '../../services/categoryService';

function ProductInfo() {
    const [categoryInfo, setCategoryInfo] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newRow, setNewRow] = useState(null);
    const [search, setSearch] = useState('');
    const containerRef = useRef(null);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser?.userId || 'demo_user';

    const loadCategorys = async () => {
        try {
            const data = await fetchCategorys(userId);
            setCategoryInfo(data);
        } catch (err) {
            console.error("情報の取得に失敗しました", err);
        }
    };

    useEffect(() => {
        loadCategorys();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target) &&
                editId !== null
            ) {
                setEditId(null);
                setNewRow(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editId]);


    const handleEdit = (item) => {
        setEditId(item.id);
        setNewRow({
            categoryName: item.categoryName,
            description: item.description,
            personInCharge: item.updatedBy ?? currentUser.name
        });
    };

    const handleChange = (e) => {
        setNewRow({ ...newRow, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const categoryToSave = {
                ...newRow,
                userId,
                createdBy: currentUser.name,
                updatedBy: currentUser.name
            };
            if (editId === 'new') {
                await addCategory(categoryToSave);
            } else {
                categoryToSave.id = editId;
                await updateCategory(categoryToSave);
            }
            setEditId(null);
            setNewRow(null);
            loadCategorys();
        } catch (err) {
            console.error("保存失敗", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            loadCategorys();
        } catch (err) {
            console.error("削除失敗", err);
        }
    };

    const handleAdd = () => {
        setEditId('new');
        setNewRow({
            categoryName: '',
            description: '',
            personInCharge: currentUser?.name || '',
            status: 'active'
        });
    };

    const filteredProducts = categoryInfo.filter(p =>
        p.categoryName?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Helmet><title>品番追加</title></Helmet>

            <Box component="form" sx={formContainerSx}>
                <Box p={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <TextField
                            label="カテゴリー検索"
                            size="small"
                            sx={searchFieldSx}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="body2" color="text.secondary">
                                合計 {filteredProducts.length} 件
                            </Typography>
                            <Button variant="contained" onClick={handleAdd} startIcon={<Add />}>
                                カテゴリー追加
                            </Button>
                        </Box>
                    </Box>

                    <TableContainer component={Paper} sx={tableContainerSx} ref={containerRef}>
                        <Table size="small" sx={tableSx}>
                            <TableHead>
                                <TableRow sx={tableHeadRowSx}>
                                    {['カテゴリー名', '説明', '担当者', '登録日', '操作'].map((header) => (
                                        <TableCell key={header} align="center" sx={tableCellHeadSx}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {editId === 'new' && (
                                    <TableRow hover sx={tableRowHoverSx}>
                                        <TableCell align="center">
                                            <TextField name="categoryName" value={newRow.categoryName} onChange={handleChange} size="small" fullWidth />
                                        </TableCell>
                                        <TableCell align="center" sx={tableCellBodySx}>
                                            <TextField name="description" value={newRow.description} onChange={handleChange} size="small" fullWidth />
                                        </TableCell>
                                        <TableCell align="center" sx={tableCellBodySx}>
                                            <TextField name="personInCharge" value={newRow.personInCharge} disabled size="small" fullWidth sx={disabledTextFieldSx} />
                                        </TableCell>
                                        <TableCell align="center" sx={tableCellBodySx}>--</TableCell>
                                        <TableCell align="center" sx={tableCellBodySx}>
                                            <IconButton onClick={handleSave} color="primary"><Save /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {filteredProducts.map((row) => (
                                    <TableRow key={row.id} hover sx={tableRowHoverSx}>
                                        {editId === row.id ? (
                                            <>
                                                <TableCell align="center">
                                                    <TextField name="categoryName" value={newRow.categoryName} onChange={handleChange} size="small" fullWidth />
                                                </TableCell>
                                                <TableCell align="center" sx={tableCellBodySx}>
                                                    <TextField name="description" value={newRow.description} onChange={handleChange} size="small" fullWidth />
                                                </TableCell>
                                                <TableCell align="center" sx={tableCellBodySx}>
                                                    <TextField name="personInCharge" value={newRow.personInCharge} disabled size="small" fullWidth sx={disabledTextFieldSx} />
                                                </TableCell>
                                                <TableCell align="center" sx={tableCellBodySx}>
                                                    {row.updatedAt?.slice(0, 10) || '--'}
                                                </TableCell>
                                                <TableCell align="center" sx={tableCellBodySx}>
                                                    <IconButton onClick={handleSave} color="primary"><Save /></IconButton>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell align="center">
                                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                        <Inventory2Outlined fontSize="small" color="action" />
                                                        {row.categoryName}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center" sx={tableCellBodySx}>{row.description}</TableCell>
                                                <TableCell align="center" sx={tableCellBodySx}>{row.updatedBy}</TableCell>
                                                <TableCell align="center" sx={tableCellBodySx}>{row.updatedAt?.slice(0, 10) || '--'}</TableCell>
                                                <TableCell align="center" sx={tableCellBodySx}>
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
