export async function fetchSalesData() {
  
  return [
    {
    id: 1,
    productName: 'Laptop',
    categoryName: 'Electronics',
    specName: '15 inch',
    quantity: 10,
    salesPrice: 1200,
    handlingFee: 50,
    deliveryFee: 20,
    profit: 300
  },
  {
    id: 2,
    productName: 'Smartphone',
    categoryName: 'Electronics',
    specName: '6.5 inch',
    quantity: 5,
    salesPrice: 800,
    handlingFee: 30,
    deliveryFee: 15,
    profit: 200
  },
  {
    id: 3,
    productName: 'Printer',
    categoryName: 'Office Supplies',
    specName: 'Compact',
    quantity: 2,
    salesPrice: 500,
    handlingFee: 20,
    deliveryFee: 10,
    profit: 100
  }
  ];
}
