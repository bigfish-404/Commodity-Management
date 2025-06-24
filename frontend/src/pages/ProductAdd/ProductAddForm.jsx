import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, Box, FormControl, FormLabel, Select, MenuItem, Typography } from '@mui/material';
import AddProductModal from './Modal/AddProductModal';
import AddCategoryModal from './Modal/AddCategoryModal';
import AddSpecModal from './Modal/AddSpecModal';
import UploadArea from './UploadArea';
import { fetchProductInfo, fetchCategories, fetchDeliverys, fetchSpecs, submitProduct } from '../../services/productAddService';
import './ProductAddForm.css';

export default function ProductAddForm() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const initialFormData = {
        productId: '',
        categoryId: '',
        specId: '',
        price: '',
        purchasePrice: '',
        stockQty: '',
        stockAlert: '',
        deliveryCompany: '',
        deliveryCompanyMethodId: '',
        image: null
    };

    const [formData, setFormData] = useState(initialFormData);
    const [categories, setCategories] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [specModalOpen, setSpecModalOpen] = useState(false);
    const [productModalOpen, setProductModalOpen] = useState(false);

    useEffect(() => { loadMasters(); }, []);

    const loadMasters = async () => {
        setCategories(await fetchCategories(currentUser));
        setSpecs(await fetchSpecs(currentUser));
        setDeliveryOptions(await fetchDeliverys(currentUser));
        setProductInfo(await fetchProductInfo(currentUser)); // 假设你已经实现 fetchProducts
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["price", "purchasePrice"].includes(name)) {
            if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else if (name === 'stockQty') {
            if (value === '' || /^\d+$/.test(value)) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileSelect = (file) => {
        setFormData(prev => ({ ...prev, image: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['productName', 'categoryId', 'specId', 'price', 'purchasePrice', 'stockQty'];

        for (let field of requiredFields) {
            if (!formData[field]) {
                alert("全ての項目を入力してください");
                return;
            }
        }

        const numericFields = ['price', 'purchasePrice', 'stockQty'];
        for (let field of numericFields) {
            const value = parseFloat(formData[field]);
            if (isNaN(value) || value <= 0) {
                alert(`${field} は0より大きい数値を入力してください`);
                return;
            }
        }

        try {
            await submitProduct(formData, currentUser);
            alert("商品登録成功");
            resetForm();
        } catch (err) {
            console.error(err);
            alert("登録失敗");
        }
    };

    const handleCompanyChange = (e) => {
        const company = e.target.value;
        setFormData(prev => ({ ...prev, deliveryCompany: company, deliveryMethod: '' }));
    };

    const handleMethodChange = (e) => {
        const id = e.target.value;
        setFormData(prev => ({ ...prev, deliveryCompanyMethodId: id }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid container spacing={3}>
                <Grid item xs={4} className="select-with-button">
                    <Box sx={{ flexGrow: 1 }}>
                        <FormLabel className="form-label">品番</FormLabel>
                        <FormControl fullWidth required>
                            <Select
                                name="productName"
                                value={formData.productId}
                                onChange={handleChange}
                                size="small"
                                className="select-input"
                            >
                                {(productInfo || []).map((product) => (
                                    <MenuItem key={product.id} value={product.productName}>
                                        {product.productName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        className="add-button"
                        onClick={() => setProductModalOpen(true)}
                    >追加</Button>
                </Grid>

                <Grid item xs={4} className="select-with-button">
                    <Box sx={{ flexGrow: 1 }}>
                        <FormLabel className="form-label">カテゴリー</FormLabel>
                        <FormControl fullWidth required>
                            <Select name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                size="small"
                                className="select-input">
                                {categories.map(cat => (
                                    <MenuItem key={cat.id} value={cat.id}>{cat.categoryName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button variant="outlined" color="primary" size="small" className="add-button"
                        onClick={() => setCategoryModalOpen(true)}>追加</Button>
                </Grid>

                <Grid item xs={4} className="select-with-button">
                    <Box sx={{ flexGrow: 1 }}>
                        <FormLabel className="form-label">規格/仕様</FormLabel>
                        <FormControl fullWidth required>
                            <Select name="specId"
                                value={formData.specId}
                                onChange={handleChange}
                                size="small"
                                className="select-input">
                                {specs.map(spec => (
                                    <MenuItem key={spec.id} value={spec.id}>{spec.specName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button variant="outlined" color="primary" size="small" className="add-button"
                        onClick={() => setSpecModalOpen(true)}>追加</Button>
                </Grid>

                <Grid item xs={4}>
                    <FormLabel className="form-label">価格</FormLabel>
                    <TextField fullWidth name="price" type="text" value={formData.price} onChange={handleChange}
                        variant="outlined" size="small" className="text-input" required />
                </Grid>

                <Grid item xs={4}>
                    <FormLabel className="form-label">進貨価格</FormLabel>
                    <TextField fullWidth name="purchasePrice" type="text" value={formData.purchasePrice} onChange={handleChange}
                        variant="outlined" size="small" className="text-input" required />
                </Grid>

                <Grid item xs={4}>
                    <FormLabel className="form-label">数量</FormLabel>
                    <TextField fullWidth name="stockQty" type="text" value={formData.stockQty} onChange={handleChange}
                        variant="outlined" size="small" className="text-input" required />
                </Grid>

                <Grid item xs={4}>
                    <FormLabel className="form-label">在庫アラート</FormLabel>
                    <TextField fullWidth name="stockAlert" type="number" value={formData.stockAlert} onChange={handleChange}
                        variant="outlined" size="small" className="text-input" required />
                </Grid>

                <Grid item xs={4}>
                    <FormLabel className="form-label">配送会社</FormLabel>
                    <FormControl fullWidth required>
                        <Select
                            value={formData.deliveryCompany}
                            onChange={handleCompanyChange}
                            size="small"
                            className="select-input"
                        >
                            {[...new Set(deliveryOptions.map(opt => opt.deliveryCompany))].map((company, index) => (
                                <MenuItem key={index} value={company}>{company}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormLabel className="form-label">配送方法</FormLabel>
                    <FormControl fullWidth required>
                        <Select
                            value={formData.deliveryCompanyMethodId}
                            onChange={handleMethodChange}
                            size="small"
                            className="select-input"
                            disabled={!formData.deliveryCompany}
                        >
                            {deliveryOptions
                                .filter(opt => opt.deliveryCompany === formData.deliveryCompany)
                                .map(opt => (
                                    <MenuItem key={opt.id} value={opt.id}>
                                        {opt.deliveryMethod}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <UploadArea onFileSelect={handleFileSelect} />
                    {formData.image && (
                        <Typography variant="caption">已选文件: {formData.image.name}</Typography>
                    )}
                </Grid>

                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    <Button type="submit" variant="contained" color="primary">登録</Button>
                    <Button type="button" variant="outlined" sx={{ ml: 2 }} onClick={resetForm}>キャンセル</Button>
                </Grid>
            </Grid>

            <AddProductModal open={productModalOpen} onClose={() => setProductModalOpen(false)} onAdd={loadMasters} />
            <AddCategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} onAdd={loadMasters} />
            <AddSpecModal open={specModalOpen} onClose={() => setSpecModalOpen(false)} onAdd={loadMasters} />
        </Box>
    );
}