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

// 商品表格组件
import ProductListTable from './components/ProductList';

// 后端 API 方法
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

// 编辑弹窗 & 删除弹窗
import EditProductModal from './EditModal/EditProductModal';
import ConfirmDeleteDialog from './DeleteDialog/ConfirmDeleteDialog';

// 样式对象（抽离到文件中）
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
    // 当前用户信息（从 localStorage 中获取）
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // 商品数据 & master 数据
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [productInfo, setProductInfo] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [specList, setSpecList] = useState([]);
    const [deliveryList, setDilivery] = useState([]);

    // 分页与排序
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('productName');
    const [orderDirection, setOrderDirection] = useState('asc');

    // 编辑弹窗控制
    const [editingProduct, setEditingProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // 删除弹窗控制
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [targetProduct, setTargetProduct] = useState(null);

    // 页面初次加载时，加载 master 数据（品番、分类、规格、配送方式）
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

    // 编辑按钮点击：打开弹窗
    const handleEdit = (product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    // 编辑提交：调用 update 接口，关闭弹窗并刷新数据
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

    // 编辑表单字段变化
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct((prev) => ({ ...prev, [name]: value }));
    };

    // 删除确认后调用 delete 接口
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

    // 删除按钮点击：弹出确认弹窗
    const onDeleteClick = (product) => {
        setTargetProduct(product);
        setDeleteDialogOpen(true);
    };

    // 分页/排序变化时，自动刷新数据
    useEffect(() => {
        loadData();
    }, [currentPage, itemsPerPage, orderBy, orderDirection]);

    // 加载商品数据（分页 + 排序）
    const loadData = async () => {
        const offset = (currentPage - 1) * itemsPerPage;
        const data = await fetchProducts(currentUser, offset, itemsPerPage, orderBy, orderDirection);
        const count = await fetchTotalCount(currentUser);
        setProducts(data);
        setTotalItems(count);
    };

    // 排序逻辑（点击表头）
    const handleSort = (field) => {
        if (orderBy === field) {
            setOrderDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setOrderBy(field);
            setOrderDirection('asc');
        }
    };

    // 总页数
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <>
            {/* 页面标题 */}
            <Helmet>
                <title>商品一覧</title>
            </Helmet>

            {/* 页面主容器 */}
            <Container maxWidth="lg" sx={containerSx}>

                {/* 顶部标题与添加按钮 */}
                <Box sx={headerBoxSx}>
                    <Typography variant="h5" fontWeight="bold" sx={titleSx}>商品リスト</Typography>
                    <Button size="small" variant="contained">+ Add New Product</Button>
                </Box>

                {/* 商品表格组件 */}
                <ProductListTable
                    products={products}
                    orderBy={orderBy}
                    orderDirection={orderDirection}
                    handleSort={handleSort}
                    onEdit={handleEdit}
                    onDelete={onDeleteClick}
                />

                {/* 分页控制栏 */}
                <Grid container sx={paginationContainerSx}>
                    {/* 左侧：件数选择 */}
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

                    {/* 中间：当前显示件数范围 */}
                    <Grid item xs={4}>
                        <Typography align="center" sx={itemRangeSx}>
                            {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} 件中
                        </Typography>
                    </Grid>

                    {/* 右侧：分页按钮 */}
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

                {/* 编辑商品弹窗 */}
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

                {/* 删除确认弹窗 */}
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
