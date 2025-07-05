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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from '@mui/material';
import {
    checkProductName,
    checkCategoryName,
    checkSpecName,
    checkPrice,
    checkPurchasePrice,
    checkDeliveryCompany,
    checkDeliveryMethod,
    checktockQty,
    checkStockAlert,
} from '../../../utils/validators';

import {
    modalBoxSx,
    confirmDialogPaperSx,
    confirmTitleSx,
    confirmContentTextSx,
    confirmActionsSx,
} from './EditProductModalStyles';

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

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        const num = Number(value);
        if (!isNaN(num) && num >= 0) {
            handleChange(e);
        }
    };

    const handleConfirm = () => {
        const validations = [
            checkProductName(formData.productId),
            checkCategoryName(formData.categoryId),
            checkSpecName(formData.specId),
            checkPrice(formData.price),
            checkPurchasePrice(formData.purchasePrice),
            checktockQty(formData.stockQty),
            checkStockAlert(formData.stockAlert),
            checkDeliveryCompany(formData.deliveryCompany),
            checkDeliveryMethod(formData.deliveryMethodId),
        ];

        const errors = validations.filter((v) => !v.valid);
        if (errors.length > 0) {
            const errorMessages = errors.map((e) => `・${e.message}`).join('\n');
            alert(`以下の項目に誤りがあります：\n\n${errorMessages}`);
            return;
        }

        try {
            handleSubmit();
            setConfirmOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={modalBoxSx}>
                    <Typography variant="h6" gutterBottom>
                        商品情報編集
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <FormLabel>品番</FormLabel>
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
                            <FormLabel>カテゴリー</FormLabel>
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
                            <FormLabel>仕様</FormLabel>
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
                            <FormLabel>価格</FormLabel>
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
                            <FormLabel>進貨価格</FormLabel>
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
                            <FormLabel>数量</FormLabel>
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
                            <FormLabel>在庫アラート</FormLabel>
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
                            <FormLabel>配送会社</FormLabel>
                            <FormControl fullWidth size="small">
                                <Select
                                    name="deliveryCompany"
                                    value={formData.deliveryCompany || ''}
                                    onChange={handleChange}
                                >
                                    {[...new Set(deliveryList.map((c) => c.deliveryCompany))].map(
                                        (companyName, index) => (
                                            <MenuItem key={index} value={companyName}>
                                                {companyName}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormLabel>配送方法</FormLabel>
                            <FormControl fullWidth size="small">
                                <Select
                                    name="deliveryMethodId"
                                    value={formData.deliveryMethodId || ''}
                                    onChange={handleChange}
                                    disabled={!formData.deliveryCompany}
                                >
                                    {deliveryList
                                        .filter(
                                            (method) =>
                                                method.deliveryCompany ===
                                                formData.deliveryCompany
                                        )
                                        .map((method) => (
                                            <MenuItem key={method.id} value={method.id}>
                                                {method.deliveryMethod}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}
                        >
                            <Button variant="contained" onClick={() => setConfirmOpen(true)}>
                                保存
                            </Button>
                            <Button variant="outlined" onClick={onClose}>
                                キャンセル
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            <Dialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                PaperProps={{ sx: confirmDialogPaperSx }}
            >
                <DialogTitle sx={confirmTitleSx}>確認</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={confirmContentTextSx}>
                        本当に変更を保存しますか？
                    </Typography>
                </DialogContent>
                <DialogActions sx={confirmActionsSx}>
                    <Button
                        onClick={() => setConfirmOpen(false)}
                        variant="outlined"
                        color="inherit"
                    >
                        いいえ
                    </Button>
                    <Button onClick={handleConfirm} variant="contained" color="primary" autoFocus>
                        はい
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditProductModal;
