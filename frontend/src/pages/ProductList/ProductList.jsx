import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Box,
    Button,
    Container,
    Typography,
    Select,
    MenuItem,
    FormControl,
    Grid,
} from '@mui/material';
import ProductListTable from './components/ProductList';
import {
    fetchProducts,
    fetchTotalCount,
    fetchProductInfo,
    fetchCategories,
    fetchSpecs,
    fetchDeliverys,
    updateProduct,
    deleteProduct,
} from '../../services/productListService';
import EditProductModal from './EditModal/EditProductModal';
import ConfirmDeleteDialog from './DeleteDialog/ConfirmDeleteDialog';
import {
    titleSx,
    containerSx,
    headerBoxSx,
    paginationContainerSx,
    selectBoxSx,
    paginationButtonsBoxSx,
    pageButtonSx,
    itemRangeSx
} from './ProductListStyles';

function ProductList() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('productName');
    const [orderDirection, setOrderDirection] = useState('asc');
    const [editingProduct, setEditingProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [productInfo, setProductInfo] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [specList, setSpecList] = useState([]);
    const [deliveryList, setDilivery] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [targetProduct, setTargetProduct] = useState(null);

    useEffect(() => {
        const loadProductInfo = async () => {
            const res = await fetchProductInfo(currentUser);
            const categories = await fetchCategories(currentUser);
            const specs = await fetchSpecs(currentUser);
            const deliverys = await fetchDeliverys(currentUser);
            setProductInfo(res);
            setCategoryList(categories);
            setSpecList(specs);
            setDilivery(deliverys);
        };
        loadProductInfo();
    }, []);

    useEffect(() => {
        const loadMasters = async () => {
            const categories = await fetchCategories(currentUser);
            const specs = await fetchSpecs(currentUser);
            setCategoryList(categories);
            setSpecList(specs);
        };
        loadMasters();
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    const handleEditSubmit = async () => {
        try {
            await updateProduct(editingProduct);
            alert('更新成功！');
            setModalOpen(false);
            loadData();
        } catch (error) {
            alert('更新に失敗しました。');
            console.error(error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(targetProduct);
            alert('削除に成功しました');
            setDeleteDialogOpen(false);
            loadData();
        } catch (error) {
            alert('削除に失敗しました');
            console.error(error);
        }
    };

    const onDeleteClick = (product) => {
        setTargetProduct(product);
        setDeleteDialogOpen(true);
    };

    useEffect(() => {
        loadData();
    }, [currentPage, itemsPerPage, orderBy, orderDirection]);

    const loadData = async () => {
        const offset = (currentPage - 1) * itemsPerPage;
        const data = await fetchProducts(currentUser, offset, itemsPerPage, orderBy, orderDirection);
        const count = await fetchTotalCount(currentUser);
        setProducts(data);
        setTotalItems(count);
    };

    const handleSort = (field) => {
        if (orderBy === field) {
            setOrderDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setOrderBy(field);
            setOrderDirection('asc');
        }
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <>
            <Helmet>
                <title>商品一覧</title>
            </Helmet>

            <Container maxWidth="lg" sx={containerSx}>
                <Box sx={headerBoxSx}>
                    <Typography variant="h5" fontWeight="bold" sx={titleSx}>商品リスト</Typography>
                    <Button size="small" variant="contained">+ Add New Product</Button>
                </Box>

                <ProductListTable
                    products={products}
                    orderBy={orderBy}
                    orderDirection={orderDirection}
                    handleSort={handleSort}
                    onEdit={handleEdit}
                    onDelete={onDeleteClick}
                />

                <Grid container sx={paginationContainerSx}>
                    {/* 左：表示件数 */}
                    <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography>表示件数：</Typography>
                        <FormControl size="small">
                            <Select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(parseInt(e.target.value));
                                    setCurrentPage(1);
                                }}
                                sx={selectBoxSx}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* 中：件数范围，真正居中 */}
                    <Grid item xs={4}>
                        <Typography align="center" sx={itemRangeSx}>
                            {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} 件中
                        </Typography>
                    </Grid>

                    {/* 右：分页按钮 */}
                    <Grid item xs={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', ...paginationButtonsBoxSx }}>
                            {[...Array(totalPages)].map((_, i) => (
                                <Button
                                    key={i}
                                    sx={pageButtonSx(currentPage === i + 1)}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                <EditProductModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    formData={editingProduct}
                    handleChange={handleFormChange}
                    handleSubmit={handleEditSubmit}
                    productInfo={productInfo}
                    categoryList={categoryList}
                    specList={specList}
                    deliveryList={deliveryList}
                />

                <ConfirmDeleteDialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    onConfirm={handleDeleteProduct}
                />
            </Container>
        </>
    );
}

export default ProductList;
