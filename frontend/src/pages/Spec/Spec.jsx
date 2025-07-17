// src/pages/SpecInfo.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, Table, TableHead, TableBody, TableRow, TableCell,
    TableContainer, Paper, IconButton, TextField, Button
} from '@mui/material';
import { Delete, Edit, Add, Save } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import {
    formContainerSx,
    searchFieldSx,
    tableContainerSx,
    tableSx,
    tableHeadRowSx,
    tableCellHeadSx,
    tableRowHoverSx,
} from './SpecStyles';

import {
    fetchSpecs,
    addSpec,
    updateSpec,
    deleteSpec
} from '../../services/specService';

function SpecInfo() {
    const [specList, setSpecList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newRow, setNewRow] = useState(null);
    const [search, setSearch] = useState('');
    const containerRef = useRef(null);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser?.userId || 'demo_user';

    const loadSpecs = async () => {
        try {
            const data = await fetchSpecs(userId);
            setSpecList(data);
        } catch (err) {
            console.error("SPECの取得に失敗しました", err);
        }
    };

    useEffect(() => {
        loadSpecs();
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
            specId: item.specId,
            specName: item.specName,
            description: item.description
        });
    };

    const handleChange = (e) => {
        setNewRow({ ...newRow, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const specToSave = {
                ...newRow,
                userId,
                createdBy: currentUser.name,
                updatedBy: currentUser.name
            };
            if (editId === 'new') {
                await addSpec(specToSave);
            } else {
                specToSave.id = editId;
                await updateSpec(specToSave);
            }
            setEditId(null);
            setNewRow(null);
            loadSpecs();
        } catch (err) {
            console.error("保存失敗", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteSpec(id);
            loadSpecs();
        } catch (err) {
            console.error("削除失敗", err);
        }
    };

    const handleAdd = () => {
        setEditId('new');
        setNewRow({
            specId: '',
            specName: '',
            description: ''
        });
    };

    const filteredSpecs = specList.filter(p =>
        p.specName?.toLowerCase().includes(search.toLowerCase())
    );

    const borderCell = { borderRight: '1px solid #e0e0e0' };

    return (
        <>
            <Helmet><title>仕様/規格</title></Helmet>

            <Box component="form" sx={formContainerSx}>
                <Box p={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <TextField
                            label="仕様/規格検索"
                            size="small"
                            sx={searchFieldSx}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="body2" color="text.secondary">
                                合計 {filteredSpecs.length} 件
                            </Typography>
                            <Button variant="contained" onClick={handleAdd} startIcon={<Add />}>
                                仕様/規格追加
                            </Button>
                        </Box>
                    </Box>

                    <TableContainer component={Paper} sx={tableContainerSx} ref={containerRef}>
                        <Table size="small" sx={tableSx}>
                            <TableHead>
                                <TableRow sx={tableHeadRowSx}>
                                    {['仕様/規格名', '説明', '更新者', '更新日', '操作'].map((header) => (
                                        <TableCell key={header} align="center" sx={{ ...tableCellHeadSx, ...borderCell }}>
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {editId === 'new' && (
                                    <TableRow hover sx={tableRowHoverSx}>
                                        <TableCell align="center" sx={borderCell}>
                                            <TextField name="specName" value={newRow.specName} onChange={handleChange} size="small" fullWidth />
                                        </TableCell>
                                        <TableCell align="center" sx={borderCell}>
                                            <TextField name="description" value={newRow.description} onChange={handleChange} size="small" fullWidth />
                                        </TableCell>
                                        <TableCell align="center" sx={borderCell}>{currentUser.name}</TableCell>
                                        <TableCell align="center" sx={borderCell}>--</TableCell>
                                        <TableCell align="center" sx={borderCell}>
                                            <IconButton onClick={handleSave} color="primary"><Save /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {filteredSpecs.map((row) => (
                                    <TableRow key={row.id} hover sx={tableRowHoverSx}>
                                        {editId === row.id ? (
                                            <>
                                                <TableCell align="center" sx={borderCell}>
                                                    <TextField name="specName" value={newRow.specName} onChange={handleChange} size="small" fullWidth />
                                                </TableCell>
                                                <TableCell align="center" sx={borderCell}>
                                                    <TextField name="description" value={newRow.description} onChange={handleChange} size="small" fullWidth />
                                                </TableCell>
                                                <TableCell align="center" sx={borderCell}>{currentUser.name}</TableCell>
                                                <TableCell align="center" sx={borderCell}>{row.updatedAt?.slice(0, 10) || '--'}</TableCell>
                                                <TableCell align="center" sx={borderCell}>
                                                    <IconButton onClick={handleSave} color="primary"><Save /></IconButton>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell align="center" sx={borderCell}>{row.specName}</TableCell>
                                                <TableCell align="center" sx={borderCell}>{row.description}</TableCell>
                                                <TableCell align="center" sx={borderCell}>{row.updatedBy}</TableCell>
                                                <TableCell align="center" sx={borderCell}>{row.updatedAt?.slice(0, 10) || '--'}</TableCell>
                                                <TableCell align="center" sx={borderCell}>
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

export default SpecInfo;