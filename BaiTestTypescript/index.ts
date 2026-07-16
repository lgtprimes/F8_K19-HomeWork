import { log } from "node:console";
import { CustomerService } from "./services/customerService";
import { EmployeeService } from "./services/employeeService";
import { ProjectService } from "./services/projectService";

const customerService = new CustomerService();
const employeeService = new EmployeeService();
const projectService = new ProjectService(employeeService);

// Test case 1
const customer = customerService.create({
    name: "Nguyen Van A",
    tax: "0123456789",
    address: "123 Nguyễn Trãi, Hà Nội",
})
// console.log(customer);

// Test case 2
const updatedCustomer = customerService.updateById(customer.id, {
  address: "456 Lê Lợi, TP.HCM",
});
console.log(customer);


// Test case 3
const employee1 = employeeService.create({ name: "Nguyễn Văn A" });
const employee2 = employeeService.create({ name: "Trần Thị B" });

console.log(employee1)
console.log(employee2)

// Test case 4
const foundEmployee = employeeService.findById(employee1.id);
const notFoundEmployee = employeeService.findById("id-khong-ton-tai");


// Test case 5
const project1 = projectService.create({
  customerId: customer.id,
  employeeId: employee1.id,
});

// Test case 6
const updatedProject1 = projectService.updateById(project1.id, {
  employeeId: employee2.id,
});


// Test case 7
const updatedProject2 = projectService.updateById(project1.id, {
  customerId: customer.id, 
});

// Test case 8
const result1 = customerService.updateById("id-khong-ton-tai", { name: "X" }); 
const result2 = employeeService.updateById("id-khong-ton-tai", { name: "Y" }); 
const result3 = projectService.updateById("id-khong-ton-tai", { customerId: "abc" }); 
 
// Test Case 9
const project2 = projectService.create({
  customerId: customer.id,
  employeeId: "employee-id-khong-ton-tai",
});
