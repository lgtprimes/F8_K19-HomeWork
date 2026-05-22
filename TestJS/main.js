const employees = [
   { id: 1, name: "Alice", age: 23, status: 'working' },
   { id: 3, name: "Bob", age: 25, status: 'working' },
   { id: 6, name: "John", age: 27, status: 'working' },
   { id: 8, name: "David", age: 23, status: 'quit_job' },
   { id: 10, name: "Eve", age: 20, status: 'working' },
];

const products = [
   { id: 1, name: "Phone", price: 1200 },
   { id: 2, name: "Laptop", price: 3000  },
   { id: 3, name: "Tab", price: 2000  },
   { id: 4, name: "PC", price: 800  },
   { id: 5, name: "Monitor", price: 1500  },
];

function toHashMap(array, getKey) {
    const result = {};
    for(const element of array) {
        result[getKey(element)] = element;
    }
    return result;
}

const employeesById = toHashMap(employees, e => e.id);
const productsById = toHashMap(products, p => p.id);



const orders = [
   { id: 1, employeeId: 1, productId: 4, quantity: 1 },
   { id: 2, employeeId: 3, productId: 2, quantity: 4 },
   { id: 3, employeeId: 1, productId: 5, quantity: 3 },
   { id: 4, employeeId: 6, productId: 1, quantity: 2 },
   { id: 5, employeeId: 3, productId: 5, quantity: 3 },
   { id: 6, employeeId: 8, productId: 1, quantity: 1 },
   { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];

// 1. Get all working employees
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
function findTheBestSellingProduct(orders, productsById) {
    let bestSellingProduct = -Infinity;
    let bestSellingProductId = null;
    const salesCount = {};
    for(const order of orders) {
        const { productId, quantity } = order;
        if(!salesCount[productId]) {
            salesCount[productId] = 0;
        }
        salesCount[productId] += quantity;

        if(salesCount[productId] > bestSellingProduct) {
            bestSellingProduct = salesCount[productId];
            bestSellingProductId = productId;
        }
    }
    
    return productsById[bestSellingProductId];
}
// console.log(findTheBestSellingProduct(orders, productsById));


// 5. Find the product with the highest revenue
function findTheBestRevenueProduct(orders, productsById) {
    const revenueByProductId = {};
    let maxRevenue = -Infinity;
    let maxRevenueId = null;

    for(const order of orders) {
        const { productId, quantity } = order;
        const product = productsById[productId];
        const revenue = product.price * quantity;

        if(!revenueByProductId[productId]) {
            revenueByProductId[productId] = 0;
        }
        revenueByProductId[productId] += revenue;

        if(revenueByProductId[productId] > maxRevenue) {
            maxRevenue = revenueByProductId[productId];
            maxRevenueId = productId;
        }
    }
    return productsById[maxRevenueId];
}
// console.log(findTheBestRevenueProduct(orders, productsById));


// 6. Find the top-selling employee
function findTopSellingEmployee(orders, employeesById) {
    const quantityByEmployeeId = {}
    let maxQuantity = -Infinity;
    let topEmployeeId = null;

    for(const order of orders) {
        const { employeeId, quantity } = order;
        if(!quantityByEmployeeId[employeeId]) {
            quantityByEmployeeId[employeeId] = 0;
        }
        quantityByEmployeeId[employeeId] += quantity;

        if(quantityByEmployeeId[employeeId] > maxQuantity) {
            maxQuantity = quantityByEmployeeId[employeeId];
            topEmployeeId = employeeId;
        }

    }    
    return employeesById[topEmployeeId];
}
// console.log(findTopSellingEmployee(orders, employeesById));


// 7. Find the employee with the highest revenue
function findTopRevenueEmployee(orders, productsById, employeesById) {
    const revenueByEmployeeId = {}
    let maxRevenue = -Infinity;
    let topEmployeeId = null;

    for(const order of orders) {
        const { productId, employeeId, quantity } = order;
        const product = productsById[productId];
        const revenue = product.price * quantity;
        if(!revenueByEmployeeId[employeeId]) {
            revenueByEmployeeId[employeeId] = 0;
        }
        revenueByEmployeeId[employeeId] += revenue;

        if(revenueByEmployeeId[employeeId] > maxRevenue) {
            maxRevenue = revenueByEmployeeId[employeeId];
            topEmployeeId = employeeId;
        }

    }    
    return employeesById[topEmployeeId];
}
// console.log(findTopRevenueEmployee(orders, productsById, employeesById));


// 8. Find the highest-revenue product for each employee
function findTopRevenueProductPerEmployee(orders, productsById) {
    const employeeStats = {};
    for(const order of orders) {
        const { employeeId, productId, quantity } = order;
        const revenue = productsById[productId].price * quantity;

        if(!employeeStats[employeeId]) {
            employeeStats[employeeId] = {
                revenues: {},
                maxRevenue: -Infinity,
                bestProductId: null,
            }
        }

        const employeeData = employeeStats[employeeId];
        
        if(!employeeData.revenues[productId]) {
            employeeData.revenues[productId] = 0;
        }
        employeeData.revenues[productId] += revenue;

        if(employeeData.revenues[productId] > employeeData.maxRevenue) {
            employeeData.maxRevenue = employeeData.revenues[productId];
            employeeData.bestProductId = productId;
        }
    }
    
    const result = {};
    for(const employeeId in employeeStats) {
        result[employeeId] = productsById[employeeStats[employeeId].bestProductId];
    }
    return result;
}
// console.log(findTopRevenueProductPerEmployee(orders, productsById));


// 9. Calculate commission for each employee
function calculateCommissionPerEmployee(orders, productsById) {
    const commissionByEmployeeId = {};
    const commission = 0.03;
    for(const order of orders) {
        const { employeeId, productId, quantity } = order;
        const revenue = productsById[productId].price * quantity;

        if(!commissionByEmployeeId[employeeId]) {
            commissionByEmployeeId[employeeId] = 0;
        }

        commissionByEmployeeId[employeeId] += revenue * commission;
    }
    
    return commissionByEmployeeId;
}
// console.log(calculateCommissionPerEmployee(orders, productsById));


// 10. Sort employees by revenue in descending order
function sortEmployeesByRevenueDesc(orders, productsById) {
    const revenueByEmployeeId = {};
    for(const order of orders) {
        const { employeeId, productId, quantity } = order;
        const revenue = productsById[productId].price * quantity;

        if(!revenueByEmployeeId[employeeId]) {
            revenueByEmployeeId[employeeId] = 0;
        }

        revenueByEmployeeId[employeeId] += revenue;
    }
    return Object.entries(revenueByEmployeeId).sort((a, b) =>b[1] - a[1]);
     
}
// console.log(sortEmployeesByRevenueDesc(orders, productsById));
