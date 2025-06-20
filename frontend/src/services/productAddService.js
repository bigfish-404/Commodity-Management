import axios from 'axios';

// 取得所有分类
export const fetchCategories = async () => {
    const response = await axios.get('/api/getAllCategories');
    return response.data;
};

// 取得所有规格
export const fetchSpecs = async () => {
    const response = await axios.get('/api/getAllspecs');
    return response.data;
};

// 取得所有配送方法
export const fetchDeliverys = async () => {
    const response = await axios.get('/api/getAllDeliveryMethod');
    return response.data;
};
// 新增分类
export const addCategory = async (categoryName, currentUser) => {
    const data = {
        categoryName: categoryName,
        description: null,
        createdBy: currentUser.name,
        updatedBy: currentUser.name
    };
    await axios.post('/api/addCategori', data);
};

// 新增规格
export const addSpec = async (specName, currentUser) => {
    await axios.post('/api/addSpecs', {
        specName: specName,
        description: null,
        createdBy: currentUser.name, // 或者用你实际的 currentUser.name
        updatedBy: currentUser.name,
        deletedFlg: 0
    });
};

// 新增商品（核心逻辑抽出）
export const submitProduct = async (formData, currentUser) => {
    const productData = {
        productName: formData.productName,
        categoryId: parseInt(formData.categoryId),
        specId: parseInt(formData.specId),
        price: parseFloat(formData.price),
        purchasePrice: parseFloat(formData.purchasePrice),
        stockQty: parseInt(formData.quantity),
        deliveryCompanyMethodId: parseInt(formData.deliveryCompanyMethodId),
        userId: currentUser.id,
        createdBy: currentUser.name,
        updatedBy: currentUser.name,
        lastSalesDate: null,
        totalSales: 0,
        staff: null,
        deletedFlg: 0
    };

    const response = await axios.post('/api/productAdd', productData);
    return response.data;
};
