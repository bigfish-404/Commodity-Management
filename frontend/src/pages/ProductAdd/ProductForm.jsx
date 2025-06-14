import React, { useState } from 'react';
import ProductSelect from './ProductSelect';
import './ProductAdd.css';

export default function ProductForm() {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    subCategory: '',
    brand: '',
    unit: '',
    sku: '',
    minQty: '',
    quantity: '',
    description: '',
    tax: '',
    discountType: 'Percentage',
    price: '',
    status: 'Closed',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // 这里可以写提交接口逻辑
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-row">
        <input name="productName" value={formData.productName} onChange={handleChange} placeholder="Product Name" />
        <ProductSelect name="category" value={formData.category} handleChange={handleChange} placeholder="Category" />
        <ProductSelect name="subCategory" value={formData.subCategory} handleChange={handleChange} placeholder="Sub Category" />
        <ProductSelect name="brand" value={formData.brand} handleChange={handleChange} placeholder="Brand" />
      </div>

      <div className="form-row">
        <ProductSelect name="unit" value={formData.unit} handleChange={handleChange} placeholder="Unit" />
        <input name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU" />
        <input name="minQty" value={formData.minQty} onChange={handleChange} placeholder="Minimum Qty" />
        <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" />
      </div>

      <div className="form-row">
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      </div>

      <div className="form-row">
        <ProductSelect name="tax" value={formData.tax} handleChange={handleChange} placeholder="Tax" />
        <ProductSelect name="discountType" value={formData.discountType} handleChange={handleChange} placeholder="Discount Type" />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        <ProductSelect name="status" value={formData.status} handleChange={handleChange} placeholder="Status" />
      </div>

      <div className="form-row upload-area">
        <input type="file" onChange={handleFileChange} />
        {formData.image && <p>Selected file: {formData.image.name}</p>}
      </div>

      <div className="form-buttons">
        <button type="submit" className="submit-btn">Submit</button>
        <button type="button" className="cancel-btn">Cancel</button>
      </div>
    </form>
  );
}
