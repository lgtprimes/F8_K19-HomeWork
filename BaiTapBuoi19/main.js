const products = [
  { id: 1, name: 'iPhone', price: 2000 },
  { id: 2, name: 'Samsung', price: 1500 },
  { id: 3, name: 'Xiaomi', price: 1000 },
  { id: 4, name: 'Oppo', price: 1200 }
]

const productLookup = {};
for(let i = 0; i < products.length; i++) {
    const product = products[i]
    productLookup[product.id] = product;
}

const orders = [
  {
    id: 1,
    items: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 }
    ]
  },
  {
    id: 2,
    items: [
      { productId: 1, quantity: 1 },
      { productId: 3, quantity: 3 }
    ]
  },
  {
    id: 3,
    items: [
      { productId: 2, quantity: 2 },
      { productId: 4, quantity: 1 }
    ]
  }
]

function findMaxRevenueProduct() {
    const productRevenue = {};
    let maxRevenueInfo = { id: null, maxRevenue: 0}
    for(const order of orders) {
        for(const item of order.items) {
            const product = productLookup[item.productId];
            const revenue = product.price * item.quantity;
            
            if(!productRevenue[item.productId]) {
                productRevenue[item.productId] = 0;
            }
            productRevenue[item.productId] += revenue;

            if(productRevenue[item.productId] > maxRevenueInfo.maxRevenue) {
              maxRevenueInfo = { id: item.productId, maxRevenue: productRevenue[item.productId]}
              
            }
        }
    }
    return {
      id: maxRevenueInfo.id,
      name: productLookup[maxRevenueInfo.id].name,
      revenue: maxRevenueInfo.maxRevenue
    }
}

console.log(findMaxRevenueProduct());
