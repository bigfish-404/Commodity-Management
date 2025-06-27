import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ProductListTable from './components/ProductListTable';
import { fetchProducts, fetchTotalCount, fetchProductInfo, fetchCategories, fetchSpecs, fetchDeliverys, updateProduct, deleteProduct } from '../../services/productListService';
import EditProductModal from './EditModal/EditProductModal';
import ConfirmDeleteDialog from './DeleteDialog/ConfirmDeleteDialog';

function ProductList() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [products, setProducts] = useState([]);//定义商品的状态，默认是空数组
    const [totalItems, setTotalItems] = useState(0);//定义商品总数，默认是0
    const [currentPage, setCurrentPage] = useState(1);//定义当前页码，默认是第一页
    const [itemsPerPage, setItemsPerPage] = useState(10);//定义每页显示多少条数据，默认是10页
    const [orderBy, setOrderBy] = useState("productName");//定义默认排序的字段，默认是productName
    const [orderDirection, setOrderDirection] = useState("asc");//定义排序方向，默认升序

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
            alert("更新成功！");
            setModalOpen(false);
            loadData();
        } catch (error) {
            alert("更新に失敗しました。");
            console.error(error);
        }
    };


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(targetProduct); // 👈 假设你定义了 deleteProduct(product)
            alert("削除に成功しました");
            setDeleteDialogOpen(false);
            loadData();
        } catch (error) {
            alert("削除に失敗しました");
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
    //这个是一个副函数，当[currentPage, itemsPerPage, orderBy, orderDirection]里面的任一个状态发生变化，都会重新加载loadData函数

    //定义一个异步函数，用来取数据
    const loadData = async () => {
        const offset = (currentPage - 1) * itemsPerPage;//计算偏移量
        const data = await fetchProducts(currentUser, offset, itemsPerPage, orderBy, orderDirection);
        const count = await fetchTotalCount(currentUser);
        setProducts(data);
        setTotalItems(count);
    };

    //定义点击排序表头的函数，被接收点击的字段名field
    const handleSort = (field) => {
        //判断当前排序字段和点击的字段是否是同一个
        if (orderBy === field) {
            //如果是同一个字段，切换排序顺序
            setOrderDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            //如果不是，更改新的排序字段，排序方向默认升序
            setOrderBy(field);
            setOrderDirection("asc");
        }
    };


    //计算总页数，Math.ceil向上取整
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <>
            <Helmet>
                <title>
                    商品一覧
                </title>
            </Helmet>

            <div className="content">
                <div className="product-header">
                    <h2>商品リスト</h2>
                    <button className="add-product-btn">+ Add New Product</button>
                </div>

                {/* 把参数传进去，让子组件渲染 */}
                <ProductListTable
                    products={products}
                    orderBy={orderBy}
                    orderDirection={orderDirection}
                    handleSort={handleSort}
                    onEdit={handleEdit}
                    onDelete={onDeleteClick}
                />

                <div className="pagination-container">
                    <div className="show-per-page">
                        表示件数：
                        {/* select绑定itemsPerpage  每一次切换的时候建字符串转换为数字，然后在跳回第一页*/}
                        <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    {/* 显示当前显示的是第几条数据 */}
                    <div className="pagination-info">
                        {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} 件中
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
            </div>
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


        </>
    );
}

export default ProductList;
