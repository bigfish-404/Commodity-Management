import {
    isNotEmpty,
    isPositiveNumber,
    isNumber,
    isEmail
} from './dateFormatter';

export const checkProductName = (value) => {
    if (!isNotEmpty(value)) {
        return {
            valid: false,
            message: '品番名をを選択してください'
        };
    }
    return {
        valid: true,
        message: ''
    };
};

export const checkCategoryName = (value) => {
    if(!isNotEmpty(value)){
        return {
            valid: false,
            message: 'カテゴリーを選択してください'
        };
    }
    return{
        valid: true,
        message: ''
    };
};

export const checSpecName = (value) =>{
    if(!isNotEmpty(value)){
        return{
            valid: false,
            message: ''
        };
    }
    return{
        valid: true,
        message: ''
    };
};