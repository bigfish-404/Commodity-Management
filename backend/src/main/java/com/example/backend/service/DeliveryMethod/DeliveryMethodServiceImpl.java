package com.example.backend.service.DeliveryMethod;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.entity.db.DeliveryMethodEntity;
import com.example.backend.mapper.DeliveryMethodMapper;

@Service
public class DeliveryMethodServiceImpl implements DeliveryMethodService{

    @Autowired
    private DeliveryMethodMapper deliveryMethodMapper;

    @Override
    public List<DeliveryMethodEntity> getAllDeliveryMethod(String userId){

        return deliveryMethodMapper.getAll(userId);
    }

    @Transactional
    @Override
    public boolean addMethod(DeliveryMethodEntity entity) {
         try {
        int rows = deliveryMethodMapper.insertDeliveryMethod(entity);
        if (rows > 0) {
            return true;
        } else {
            // 插入失败时主动触发异常（将导致事务回滚）
            throw new IllegalStateException("配送方法の登録に失敗しました。");
        }
    } catch (DuplicateKeyException e) {
        // 主键或唯一键重复
        throw new ResponseStatusException(HttpStatus.CONFLICT, "同じ配送会社と方法の組み合わせが既に存在します。");
    } catch (Exception e) {
        // 其他异常也抛出
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "配送方法の登録に失敗しました。", e);
    }
    }

}
