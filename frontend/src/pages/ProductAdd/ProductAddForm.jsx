import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, Box, FormControl, FormLabel, Select, MenuItem, Typography } from '@mui/material';
import AddCategoryModal from './Modal/AddCategoryModal';
import AddSpecModal from './Modal/AddSpecModal';
import UploadArea from './UploadArea';
import { fetchCategories, fetchSpecs, submitProduct } from '../../services/productAddService';
import './ProductAddForm.css';

export default function ProductAddForm() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        spec: '',
        price: '',
        purchasePrice: '',
        quantity: '',
        image: null
    });

    const [categories, setCategories] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [specModalOpen, setSpecModalOpen] = useState(false);

    useEffect(() => { loadMasters(); }, []);

    const loadMasters = async () => {
        setCategories(await fetchCategories());
        setSpecs(await fetchSpecs());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // 限制价格、数量只能输入数字和小数点
        if (['price', 'purchasePrice', 'quantity'].includes(name)) {
            if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
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

        const requiredFields = ['productName', 'category', 'spec', 'price', 'purchasePrice', 'quantity'];

        // 空值检查
        for (let field of requiredFields) {
            if (!formData[field]) {
                alert("全ての項目を入力してください");
                return;
            }
        }

        // 数值必须大于 0 检查
        const numericFields = ['price', 'purchasePrice', 'quantity'];
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

    const resetForm = () => {
        setFormData({
            productName: '',
            category: '',
            spec: '',
            price: '',
            purchasePrice: '',
            quantity: '',
            image: null
        });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <FormLabel className="form-label">商品名</FormLabel>
                    <TextField fullWidth name="productName" value={formData.productName} onChange={handleChange}
                        variant="outlined" size="small" className="text-input" required />
                </Grid>

                <Grid item xs={4} className="select-with-button">
                    <Box sx={{ flexGrow: 1 }}>
                        <FormLabel className="form-label">カテゴリー</FormLabel>
                        <FormControl fullWidth required>
                            <Select name="category" value={formData.category} onChange={handleChange} size="small" className="select-input">
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
                            <Select name="spec" value={formData.spec} onChange={handleChange} size="small" className="select-input">
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
                    <TextField fullWidth name="quantity" type="text" value={formData.quantity} onChange={handleChange}
                        variant="outlined" size="small" className="text-input" required />
                </Grid>

                <Grid item xs={12}>
                    <UploadArea onFileSelect={handleFileSelect} />
                    {formData.image && (
                        <Typography variant="caption">已选文件: {formData.image.name}</Typography>
                    )}
                </Grid>

                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                    <Button type="submit" variant="contained" color="primary">登録</Button>
                    <Button type="button" variant="outlined" sx={{ ml: 2 }} onClick={resetForm}>取消</Button>
                </Grid>
            </Grid>

            <AddCategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} onAdd={loadMasters} />
            <AddSpecModal open={specModalOpen} onClose={() => setSpecModalOpen(false)} onAdd={loadMasters} />
        </Box>
    );
}
