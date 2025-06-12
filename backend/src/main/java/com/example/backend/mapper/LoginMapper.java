package com.example.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginMapper {
    int countMailAndPassword(@Param("email") String email, 
                            @Param("password") String password);
    //通过@Param注解来指定参数的名称，这样在SQL语句中就可以使用这些名称来引用参数
   //通过countUserAndPassword方法映射Mapper接口中的SQL语句（与Id要一致）
}

