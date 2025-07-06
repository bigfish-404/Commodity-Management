import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    IconButton,
    Grid,
    FormControl,
    Container,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    fetchAllsalesHistoryByUserId,
    deleteProfit,
} from '../../services/salesHistoryService';

import {
    getCellStyle,
    getRowStyle,
    paginationContainerSx,
    pageButtonSx,
    itemRangeSx,
    selectBoxSx,
    containerSx,
    headerBoxSx,
} from './salesHistoryStyles';

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
            const deleteTargetData = {
                id: deleteTarget.id,
                userId: deleteTarget.userId,
                productId: deleteTarget.productId,
                categoryId: deleteTarget.categoryId,
                specId: deleteTarget.specId,
                salesPerson: deleteTarget.salesPerson,
                updatedBy: currentUser.name || currentUser.userId,
            };
            await deleteProfit(deleteTargetData);
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

            <Container maxWidth="lg" sx={containerSx}>
                <Box>
                    <Box sx={headerBoxSx}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            販売履歴
                        </Typography>
                    </Box>

                    {loading ? (
                        <Typography sx={{ mt: 4 }}>読み込み中...</Typography>
                    ) : error ? (
                        <Typography sx={{ mt: 4 }} color="error">
                            データ取得中にエラーが発生しました。
                        </Typography>
                    ) : (
                        <>
                            <TableContainer component={Paper} sx={{ mt: 3, mb: 4 }}>
                                <Table size="small" sx={{ borderCollapse: 'collapse' }}>
                                    <TableHead>
                                        <TableRow>
                                            {[
                                                '商品名',
                                                'カテゴリー',
                                                '仕様',
                                                '数量',
                                                '単価',
                                                '利益',
                                                '販売日',
                                                'チャネル',
                                                '担当者',
                                                '操作',
                                            ].map((header, i) => (
                                                <TableCell
                                                    key={i}
                                                    sx={{
                                                        ...getCellStyle(),
                                                        fontWeight: 'bold',
                                                        borderRight: i === 9 ? 'none' : undefined,
                                                    }}
                                                >
                                                    {header}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={10} align="center" sx={getCellStyle()}>
                                                    データがありません。
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            products.map((p, index) => (
                                                <TableRow key={p.id} sx={getRowStyle(index)}>
                                                    <TableCell sx={getCellStyle()}>{p.productName}</TableCell>
                                                    <TableCell sx={getCellStyle()}>{p.categoryName}</TableCell>
                                                    <TableCell sx={getCellStyle()}>{p.specName}</TableCell>
                                                    <TableCell sx={getCellStyle()}>{p.quantity}</TableCell>
                                                    <TableCell sx={getCellStyle()}>{p.salesPrice}</TableCell>
                                                    <TableCell sx={getCellStyle()}>{p.profit}</TableCell>
                                                    <TableCell sx={getCellStyle()}>{p.salesDate?.slice(0, 10)}</TableCell>
                                                    <TableCell sx={getCellStyle()}>{p.channelName}</TableCell>
                                                    <TableCell sx={getCellStyle()}>{p.salesPerson}</TableCell>
                                                    <TableCell sx={{ ...getCellStyle(), borderRight: 'none' }}>
                                                        <IconButton onClick={() => handleOpenModal(p)} size="small">
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton onClick={() => handleOpenDelete(p)} size="small">
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Grid container sx={paginationContainerSx}>
                                {/* 左侧：件数选择 */}
                                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography>表示件数：</Typography>
                                    <FormControl size="small">
                                        <Select
                                            value={itemsPerPage}
                                            onChange={handleItemsPerPageChange}
                                            sx={selectBoxSx}
                                        >
                                            {[5, 10, 20].map((num) => (
                                                <MenuItem key={num} value={num}>
                                                    {num}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* 中间：当前显示件数范围 */}
                                <Grid item xs={4}>
                                    <Typography align="center" sx={itemRangeSx}>
                                        {(currentPage - 1) * itemsPerPage + 1} -{' '}
                                        {Math.min(currentPage * itemsPerPage, fullData.length)} 件 /{' '}
                                        {fullData.length} 件中
                                    </Typography>
                                </Grid>

                                {/* 右侧：分页按钮 */}
                                <Grid item xs={4}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {[...Array(totalPages)].map((_, i) => (
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
                        </>
                    )}
                </Box>
            </Container>

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
