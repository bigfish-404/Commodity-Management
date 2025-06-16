import React, { useState, useEffect } from 'react';
import { TextField, Grid, Button, Box, FormControl, FormLabel, Select, MenuItem, Typography } from '@mui/material';
import AddCategoryModal from './AddCategoryModal';
import AddSpecModal from './AddSpecModal';
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (file) => {
        setFormData(prev => ({ ...prev, image: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                        variant="outlined" size="small" className="text-input" />
                </Grid>

                <Grid item xs={4} className="select-with-button">
                    <Box sx={{ flexGrow: 1 }}>
                        <FormLabel className="form-label">カテゴリー</FormLabel>
                        <FormControl fullWidth>
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
                        <FormControl fullWidth>
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
                    <TextField fullWidth name="price" type="number" value={formData.price} onChange={handleChange}
                        variant="outlined" size="small" className="text-input" />
                </Grid>

                <Grid item xs={4}>
                    <FormLabel className="form-label">進貨価格</FormLabel>
                    <TextField fullWidth name="purchasePrice" type="number" value={formData.purchasePrice} onChange={handleChange}
                        variant="outlined" size="small" className="text-input" />
                </Grid>

                <Grid item xs={4}>
                    <FormLabel className="form-label">数量</FormLabel>
                    <TextField fullWidth name="quantity" type="number" value={formData.quantity} onChange={handleChange}
                        variant="outlined" size="small" className="text-input" />
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
