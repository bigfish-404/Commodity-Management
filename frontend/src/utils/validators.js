import {
    isNotEmpty,
    isPositiveNumber,
    isNumber,
    isEmail
} from './validation';

export const checkProductName = (value) => {
    if (!isNotEmpty(value)) {
        return {
            valid: false,
            message: '品番名をを入力してください'
        };
    }
    return {
        valid: true,
        message: ''
    };
};

export const checkCategoryName = (value) => {
    if (!isNotEmpty(value)) {
        return {
            valid: false,
            message: 'カテゴリーを入力してください'
        };
    }
    return {
        valid: true,
        message: ''
    };
};

export const checkSpecName = (value) => {
    if (!isNotEmpty(value)) {
        return {
            valid: false,
            message: '仕様を入力してください'
        };
    }
    return {
        valid: true,
        message: ''
    };
};

export const checkPrice = (value) => {
    if (!isNotEmpty(value)) {
        return {
            valid: false,
            message: '価格を入力してください'
        };
    }
    if (!isPositiveNumber(value)) {
        return {
            valid: false,
            message: '価格は0より大きい数字で入力してください'
        };
    }
    return {
        valid: true,
        message: ''
    };
};

export const checkPurchasePrice = (value) => {
    if (!isNotEmpty(value)) {
        return {
            valid: false,
            message: '進貨価格を入力してください'
        };
    }
    if (!isPositiveNumber(value)) {
        return {
            valid: false,
            message: '進貨価格は0以上の数字で入力してください'
        };
    }
    return {
        valid: true,
        message: ''
    };
};

export const checkDeliveryCompany = (value) => {
    if (!isNotEmpty(value)) {
        return {
            valid: false,
            message: '配送会社を入力してください'
        };
    }
    return {
        valid: true,
        message: ''
    };
};

export const checkDeliveryMethod = (value) => {
    if (!isNotEmpty(value)) {
        return {
            valid: false,
            message: '配送方法を入力してください'
        };
    }
    return {
        valid: true,
        message: ''
    };
};

export const checkEmail = (value) =>{
    if(!isNotEmpty(value)){
        return{
            valid: false,
            message: 'emailを入力してください'
        }
    }
    if(!isEmail(value)){
        return{
            valid: false,
            message: 'emailの形式を入力してください'
        }
    }
    return{
        valid: true,
        message: ''
    }
}