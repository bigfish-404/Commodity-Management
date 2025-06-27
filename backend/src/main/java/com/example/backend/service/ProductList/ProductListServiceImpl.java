package com.example.backend.service.ProductList;

import com.example.backend.entity.dto.ProductListEntity;
import com.example.backend.mapper.ProductListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class ProductListServiceImpl implements ProductListService {

    @Autowired
    private ProductListMapper productListMapper;

    // 允许的排序字段（拼接用完整字段名）
    private static final Set<String> ALLOWED_ORDER_BY = Set.of(
            "pi.product_name", "c.category_name", "s.spec_name",
            "p.stock_qty", "p.price", "p.last_sales_date",
            "p.total_sales", "p.staff");

    private static final Set<String> ALLOWED_ORDER_DIRECTION = Set.of("ASC", "DESC");

    @Override
    public List<ProductListEntity> getAllProductsByUserId(
            String userId, String orderBy, String orderDirection, int offset, int limit) {

        // 默认排序字段与方向
        String orderBySafe = "pi.product_name";
        String orderDirSafe = "ASC";

        if (orderBy != null && ALLOWED_ORDER_BY.contains(orderBy)) {
            orderBySafe = orderBy;
        }

        if (orderDirection != null && ALLOWED_ORDER_DIRECTION.contains(orderDirection.toUpperCase())) {
            orderDirSafe = orderDirection.toUpperCase();
        }

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
