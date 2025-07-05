package com.example.backend.common.util;

import com.example.backend.common.constant.ValidationMessages;
import org.springframework.util.StringUtils;

public class ValidationUtils {

    /**
     * 空文字チェック
     */
    public static String checkNotEmpty(String value, String fieldLabel) {
        if (!StringUtils.hasText(value)) {
            return String.format(ValidationMessages.REQUIRED, fieldLabel);
        }
        return null;
    }

    /**
     * 正の数（0以上）チェック
     */
    public static String checkPositiveNumber(Number value, String fieldLabel) {
        if (value == null || value.doubleValue() <= 0) {
            return String.format(ValidationMessages.MUST_BE_POSITIVE, fieldLabel);
        }
        return null;
    }

    /**
     * メールアドレス形式チェック
     */
    public static String checkEmail(String value, String fieldLabel) {
        if (!StringUtils.hasText(value) || !value.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$")) {
            return String.format(ValidationMessages.INVALID_EMAIL, fieldLabel);
        }
        return null;
    }

    /**
     * 数値チェック（整数）
     */
    public static String checkInteger(String value, String fieldLabel) {
        if (!StringUtils.hasText(value) || !value.matches("^\\d+$")) {
            return String.format(ValidationMessages.MUST_BE_INTEGER, fieldLabel);
        }
        return null;
    }

}
