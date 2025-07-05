/**
 * 处理表单输入变化的通用函数
 * 用于根据字段名动态验证输入格式，并更新表单状态
 * 
 * @param {Event} e - 输入框或下拉框的 change 事件
 * @param {Function} setFormData - 用于更新 useState 的 setFormData 函数
 */
export const handleFormChange = (e, setFormData) => {
    // 从事件目标中解构出字段名和输入值
    const { name, value } = e.target;

    // 如果是价格相关字段（允许最多两位小数）
    if (["price", "purchasePrice"].includes(name)) {
        // 允许为空（用于清空输入框），或是合法的两位小数数字
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            // 更新对应字段的值
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }
    // 如果是库存数量字段（只能是整数）
    else if (["stockQty", "stockAlert"].includes(name)) {
        // 允许为空，或为正整数
        if (value === '' || /^\d+$/.test(value)) {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    }
    // 其他字段直接更新，不限制格式
    else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
};
