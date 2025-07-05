package com.example.backend.service.ProductList;

import com.example.backend.entity.dto.ProductListEntity;
import com.example.backend.mapper.ProductListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class ProductListServiceImpl implements ProductListService {

    @Autowired
    private ProductListMapper productListMapper;

    private static final Map<String, String> ORDER_BY_FIELD_MAP = Map.of(
            "productName", "pi.product_name",
            "categoryName", "c.category_name",
            "specName", "s.spec_name",
            "stockQty", "p.stock_qty",
            "price", "p.price",
            "lastSalesDate", "p.last_sales_date",
            "totalSales", "p.total_sales",
            "staff", "p.staff");

    private static final Set<String> ALLOWED_ORDER_DIRECTION = Set.of("ASC", "DESC");

    @Override
    public List<ProductListEntity> getAllProductsByUserId(
            String userId, String orderBy, String orderDirection, int offset, int limit) {

        // 字段映射（如果传入字段不存在，则使用默认 productName）
        String orderBySafe = ORDER_BY_FIELD_MAP.getOrDefault(orderBy, "pi.product_name");

        // 排序方向检查
        String orderDirSafe = ALLOWED_ORDER_DIRECTION
                .contains(orderDirection != null ? orderDirection.toUpperCase() : "")
                        ? orderDirection.toUpperCase()
                        : "ASC";

        // 可选：调试日志
        System.out.println("排序字段: " + orderBySafe + "，方向: " + orderDirSafe);

        return productListMapper.getAllProductsByUserId(userId, offset, limit, orderBySafe, orderDirSafe);
    }

    @Override
    public int countProductsByUserId(String userId) {
        return productListMapper.countProductsByUserId(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateProduct(ProductListEntity product) {
        try {
            int result = productListMapper.updateProduct(product);
            if (result == 0) {
                throw new RuntimeException("更新失败：找不到对应商品");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteProduct(ProductListEntity product) {
        try {
            int result = productListMapper.deleteProduct(product);
            if (result == 0) {
                throw new RuntimeException("删除失败：找不到对应商品");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
