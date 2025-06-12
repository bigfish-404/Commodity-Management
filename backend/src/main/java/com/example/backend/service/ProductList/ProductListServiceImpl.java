package com.example.backend.service.ProductList;

import com.example.backend.entity.ProductListEntity;
import com.example.backend.mapper.ProductListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProductListServiceImpl implements ProductListService {

    @Autowired
    private ProductListMapper productListMapper;

    // 字段映射表
    public static final Map<String, String> ORDER_BY_COLUMNS = Map.of(
        "productName", "product_name",
        "category", "category",
        "spec", "spec",
        "stockQty", "stock_qty",
        "price", "price",
        "purchasePrice", "purchase_price",
        "lastSalesDate", "last_sales_date",
        "totalSales", "total_sales",
        "staff", "staff",
        "createdAt", "created_at"
    );

    @Override
    public List<ProductListEntity> getAllProductsByUserId(
            Long userId, int offset, int limit, String orderBy, String orderDirection) {

        // 先做字段转换：驼峰 => 下划线
        String orderByColumn = ORDER_BY_COLUMNS.getOrDefault(orderBy, "created_at");

        // 防御性处理，避免非法方向参数
        String safeOrderDirection = ("DESC".equalsIgnoreCase(orderDirection)) ? "DESC" : "ASC";

        return productListMapper.getAllProductsByUserId(userId, offset, limit, orderByColumn, safeOrderDirection);
    }

    @Override
    public int countProductsByUserId(Long userId) {
        return productListMapper.countProductsByUserId(userId);
    }

    @Override
    public void insertProduct(ProductListEntity product) {
        productListMapper.insertProduct(product);
    }
}
