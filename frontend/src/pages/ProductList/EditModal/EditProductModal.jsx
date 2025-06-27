import React, { useState } from 'react';
import {
    Modal,
    Box,
    TextField,
    Select,
    FormLabel,
    FormControl,
    MenuItem,
    Button,
    Grid,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import './EditProductModal.css';

function EditProductModal({
    open,
    onClose,
    formData = {},
    handleChange,
    handleSubmit,
    productInfo = [],
    categoryList = [],
    specList = [],
    deliveryList = [],
}) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    if (!open) return null;

    // 限制数字输入 ≥ 0
    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        const num = Number(value);
        if (!isNaN(num) && num >= 0) {
            handleChange(e);
        }
    };

    const handleConfirm = () => {
        handleSubmit();
        setConfirmOpen(false);
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box className="edit-product-modal">
                    <h2>商品情報編集</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormLabel className="form-label">品番</FormLabel>
                            <FormControl fullWidth size="small">
                                <Select
                                    name="productId"
                                    value={formData.productId || ''}
                                    onChange={handleChange}
                                >
                                    {productInfo.map((product) => (
                                        <MenuItem key={product.id} value={product.productId}>
                                            {product.productName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormLabel className="form-label">カテゴリー</FormLabel>
                            <FormControl fullWidth size="small">
                                <Select
                                    name="categoryName"
                                    value={formData.categoryName || ''}
                                    onChange={handleChange}
                                >
                                    {categoryList.map((cat) => (
                                        <MenuItem key={cat.categoryId} value={cat.categoryName}>
                                            {cat.categoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormLabel className="form-label">仕様</FormLabel>
                            <FormControl fullWidth size="small">
                                <Select
                                    name="specName"
                                    value={formData.specName || ''}
                                    onChange={handleChange}
                                >
                                    {specList.map((spec) => (
                                        <MenuItem key={spec.specId} value={spec.specName}>
                                            {spec.specName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormLabel className="form-label">価格</FormLabel>
                            <TextField
                                name="price"
                                size="small"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={formData.price || ''}
                                onChange={handleNumberChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FormLabel className="form-label">進貨価格</FormLabel>
                            <TextField
                                name="purchasePrice"
                                size="small"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={formData.purchasePrice || ''}
                                onChange={handleNumberChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FormLabel className="form-label">数量</FormLabel>
                            <TextField
                                name="stockQty"
                                size="small"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={formData.stockQty || ''}
                                onChange={handleNumberChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FormLabel className="form-label">在庫アラート</FormLabel>
                            <TextField
                                name="stockAlert"
                                size="small"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={formData.stockAlert || ''}
                                onChange={handleNumberChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FormLabel className="form-label">配送会社</FormLabel>
                            <FormControl fullWidth size="small">
                                <Select
                                    name="deliveryCompany"
                                    value={formData.deliveryCompany || ''}
                                    onChange={handleChange}
                                >
                                    {[...new Set(deliveryList.map(company => company.deliveryCompany))].map((companyName, index) => (
                                        <MenuItem key={index} value={companyName}>
                                            {companyName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormLabel className="form-label">配送方法</FormLabel>
                            <FormControl fullWidth size="small">
                                <Select
                                    name="deliveryMethodId"
                                    value={formData.deliveryMethodId || ''}
                                    onChange={handleChange}
                                    disabled={!formData.deliveryCompany}
                                >
                                    {deliveryList
                                        .filter(method => method.deliveryCompany === formData.deliveryCompany)
                                        .map(method => (
                                            <MenuItem key={method.id} value={method.id}>
                                                {method.deliveryMethod}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} className="action-buttons">
                            <Button variant="contained" onClick={() => setConfirmOpen(true)}>保存</Button>
                            <Button variant="outlined" onClick={onClose} style={{ marginLeft: 10 }}>キャンセル</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} className="custom-dialog">
                <DialogTitle>確認</DialogTitle>
                <DialogContent>本当に変更を保存しますか？</DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="inherit">いいえ</Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>はい</Button>
                </DialogActions>
            </Dialog>
        </>


    );
}

export default EditProductModal;
