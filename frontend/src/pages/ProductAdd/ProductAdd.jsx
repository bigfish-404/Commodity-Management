import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    TextField,
    Grid,
    Button,
    Box,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    Typography,
    Stack
} from '@mui/material';

// 弹窗组件，用于追加新商品/分类/规格/配送方式
import AddProductModal from './Modal/AddProductModal';
import AddCategoryModal from './Modal/AddCategoryModal';
import AddSpecModal from './Modal/AddSpecModal';
import AddDeliveryMethodModal from './Modal/AddDeliveryMethodModal';

// 调用后端 API 的服务方法
import {
    fetchProductInfo,
    fetchCategories,
    fetchDeliverys,
    fetchSpecs,
    submitProduct
} from '../../services/productAddService';

// 输入校验函数
import {
    checkProductName,
    checkCategoryName,
    checkSpecName,
    checkPrice,
    checkPurchasePrice,
    checkDeliveryCompany,
    checkDeliveryMethod,
    checktockQty,
    checkStockAlert
} from '../../utils/validators';

// 样式设定
import {
    titleSx,
    formLabelSx,
    formContainerSx,
    buttonBoxSx
} from './productAddStyles';

// 通用输入处理函数
import {
    handleFormChange
} from '../../utils/handleInputChange';

function ProductAdd() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // 初始状态定义
    const initialFormData = {
        productId: '',
        categoryId: '',
        specId: '',
        price: '',
        purchasePrice: '',
        stockQty: '',
        stockAlert: '',
        deliveryCompany: '',
        deliveryMethodId: '',
    };

    // 表单数据、下拉选项、弹窗控制状态
    const [formData, setFormData] = useState(initialFormData);

    const [productInfo, setProductInfo] = useState([]);
    const [categories, setCategories] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [deliveryOptions, setDeliveryOptions] = useState([]);

    const [productModalOpen, setProductModalOpen] = useState(false);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [specModalOpen, setSpecModalOpen] = useState(false);
    const [addMethodModalOpen, setAddMethodModalOpen] = useState(false);

    // 初期データ取得（マスター取得）
    useEffect(() => { loadMasters(); }, []);

    const loadMasters = async () => {
        setProductInfo(await fetchProductInfo(currentUser));
        setCategories(await fetchCategories(currentUser));
        setSpecs(await fetchSpecs(currentUser));
        setDeliveryOptions(await fetchDeliverys(currentUser));
    };

    // 入力値の変更を処理
    const handleChange = (e) => {
        handleFormChange(e, setFormData);
    };

    // フォーム送信時の処理（バリデーション + 登録API）
    const handleSubmit = async (e) => {
        e.preventDefault();

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

        const errors = validations.filter(v => !v.valid);
        if (errors.length > 0) {
            const errorMessages = errors.map(e => `・${e.message}`).join('\n');
            alert(`以下の項目に誤りがあります：\n\n${errorMessages}`);
            return;
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

    // 配送会社选择时清空配送方法
    const handleCompanyChange = (e) => {
        const company = e.target.value;
        setFormData(prev => ({ ...prev, deliveryCompany: company, deliveryMethodId: '' }));
    };

    // 配送方法更新
    const handleMethodChange = (e) => {
        const id = e.target.value;
        setFormData(prev => ({ ...prev, deliveryMethodId: id }));
    };

    // フォームを初期状態にリセット
    const resetForm = () => {
        setFormData(initialFormData);
    };

    return (
        <>
            <Helmet>
                <title>商品追加</title>
            </Helmet>
            <Box component="form" onSubmit={handleSubmit} sx={formContainerSx}>
                <Typography variant="h5" fontWeight="bold" sx={titleSx}>
                    商品追加
                </Typography>
                <Grid container spacing={3}>
                    {/* 品番セレクト */}
                    <Grid item xs={4}>
                        <FormLabel sx={formLabelSx}>品番</FormLabel>
                        <Stack direction="row" spacing={1}>
                            <FormControl fullWidth>
                                <Select name="productId" value={formData.productId} onChange={handleChange} size="small">
                                    {productInfo.map((p) => (
                                        <MenuItem key={p.id} value={p.productId}>{p.productName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="outlined" size="small" onClick={() => setProductModalOpen(true)}>追加</Button>
                        </Stack>
                    </Grid>

                    {/* カテゴリーセレクト */}
                    <Grid item xs={4}>
                        <FormLabel sx={formLabelSx}>カテゴリー</FormLabel>
                        <Stack direction="row" spacing={1}>
                            <FormControl fullWidth>
                                <Select name="categoryId" value={formData.categoryId} onChange={handleChange} size="small">
                                    {categories.map((cat) => (
                                        <MenuItem key={cat.id} value={cat.categoryId}>{cat.categoryName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="outlined" size="small" onClick={() => setCategoryModalOpen(true)}>追加</Button>
                        </Stack>
                    </Grid>

                    {/* 規格セレクト */}
                    <Grid item xs={4}>
                        <FormLabel sx={formLabelSx}>規格/仕様</FormLabel>
                        <Stack direction="row" spacing={1}>
                            <FormControl fullWidth>
                                <Select name="specId" value={formData.specId} onChange={handleChange} size="small">
                                    {specs.map((spec) => (
                                        <MenuItem key={spec.id} value={spec.specId}>{spec.specName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="outlined" size="small" onClick={() => setSpecModalOpen(true)}>追加</Button>
                        </Stack>
                    </Grid>

                    {/* 数値入力欄（価格、進貨価格、数量、在庫アラート） */}
                    <Grid item xs={4}><FormLabel sx={formLabelSx}>価格</FormLabel><TextField fullWidth name="price" type="number" value={formData.price} onChange={handleChange} size="small" required /></Grid>
                    <Grid item xs={4}><FormLabel sx={formLabelSx}>進貨価格</FormLabel><TextField fullWidth name="purchasePrice" type="number" value={formData.purchasePrice} onChange={handleChange} size="small" required /></Grid>
                    <Grid item xs={4}><FormLabel sx={formLabelSx}>数量</FormLabel><TextField fullWidth name="stockQty" type="number" value={formData.stockQty} onChange={handleChange} size="small" required /></Grid>
                    <Grid item xs={4}><FormLabel sx={formLabelSx}>在庫アラート</FormLabel><TextField fullWidth name="stockAlert" type="number" value={formData.stockAlert} onChange={handleChange} size="small" required /></Grid>

                    {/* 配送会社選択 */}
                    <Grid item xs={4}>
                        <FormLabel sx={formLabelSx}>配送会社</FormLabel>
                        <Stack direction="row" spacing={1}>
                            <FormControl fullWidth>
                                <Select value={formData.deliveryCompany} onChange={handleCompanyChange} size="small">
                                    {[...new Set(deliveryOptions.map(opt => opt.deliveryCompany))].map((company, i) => (
                                        <MenuItem key={i} value={company}>{company}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="outlined" size="small" onClick={() => setAddMethodModalOpen(true)}>追加</Button>
                        </Stack>
                    </Grid>

                    {/* 配送方法選択 */}
                    <Grid item xs={4}>
                        <FormLabel sx={formLabelSx}>配送方法</FormLabel>
                        <FormControl fullWidth>
                            <Select value={formData.deliveryMethodId} onChange={handleMethodChange} size="small" disabled={!formData.deliveryCompany}>
                                {deliveryOptions.filter(opt => opt.deliveryCompany === formData.deliveryCompany).map(opt => (
                                    <MenuItem key={opt.id} value={opt.id}>{opt.deliveryMethod}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* 登録・取消ボタン */}
                    <Grid item xs={12}>
                        <Box sx={buttonBoxSx}>
                            <Button type="button" variant="outlined" onClick={resetForm}>キャンセル</Button>
                            <Button type="submit" variant="contained">登録</Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* 各追加モーダル */}
                <AddProductModal open={productModalOpen} onClose={() => setProductModalOpen(false)} onAdd={loadMasters} />
                <AddCategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} onAdd={loadMasters} />
                <AddSpecModal open={specModalOpen} onClose={() => setSpecModalOpen(false)} onAdd={loadMasters} />
                <AddDeliveryMethodModal open={addMethodModalOpen} onClose={() => setAddMethodModalOpen(false)} onAdd={loadMasters} selectedCompany={formData.deliveryCompany} />
            </Box>
        </>
    );
}

export default ProductAdd;