const employees = [
   { id: 1, name: "Alice", age: 23, status: 'working' },
   { id: 3, name: "Bob", age: 25, status: 'working' },
   { id: 6, name: "John", age: 27, status: 'working' },
   { id: 8, name: "David", age: 23, status: 'quit_job' },
   { id: 10, name: "Eve", age: 20, status: 'working' },
];

// Hash Join "employees" Object
const employeesById = {};
for(let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    employeesById[employee.id] = employee;
}

const products = [
   { id: 1, name: "Phone", price: 1200 },
   { id: 2, name: "Laptop", price: 3000  },
   { id: 3, name: "Tab", price: 2000  },
   { id: 4, name: "PC", price: 800  },
   { id: 5, name: "Monitor", price: 1500  },
]

// Hash Join "products" Object
const productsById = {};
for(let i = 0; i < products.length; i++) {
    const product = products[i];
    productsById[product.id] = product;
}

const orders = [
   { id: 1, employeeId: 1, productId: 4, quantity: 1 },
   { id: 2, employeeId: 3, productId: 2, quantity: 4 },
   { id: 3, employeeId: 1, productId: 5, quantity: 3 },
   { id: 4, employeeId: 6, productId: 1, quantity: 2 },
   { id: 5, employeeId: 3, productId: 5, quantity: 3 },
   { id: 6, employeeId: 8, productId: 1, quantity: 1 },
   { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];

// 1. Filter working employees
const getWorkingEmployees = (employees) => {
    return employees.filter((employee) => employee.status === 'working');
}
// console.log(getWorkingEmployees(employees)); 

// 2. Find oldest employee
function findOldestEmployee(employees) {
    if (!employees.length) return null;

    let oldestEmployee = employees[0];

    for(let i = 1; i < employees.length; i++) {
        if(employees[i].age > oldestEmployee.age) {
            oldestEmployee = employees[i];
        }
    }
    return oldestEmployee;
}
// console.log(findOldestEmployee(employees));

// 3. Find cheapest product
function findCheapestProduct(products) {
    if (!products.length) return null;

    let cheapestProduct = products[0];

    for(let i = 1; i < products.length; i++) {
        if(products[i].price < cheapestProduct.price) {
            cheapestProduct = products[i];
        }
    }
    return cheapestProduct;
}
// console.log(findCheapestProduct(products));  

// 4. Find best selling product
function findBestSellingProduct(orders, productsById) {
    if (!orders.length) return null;
    const salesCount = {};
    for(const order of orders) {
        if(!salesCount[order.productId]) {
            salesCount[order.productId] = 0;
        }
        salesCount[order.productId] += order.quantity;
    }
    
    let bestProductId = null;
    let maxQuantity = 0;
    for(const productId in salesCount) {
        if(salesCount[productId] > maxQuantity) {
            maxQuantity = salesCount[productId];
            bestProductId = productId;
        }
    }
    
    return productsById[bestProductId];
}

// 5. console.log(findBestSellingProduct(orders, productsById));

function findMaxRevenueProduct(orders, productsById) {
    if (!orders.length) return null;
    const revenueByProduct = {};

    for(const order of orders) {
        const product = productsById[order.productId];
        const revenue = product.price * order.quantity;
        
        if(!revenueByProduct[order.productId]) {
            revenueByProduct[order.productId] = 0;
        }

        revenueByProduct[order.productId] += revenue;
        
    }
    
    let bestProductId = null;
    let maxRevenue = 0;

    for(const productId in revenueByProduct) {
        if(revenueByProduct[productId] > maxRevenue) {
            maxRevenue = revenueByProduct[productId];
            bestProductId = productId;
        }
    }

    return productsById[bestProductId];

}
// console.log(findMaxRevenueProduct(orders, productsById));

// 6. find top seller
function findTopSeller(orders, employeesById) {
    if (!orders.length) return null;
    const salesByEmployee = {};

    for(const order of orders) {
        if(!salesByEmployee[order.employeeId]) {
            salesByEmployee[order.employeeId] = 0;
        }
        salesByEmployee[order.employeeId] += order.quantity;
    }
    
    let bestEmployeeId = null;
    let maxSales = 0;

    for(const employeeId in salesByEmployee) {
        if(salesByEmployee[employeeId] > maxSales) {
            maxSales = salesByEmployee[employeeId];
            bestEmployeeId = employeeId;
        }
    }

    return employeesById[bestEmployeeId];

}

// console.log(findTopSeller(orders, employeesById));

// 7. Find the employee with the highest revenue
function findTopRevenueEmployee(orders, employeesById, productsById) {
    if (!orders.length) return null;
    const revenueByEmployee = {};

    for(const order of orders) {
        const product = productsById[order.productId];
        const revenue = product.price * order.quantity;

        if(!revenueByEmployee[order.employeeId]) {
            revenueByEmployee[order.employeeId] = 0;
        }
        revenueByEmployee[order.employeeId] += revenue;
    }

    let topEmployeeId = null;
    let maxRevenue = 0;

    for (const employeeId in revenueByEmployee) {
        if (revenueByEmployee[employeeId] > maxRevenue) {
            maxRevenue = revenueByEmployee[employeeId];
            topEmployeeId = employeeId;
        }
    }

    return employeesById[topEmployeeId];
}

console.log(findTopRevenueEmployee(orders, employeesById, productsById));
