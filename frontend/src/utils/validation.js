//値が空でないかチェック
//当箭头函数的函数体是单一表达式，且不使用大括号的时候，返回值是自动返回
export const isNotEmpty = (value) =>
    value !== undefined &&
    value !== null &&
    value.toString().trim() !== '';

//正の数チェック
export const isPositiveNumber = (value) =>
    !isNaN(value) && Number(value) >= 0

//数字チェック
export const isNumber = (value) =>
    !isNaN(value)

//email形式チェック
export const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}
