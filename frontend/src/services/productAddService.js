import axios from 'axios';

//取得所以品番
export const fetchProductInfo = async (currentUser) => {
    const response = await axios.get('/api/getAllProductInfo', {
        params: { userId: currentUser.userId }
    });
    return response.data.length > 0 ? response.data : [];
};

// 取得所有分类
export const fetchCategories = async (currentUser) => {
    const response = await axios.get('/api/getAllCategories', {
        params: { userId: currentUser.userId }
    });
    return response.data.length > 0 ? response.data : [];
};

// 取得所有规格
export const fetchSpecs = async (currentUser) => {
    const response = await axios.get('/api/getAllSpecs', {
        params: { userId: currentUser.userId }
    });
    return response.data.length > 0 ? response.data : [];
};

// 取得所有配送方法
export const fetchDeliverys = async (currentUser) => {
    const response = await axios.get('/api/getAllDeliveryMethod', {
        params: { userId: currentUser.userId }
    });
    return response.data.length > 0 ? response.data : [];
};

//新增品番
export const addProductInfo = async (productName, currentUser) => {
    const data = {
        userId: currentUser.userId,
        productName: productName, 
        description: null,
        createdBy: currentUser.name,
        updatedBy: currentUser.name,
        deletedFlg: 0
    };
    await axios.post('/api/addProductInfo', data);
};

// 新增分类
export const addCategory = async (categoryName, currentUser) => {
    const data = {
        userId: currentUser.userId,
        categoryName: categoryName,
        description: null,
        createdBy: currentUser.name,
        updatedBy: currentUser.name,
        deletedFlg: 0
    };
    await axios.post('/api/addCategori', data);
};

// 新增规格
export const addSpec = async (specName, currentUser) => {
    await axios.post('/api/addSpecs', {
        userId: currentUser.userId,
        specName: specName,
        description: null,
        createdBy: currentUser.name,
        updatedBy: currentUser.name,
        deletedFlg: 0
    });
};

// 新增商品
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
