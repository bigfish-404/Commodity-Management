package com.example.backend.common.constant;

public class ValidationMessages {

    // 共通
    public static final String REQUIRED = "%sを入力してください。";
    public static final String MUST_BE_POSITIVE = "%sは0より大きい数字で入力してください。";
    public static final String MUST_BE_NON_NEGATIVE = "%sは0以上の数字で入力してください。";
    public static final String MUST_BE_INTEGER = "%sは整数で入力してください。";
    public static final String INVALID_EMAIL = "%sの形式が正しくありません。";
    public static final String MAX_LENGTH = "%sは最大%d文字までです。";
    public static final String INVALID_FORMAT = "%sの形式が正しくありません。";

    // 項目名
    public static final String PRODUCT_NAME = "商品名";
    public static final String CATEGORY_NAME = "カテゴリー";
    public static final String SPEC_NAME = "仕様";
    public static final String PRICE = "価格";
    public static final String PURCHASE_PRICE = "進貨価格";
    public static final String STOCK_QTY = "数量";
    public static final String STOCK_ALERT = "在庫アラート";
    public static final String DELIVERY_COMPANY = "配送会社";
    public static final String DELIVERY_METHOD = "配送方法";
    public static final String EMAIL = "メールアドレス";

}

