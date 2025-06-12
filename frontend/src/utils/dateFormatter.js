
// 日期格式化
export function formatDate(dateString) {
    if (!dateString) return '-';
    return dateString.substring(0, 10);
}
